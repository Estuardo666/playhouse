import type { SupportedLocale } from "@/content/config"

export type FaqItem = { question: string; answer: string }

export const FAQ: Record<SupportedLocale, FaqItem[]> = {
  es: [
    { question: "¿Qué es el teatro educativo en inglés?", answer: "Es una metodología que combina actuación, música, movimiento y conversación para aprender inglés en situaciones creativas y memorables." },
    { question: "¿Playhouse ofrece clases de teatro en Loja?", answer: "Sí. Ofrecemos talleres y experiencias de teatro en inglés para niños, jóvenes, familias, colegios e instituciones culturales en Loja." },
    { question: "¿Para qué edades son las clases de inglés?", answer: "Diseñamos actividades para niños, jóvenes y adultos, adaptando el lenguaje, el ritmo y los objetivos a cada grupo." },
    { question: "¿Ofrecen cursos de teatro para niños, jóvenes y adultos?", answer: "Sí. Los contenidos pueden incluir actuación, voz, movimiento, improvisación, storytelling y teatro musical según la edad y el objetivo." },
    { question: "¿Las actividades son presenciales en Loja?", answer: "Trabajamos en Loja y también colaboramos con colegios, familias y espacios culturales según el formato de cada experiencia." },
    { question: "¿Playhouse trabaja con colegios?", answer: "Sí. Creamos shows, talleres, intervenciones de aula y residencias artísticas adaptadas a la comunidad educativa." },
    { question: "¿Cómo puedo reservar un taller o show?", answer: "Escríbenos por WhatsApp o mediante el formulario de contacto para contarnos la edad, el grupo, la fecha y el tipo de experiencia que buscas." },
    { question: "¿Cómo funcionan los cursos de teatro musical?", answer: "Integran actuación, canto y movimiento para desarrollar expresión, confianza, escucha y trabajo en equipo." },
  ],
  en: [
    { question: "What is educational theatre in English?", answer: "It combines acting, music, movement, and conversation to make English learning creative, practical, and memorable." },
    { question: "Does Playhouse offer theatre classes in Loja?", answer: "Yes. We offer English theatre workshops and experiences for children, young people, families, schools, and cultural institutions in Loja." },
    { question: "What ages are English classes for?", answer: "We design activities for children, young people, and adults, adapting language, pace, and goals to each group." },
    { question: "Do you offer theatre courses for different ages?", answer: "Yes. Sessions can include acting, voice, movement, improvisation, storytelling, and musical theatre." },
    { question: "Are the activities held in Loja?", answer: "We work in Loja and collaborate with schools, families, and cultural spaces depending on the experience format." },
    { question: "Does Playhouse work with schools?", answer: "Yes. We create shows, workshops, classroom interventions, and artistic residencies for educational communities." },
    { question: "How can I book a workshop or show?", answer: "Contact us by WhatsApp or through the contact form with the age group, date, audience, and experience you need." },
    { question: "What happens in a musical theatre course?", answer: "Students combine acting, singing, and movement while developing expression, confidence, listening, and teamwork." },
  ],
}
