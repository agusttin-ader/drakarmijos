const clinics = [
  {
    name: "CEMIC",
    logo: "/images/institutions/cemic.svg",
    address: "Av. Las Heras 2900, Ciudad Autónoma de Buenos Aires",
    hours: [
      { day: "Miércoles", time: "14:00 – 18:40 hs" },
      { day: "Jueves", time: "15:00 – 17:40 hs" },
    ],
  },
  {
    name: "Hospital Británico",
    logo: "/images/institutions/hospital-britanico.svg",
    address: "Perdriel 74, Ciudad Autónoma de Buenos Aires",
    hours: null,
  },
] as const;

const affiliations = [
  {
    name: "FASO",
    logo: "/images/institutions/faso.png",
  },
] as const;

const institutions = [
  ...clinics.map(({ name, logo }) => ({ name, logo })),
  ...affiliations,
] as const;

export const siteData = {
  doctor: {
    name: "Dra. Karla Armijos",
    shortName: "Dra. Armijos",
    title: "Otorrinolaringóloga",
    /** Matrícula nacional, según el manual de marca. */
    license: "MN 156125",
    /** Denominación completa que figura en el recetario oficial. */
    fullTitle:
      "Especialista en Otorrinolaringología, Desórdenes Respiratorios del Dormir, Ronquido y Rinología Aplicada",
    specialty: "Rinología y Trastornos Respiratorios del Sueño",
    audience: "Atención adultos y niños",
    quote:
      "Me importa que entiendas qué se puede hacer —y qué no— antes de operar o empezar un tratamiento. Si necesitas una segunda opinión, escríbeme.",
  },
  cta: {
    book: "Agendar cita",
    bookShort: "Cita",
  },
  clinics,
  institutions,
  stats: [
    { label: "Matrícula", value: "MN 156125" },
    { label: "Instituciones", value: "CEMIC · Británico" },
    { label: "Consulta", value: "Adultos y niños" },
  ] as const,
  faqs: [
    {
      question: "¿Dónde encuentro un otorrino en Buenos Aires?",
      answer:
        "Atiendo en CEMIC (Av. Las Heras 2900) miércoles y jueves, y en Hospital Británico (Perdriel 74). Podés agendar por WhatsApp o formulario web.",
    },
    {
      question: "¿Cuándo conviene consultar por ronquidos o apnea?",
      answer:
        "Si roncas de forma habitual, hay pausas respiratorias, te despiertas cansado o con dolor de cabeza, o tu pareja nota ahogos nocturnos, conviene una evaluación. No todos los ronquidos son apnea, pero muchos casos leves se diagnostican tarde.",
    },
    {
      question: "¿Qué estudios pides con más frecuencia?",
      answer:
        "Según el motivo de consulta: endoscopia nasal, polisomnografía o estudios del sueño, audiometría y, en algunos casos, monitoreo con wearables. Te explico para qué sirve cada uno antes de solicitarlo.",
    },
    {
      question: "¿Atiendes niños?",
      answer:
        "Sí. Veo respiración bucal, adenoides, amígdalas, otitis a repetición y problemas de oído, nariz y garganta en pediatría. El plan se arma con la familia, con lenguaje claro.",
    },
    {
      question: "¿La cirugía nasal siempre es necesaria?",
      answer:
        "No. Muchas obstrucciones, alergias o sinusitis se manejan primero con tratamiento médico. La cirugía entra cuando hay un beneficio concreto y límites claros — nunca como menú genérico.",
    },
    {
      question: "¿Cómo es la recuperación de una cirugía nasal?",
      answer:
        "Es escalonada. Los primeros días: reposo relativo y cuidados locales. En general, entre 5 y 10 días muchas personas retoman trabajo de oficina. Deporte intenso: suele esperar algunas semanas. El ritmo exacto lo vemos en el control.",
    },
    {
      question: "¿Dónde atiendes y cómo agendo una cita?",
      answer:
        "Miércoles y jueves en CEMIC (Av. Las Heras 2900) y también en Hospital Británico (Perdriel 74). Puedes escribirme por WhatsApp o completar el formulario: te respondo por el mismo canal.",
    },
  ] as const,
  contact: {
    phone: "+54 9 11 6414-4515",
    phoneHref: "+5491164144515",
    email: "karla.armijos@outlook.com",
    /** Tiempo estimado de respuesta para el formulario / WhatsApp. */
    responseTime: "24–48 hs hábiles",
    /** Solo dígitos, formato que exige wa.me. */
    whatsappNumber: "5491164144515",
    whatsappUrl:
      "https://wa.me/5491164144515?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita%20con%20la%20Dra.%20Armijos.",
  },
  social: {
    instagram: "https://instagram.com/dra.karmijos",
    instagramHandle: "@dra.karmijos",
    linkedin: "https://www.linkedin.com/in/karla-armijos-56a5b719a",
    linkedinHandle: "Karla Armijos",
  },
  tagline: "Dormir bien es salud",
} as const;
