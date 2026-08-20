export const siteData = {
  doctor: {
    name: "Dra. Karla Armijos",
    shortName: "Dra. Armijos",
    title: "Otorrinolaringóloga",
    specialty: "Rinología y Trastornos Respiratorios del Sueño",
    specialtyShort:
      "Enfermedades de oído, nariz y garganta · Ronquidos y apnea del sueño",
    location: "Ciudad Autónoma de Buenos Aires",
    audience: "Atención adultos y niños",
    mission: "Ayudarte a respirar mejor, dormir mejor y vivir mejor",
  },
  clinics: [
    {
      name: "CEMIC",
      address: "Av. Las Heras 2900, Ciudad Autónoma de Buenos Aires",
      hours: [
        { day: "Miércoles", time: "14:00 – 18:40 hs" },
        { day: "Jueves", time: "15:00 – 17:40 hs" },
      ],
    },
    {
      name: "Hospital Británico",
      address: "Ciudad Autónoma de Buenos Aires",
      hours: null,
    },
  ] as const,
  contact: {
    phone: "+54 9 11 6414-4515",
    phoneHref: "+5491164144515",
    whatsappUrl:
      "https://wa.me/5491164144515?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20consulta%20con%20la%20Dra.%20Armijos.",
  },
  social: {
    instagram: "https://instagram.com/dra.karmijos",
    instagramHandle: "@dra.karmijos",
    linkedin: "https://www.linkedin.com/in/karla-armijos-56a5b719a",
    linkedinHandle: "Karla Armijos",
  },
  tagline: "Dormir bien es salud",
} as const;
