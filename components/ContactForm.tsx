
"use client";

import React, { useState } from "react";
import { useLang } from "@/components/ClientProviders";


// Language translations
const translations = {
  en: {
    title: "Contact Us",
    name: "Name",
    email: "Email",
    message: "Your Message",
    send: "Send",
    sending: "Sending...",
    success: "Message sent successfully!",
    error: "Failed to send message.",
    errorSend: "An error occurred.",
  },
  de: {
    title: "Kontaktieren Sie uns",
    name: "Name",
    email: "E-Mail",
    message: "Ihre Nachricht",
    send: "Senden",
    sending: "Wird gesendet...",
    success: "Nachricht erfolgreich gesendet!",
    error: "Nachricht konnte nicht gesendet werden.",
    errorSend: "Ein Fehler ist aufgetreten.",
  },
};

const ContactForm = () => {
  const { lang } = useLang();
  const t = translations[lang];
  const [formData, setFormData] = useState({ name: "", email: "", message: "", hp: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // reCAPTCHA v3 site key (exposed to client)
  const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  // Loads grecaptcha script if not already loaded
  const loadRecaptcha = async (siteKey: string) => {
    if (!siteKey) return;
    if (typeof window === "undefined") return;
    // @ts-expect-error - grecaptcha added by external script
    if (window.grecaptcha && window.grecaptcha.execute) return;

    return new Promise<void>((resolve, reject) => {
      const existing = document.querySelector(`script[src*="recaptcha"]`);
      if (existing) {
        // wait for grecaptcha to be ready
        const check = () => {
          // @ts-expect-error - grecaptcha added by external script
          if (window.grecaptcha && window.grecaptcha.execute) return resolve();
          setTimeout(check, 50);
        };
        check();
        return;
      }

      const s = document.createElement("script");
      s.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      s.async = true;
      s.defer = true;
      s.onload = () => {
        // @ts-expect-error - grecaptcha added by external script
        if (window.grecaptcha) return resolve();
        // small wait
        setTimeout(() => {
          // @ts-expect-error - grecaptcha added by external script
          if (window.grecaptcha) return resolve();
          reject(new Error("grecaptcha not available"));
        }, 200);
      };
      s.onerror = () => reject(new Error("recaptcha script failed to load"));
      document.head.appendChild(s);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);
    setStatus(t.sending);
    try {
      // If reCAPTCHA site key is configured, request a token and include it
      const payload: Record<string, unknown> = { ...formData };
      if (RECAPTCHA_SITE_KEY) {
        try {
          await loadRecaptcha(RECAPTCHA_SITE_KEY);
          // @ts-expect-error - grecaptcha executes at runtime
          const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'contact_form' });
          payload.recaptchaToken = token;
        } catch (err) {
          console.warn('reCAPTCHA failed to load or execute', err);
        }
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setStatus(t.success);
        setFormData({ name: "", email: "", message: "", hp: "" });
      } else {
        const data = await response.json().catch(() => null);
        setStatus((data && data.error) || t.error);
      }
    } catch (err) {
      console.error(err);
      setStatus(t.errorSend);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "2rem 0" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          borderRadius: "18px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          padding: "2.5rem 2rem",
          maxWidth: "400px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#1a1a1a", marginBottom: "1rem", fontWeight: 700 }}>{t.title}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label htmlFor="name" style={{ fontWeight: 500, color: "#333" }}>{t.name}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              padding: "0.75rem",
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
              fontSize: "1rem",
              outline: "none",
              background: "#fafafa",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label htmlFor="email" style={{ fontWeight: 500, color: "#333" }}>{t.email}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              padding: "0.75rem",
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
              fontSize: "1rem",
              outline: "none",
              background: "#fafafa",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label htmlFor="message" style={{ fontWeight: 500, color: "#333" }}>{t.message}</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            style={{
              padding: "0.75rem",
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
              fontSize: "1rem",
              outline: "none",
              background: "#fafafa",
              resize: "vertical",
            }}
          ></textarea>
        </div>
        {/* honeypot - hide from users but present to bots */}
        <input
          type="text"
          name="hp"
          value={formData.hp}
          onChange={handleChange}
          autoComplete="off"
          style={{ display: 'none' }}
          aria-hidden
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? '#6ea8fe' : '#0070f3',
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "0.75rem",
            fontSize: "1.1rem",
            fontWeight: 600,
            cursor: loading ? 'default' : 'pointer',
            transition: "background 0.2s",
          }}
        >
          {loading ? (lang === 'de' ? 'Senden...' : 'Sending...') : t.send}
        </button>
        {status && (
          <p style={{ textAlign: "center", color: status.includes("successfully") || status.includes("erfolgreich") ? "#0070f3" : "#d32f2f", fontWeight: 500 }}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;