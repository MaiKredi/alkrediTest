import { NextResponse } from 'next/server';

type Body = {
  name?: string;
  email?: string;
  message?: string;
  hp?: string; // honeypot
};

function isEmail(v: unknown) {
  if (typeof v !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  try {
    const body: Body = await req.json();

    // Basic spam/honeypot check
    if (body.hp && body.hp.trim() !== '') {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // If reCAPTCHA secret is configured, verify token from client
    const recaptchaSecret = process.env.RECAPTCHA_SECRET;
    const token = (body as any).recaptchaToken;
    if (recaptchaSecret) {
      if (!token) {
        return NextResponse.json({ error: 'reCAPTCHA token missing' }, { status: 400 });
      }
      try {
        const params = new URLSearchParams();
        params.append('secret', recaptchaSecret);
        params.append('response', String(token));

        const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
        });
        const verifyJson = await verifyRes.json();
        // For v3, Google returns 'success' and a 'score' (0.0 - 1.0)
        if (!verifyJson.success) {
          return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
        }
        if (verifyJson.score !== undefined && verifyJson.score < 0.5) {
          return NextResponse.json({ error: 'reCAPTCHA score too low' }, { status: 400 });
        }
      } catch (err) {
        console.error('reCAPTCHA verify error', err);
        return NextResponse.json({ error: 'reCAPTCHA verification error' }, { status: 500 });
      }
    }

    // Validate
    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const message = (body.message || '').trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (!isEmail(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // At this point: you can send an email, store to DB, or forward to third-party.
    // We'll support a simple SMTP option via environment variables (optional).

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;

    // If SMTP vars are provided, attempt to send using nodemailer
    if (smtpHost && smtpPort && smtpUser && smtpPass) {
      try {
        // Import nodemailer dynamically to keep dev dependency optional
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(smtpPort),
          secure: Number(smtpPort) === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        // Use a verified sender as the `from` address (SendGrid requires this).
        // Replies should go to the user's email via `replyTo`.
        const fromAddress = process.env.CONTACT_FROM || smtpUser;
        await transporter.sendMail({
          from: fromAddress,
          to: process.env.CONTACT_TO || smtpUser,
          replyTo: `${name} <${email}>`,
          subject: `Website contact form — ${name}`,
          text: message + '\n\n--\n' + `From: ${name} <${email}>`,
        });
      } catch (err) {
        console.error('SMTP send failed', err);
        // don't expose internals to client
      }
    } else {
      // No SMTP configured: use ethereal (nodemailer test account) so developer can preview messages.
      try {
        const nodemailer = await import('nodemailer');
        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
          host: testAccount.smtp.host,
          port: testAccount.smtp.port,
          secure: testAccount.smtp.secure,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });

        const info = await transporter.sendMail({
          from: `${name} <${email}>`,
          to: testAccount.user,
          subject: `Website contact form — ${name}`,
          text: message + '\n\n--\n' + `From: ${name} <${email}>`,
        });

        // nodemailer provides a preview URL for ethereal
        const preview = nodemailer.getTestMessageUrl(info);
        console.log('[contact][ethereal]', preview);
        // include preview URL in logs for developer convenience
      } catch (err) {
        console.error('Ethereal send failed', err);
        console.log('[contact]', { name, email, message });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact API error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
