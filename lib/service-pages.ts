export type ServicePageSection = {
  title: string;
  paragraphs: string[];
};

export type ServicePageFaq = {
  question: string;
  answer: string;
};

export type ServicePage = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  lead: string;
  sections: ServicePageSection[];
  faqs: ServicePageFaq[];
  relatedSlugs: string[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "otorrino-buenos-aires",
    title: "Otorrino en Buenos Aires — Consulta ORL en CEMIC y Británico",
    description:
      "Otorrinolaringóloga en Buenos Aires (CABA). Consulta por oído, nariz y garganta, sinusitis, alergias, rinología y pediatría ORL. Turnos en CEMIC y Hospital Británico.",
    keywords: [
      "otorrino",
      "otorrino CABA",
      "otorrinolaringólogo Buenos Aires",
      "ORL Buenos Aires",
      "consulta otorrino",
    ],
    eyebrow: "Otorrinolaringología · Buenos Aires",
    h1: "Otorrino en Buenos Aires — oído, nariz y garganta",
    lead: "Soy la Dra. Karla Armijos, otorrinolaringóloga en CABA. Atiendo adultos y niños en CEMIC (Av. Las Heras 2900) y Hospital Británico (Perdriel 74), con foco en rinología, respiración nasal y trastornos del sueño.",
    sections: [
      {
        title: "Cuándo consultar con un otorrino",
        paragraphs: [
          "Conviene una evaluación ORL si tenés congestión nasal persistente, sinusitis a repetición, pérdida de olfato, otitis frecuentes, dolor de garganta crónico, ronquidos o sospecha de apnea del sueño. En niños, también por respiración bucal, adenoides o amígdalas aumentadas.",
          "En la primera consulta revisamos tu historia clínica, el motivo de consulta y qué estudios pueden aportar — endoscopia nasal, audiometría u otros según el caso. El objetivo es un plan claro, sin protocolos genéricos.",
        ],
      },
      {
        title: "Rinología y cirugía nasal",
        paragraphs: [
          "Como especialista en rinología aplicada, evalúo desviación de tabique, pólipos, sinusitis crónica y obstrucción nasal. No toda obstrucción requiere cirugía: muchas veces el tratamiento médico es suficiente.",
          "Cuando la cirugía aporta un beneficio concreto — septoplastia, rinoplastia funcional o procedimientos endoscópicos — te explico tiempos, recuperación y límites realistas antes de decidir.",
        ],
      },
      {
        title: "Dónde atiendo en Buenos Aires",
        paragraphs: [
          "Consultorio en CEMIC los miércoles y jueves, y también en Hospital Británico. Podés agendar por WhatsApp o formulario web; respondo en 24–48 hs hábiles.",
          "Matrícula nacional MN 156125. Miembro de instituciones como FASO y con práctica en centros de referencia de la ciudad.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cómo agendo con un otorrino en Buenos Aires?",
        answer:
          "Escribime por WhatsApp o completá el formulario de la web. Coordinamos turno en CEMIC o Hospital Británico según disponibilidad.",
      },
      {
        question: "¿Atiende otorrino pediátrico?",
        answer:
          "Sí. Evalúo respiración bucal, otitis a repetición, adenoides, amígdalas y otros cuadros ORL en niños, siempre con explicación clara para la familia.",
      },
      {
        question: "¿Qué diferencia hay entre otorrino y rinólogo?",
        answer:
          "El otorrino (ORL) ve oído, nariz y garganta en general. La rinología es una subespecialidad centrada en nariz, senos paranasales y vías aéreas superiores — área en la que tengo formación específica.",
      },
    ],
    relatedSlugs: ["ronquidos", "apnea-del-sueno"],
  },
  {
    slug: "ronquidos",
    title: "Ronquidos — Diagnóstico y Tratamiento en Buenos Aires",
    description:
      "Consulta por ronquidos en CABA. Evaluación ORL, estudio del sueño y tratamiento médico o quirúrgico. Dra. Karla Armijos — CEMIC y Hospital Británico.",
    keywords: [
      "ronquidos",
      "ronquidos tratamiento",
      "ronquidos Buenos Aires",
      "dejar de roncar",
      "ronquidos solución",
    ],
    eyebrow: "Trastornos del sueño · Buenos Aires",
    h1: "Ronquidos: cuándo consultar y qué tratamiento existe",
    lead: "Los ronquidos no siempre son inofensivos. Si roncás todas las noches, te despertás cansado o tu pareja nota pausas en la respiración, conviene una evaluación otorrinolaringológica en Buenos Aires.",
    sections: [
      {
        title: "Ronquidos leves vs. señales de alerta",
        paragraphs: [
          "Roncar ocasionalmente puede deberse a congestión, alcohol o cansancio. Pero el ronquido habitual, acompañado de somnolencia diurna, dolor de cabeza matutino o ahogos nocturnos, puede indicar apnea del sueño u otra obstrucción de vías aéreas.",
          "En consulta evaluamos anatomía nasal y faríngea, hábitos de sueño y factores de riesgo. Según el cuadro, indico polisomnografía domiciliaria, estudio en centro del sueño u otras herramientas.",
        ],
      },
      {
        title: "Opciones de tratamiento para ronquidos",
        paragraphs: [
          "No todos los ronquidos requieren CPAP ni cirugía. Cambios de peso, posición al dormir, tratamiento de alergias nasales o dispositivos intraorales pueden ayudar en casos seleccionados.",
          "Cuando hay apnea obstructiva del sueño confirmada, el CPAP suele ser el pilar del tratamiento. En otros casos, la cirugía de vías aéreas superiores puede reducir ronquidos y mejorar el flujo de aire — siempre con criterio individual.",
        ],
      },
      {
        title: "Consulta en CABA",
        paragraphs: [
          "Atiendo en CEMIC y Hospital Británico. Si buscás otorrino por ronquidos en Buenos Aires, podés agendar cita online o por WhatsApp. Te explico el camino diagnóstico antes de pedir cualquier estudio.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Todos los ronquidos son apnea del sueño?",
        answer:
          "No. Hay ronquido primario sin apnea. Por eso la evaluación y, cuando corresponde, el estudio del sueño son clave para no subtratar ni sobretratar.",
      },
      {
        question: "¿La cirugía cura los ronquidos?",
        answer:
          "Depende de la causa. En obstrucción nasal o faríngea seleccionada puede mejorar ronquidos y respiración. No es la primera opción en todos los casos; lo definimos en consulta.",
      },
      {
        question: "¿Qué estudio se pide para ronquidos?",
        answer:
          "A veces basta la evaluación clínica y endoscópica. Si hay sospecha de apnea, la polisomnografía confirma diagnóstico y gravedad.",
      },
    ],
    relatedSlugs: ["apnea-del-sueno", "otorrino-buenos-aires"],
  },
  {
    slug: "apnea-del-sueno",
    title: "Apnea del Sueño — Consulta y Tratamiento en Buenos Aires",
    description:
      "Otorrino especialista en apnea del sueño en CABA. Polisomnografía, CPAP y cirugía de vías aéreas. Turnos CEMIC y Hospital Británico. Dra. Karla Armijos.",
    keywords: [
      "apnea del sueño",
      "apnea del sueño Buenos Aires",
      "apnea obstructiva del sueño",
      "CPAP Buenos Aires",
      "estudio del sueño",
    ],
    eyebrow: "Apnea obstructiva · Buenos Aires",
    h1: "Apnea del sueño: diagnóstico y tratamiento en Buenos Aires",
    lead: "La apnea del sueño afecta la calidad de vida y la salud cardiovascular. Como otorrinolaringóloga con foco en trastornos respiratorios del dormir, evalúo y trato apnea leve a moderada en adultos en CABA.",
    sections: [
      {
        title: "Síntomas de apnea del sueño",
        paragraphs: [
          "Pausas respiratorias durante el sueño, ronquidos fuertes, despertares con ahogo, somnolencia diurna, dificultad para concentrarte, irritabilidad o dolor de cabeza al despertar son señales frecuentes.",
          "Muchas personas conviven años con apnea leve sin diagnóstico. Una consulta oportuna puede cambiar la calidad del sueño y reducir riesgos asociados.",
        ],
      },
      {
        title: "Diagnóstico: polisomnografía y más",
        paragraphs: [
          "La polisomnografía es el estudio de referencia. Según el caso, puede realizarse en laboratorio del sueño o en modalidad domiciliaria. También uso evaluación clínica, cuestionarios validados y monitoreo con dispositivos wearables cuando aportan información útil.",
          "Te explico qué estudio conviene y por qué, antes de solicitarlo.",
        ],
      },
      {
        title: "Tratamiento de la apnea del sueño",
        paragraphs: [
          "El CPAP es el tratamiento de elección en apnea moderada a severa. Adaptar la máscara y entender el tratamiento es parte del seguimiento — no alcanza con recetar el equipo.",
          "En casos seleccionados, la cirugía de vías aéreas superiores (tabique, cornetes, paladar, amígdalas) puede complementar o, en apnea leve, ser una alternativa. También evaluamos bruxismo asociado y fatiga diurna residual.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Dónde hacer estudio de apnea del sueño en Buenos Aires?",
        answer:
          "Según tu cuadro, indico polisomnografía en centro del sueño o estudio domiciliario. La orden y coordinación se definen en consulta ORL.",
      },
      {
        question: "¿El CPAP se usa de por vida?",
        answer:
          "En muchos casos sí, mientras haya indicación. En apnea leve post-quirúrgica o con cambios de peso, a veces se reevalúa. Cada situación es distinta.",
      },
      {
        question: "¿Apnea del sueño y ronquidos son lo mismo?",
        answer:
          "No. El ronquido es un síntoma; la apnea implica pausas respiratorias repetidas. Pueden coexistir, pero requieren evaluación específica.",
      },
    ],
    relatedSlugs: ["ronquidos", "otorrino-buenos-aires"],
  },
];

export const servicePagesBySlug = Object.fromEntries(
  servicePages.map((page) => [page.slug, page]),
) as Record<string, ServicePage>;

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePagesBySlug[slug];
}
