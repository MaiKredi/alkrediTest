//------------------------------------------------------
//  i18n – بسيط، خفيف، يدعم DE / EN
//------------------------------------------------------

export type Lang = "de" | "en";

const dict = {
  de: {
    nav: {
      services: "Leistungen",
      work: "Projekte",
      about: "Über mich",
      contact: "Kontakt",
    },

    hero: {
      title: "Webdesign, KI & Automatisierung für Selbstständige",
      subtitle:
        "Klare Websites, intelligente Tools und Workflows, die Zeit sparen – ideal für kleine Unternehmen und Solo-Selbstständige.",
    },

    cta: {
      primary: "Unverbindlich anfragen",
    },

    section: {
      services: {
        title: "Drei zentrale Bausteine für {word} Projekte",
      },
      projects: {
        title: "Ausgewählte Projekte",
      },
    },

    footer: {
      datenschutz: "Datenschutz",
      impressum: "Impressum",
      rights: "© {year} Alkredi. Alle Rechte vorbehalten.",

      content: {
        datenschutz: `
Datenschutzerklärung

Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Ihre Daten werden vertraulich und entsprechend den gesetzlichen Vorschriften behandelt. Diese Website kann personenbezogene Daten erheben, wenn Sie das Kontaktformular nutzen oder uns freiwillig Informationen übermitteln.

Verantwortlicher:
Alkredi — Web & KI Consulting

Zwecke der Verarbeitung:
• Beantwortung von Anfragen  
• Vertragliche Kommunikation  
• Verbesserung unseres Angebots

Ihre Rechte:
• Auskunft  
• Löschung  
• Einschränkung  
• Widerspruch  
• Datenübertragbarkeit

Bei Fragen kontaktieren Sie uns bitte direkt.
        `.trim(),

        impressum: `
Impressum

Angaben gemäß § 5 TMG:

Alkredi — Web & KI Consulting  
Inhaber: Anis Alkredi  

Kontakt:  
E-Mail: info@alkredi.com  

Haftungshinweis:
Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für externe Links. Für deren Inhalte sind ausschließlich deren Betreiber verantwortlich.

Urheberrecht:
Alle Inhalte dieser Seite sind urheberrechtlich geschützt.
        `.trim(),
      },
    },

    services: {
      web: {
        title: "Webdesign & Landing Pages",
        description:
          "Schnelle, klare und professionell optimierte Seiten, die Vertrauen schaffen und Besucher in Kunden verwandeln.",
        accent: "text-brand",
      },
      systems: {
        title: "Systeme & Automatisierung",
        description:
          "Strukturierte Prozesse, Integrationen und Workflows, die Routinearbeit reduzieren und Effizienz steigern.",
        accent: "text-brand",
      },
      ai: {
        title: "KI-Chatbots & smarte Tools",
        description:
          "Individuelle KI-Chatbots, AI-Workflows und intelligente Assistenten, zugeschnitten auf Ihr Business.",
        accent: "text-brand",
      },
    },
  },

  en: {
    nav: {
      services: "Services",
      work: "Projects",
      about: "About",
      contact: "Contact",
    },

    hero: {
      title: "Web, AI & Automation for freelancers and small teams",
      subtitle:
        "Clear websites, smart tools and workflows that save time — built for modern, lean businesses.",
    },

    cta: {
      primary: "Get in touch",
    },

    section: {
      services: {
        title: "Three essential pillars for {word} projects",
      },
      projects: {
        title: "Selected Work",
      },
    },

    footer: {
      datenschutz: "Privacy Policy",
      impressum: "Imprint",
      rights: "© {year} Alkredi. All rights reserved.",

      content: {
        datenschutz: `
Privacy Policy

We take the protection of your personal data very seriously. Your data is processed confidentially and according to legal regulations. This website may collect personal data when you use the contact form or voluntarily submit information.

Controller:
Alkredi — Web & AI Consulting

Purposes of processing:
• Responding to enquiries  
• Contractual communication  
• Improving our services

Your rights:
• Access  
• Erasure  
• Restriction  
• Objection  
• Data portability

Contact us if you have any questions.
        `.trim(),

        impressum: `
Imprint

Responsible according to § 5 TMG:

Alkredi — Web & AI Consulting  
Owner: Anis Alkredi  

Contact:  
E-mail: info@alkredi.com  

Disclaimer:
Despite careful content control, we assume no liability for external links. The operators of linked pages are solely responsible for their content.

Copyright:
All content on this website is protected by copyright.
        `.trim(),
      },
    },

    services: {
      web: {
        title: "Webdesign & Landing Pages",
        description:
          "Fast, clear and conversion-optimized pages that build trust and turn visitors into clients.",
        accent: "text-brand",
      },
      systems: {
        title: "Systems & Automation",
        description:
          "Structured processes, integrations and workflows that reduce routine work and improve efficiency.",
        accent: "text-brand",
      },
      ai: {
        title: "AI Chatbots & Smart Tools",
        description:
          "Custom AI chatbots, AI-driven workflows and smart assistants tailored to your business.",
        accent: "text-brand",
      },
    },
  },
};

//------------------------------------------------------
// Helpers
//------------------------------------------------------

export function t(lang: Lang, path: string): string {
  const parts = path.split(".");
  let value: unknown = dict[lang];

  for (const p of parts) {
    if (typeof value === "object" && value !== null && p in value) {
      value = (value as Record<string, unknown>)[p];
    } else {
      return path; // fallback يظهر المفتاح إن لم يوجد النص
    }
  }

  return typeof value === "string" ? value : path;
}

/** يعيد بيانات الخدمات 3 → Web / Systeme / KI */
export function servicesFor(lang: Lang) {
  const d = dict[lang].services;
  return [d.web, d.systems, d.ai];
}
