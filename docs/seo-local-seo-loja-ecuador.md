# Reporte SEO y SEO local — Playhouse, Loja, Ecuador

**Fecha:** 31 de julio de 2026  
**Alcance:** sitio Playhouse, intención de búsqueda en español, Loja y Ecuador, y las seis palabras clave entregadas.  
**Dominio revisado:** `playhouseec.com` (el dominio configurado en el código es `playhouse.ec`).

## Resumen ejecutivo

Playhouse tiene una propuesta diferenciada: teatro educativo en inglés, shows musicales, talleres y aprendizaje experiencial. La oportunidad SEO existe, pero el sitio todavía no está preparado para competir de forma consistente por búsquedas de servicio local.

### Prioridades críticas

1. **Resolver el dominio canónico.** `playhouse.ec` no resolvió por DNS durante la revisión; `playhouseec.com` sí respondió. El HTML de producción mantiene canónicas, alternates y verificación de Google hacia `playhouse.ec`. Esto puede dividir señales, generar URLs canónicas inaccesibles y bloquear indexación correcta.
2. **Corregir la entidad local.** El contenido de contacto incluye valores de ejemplo como `Barcelona, España` y `+34 600 000 000`. Debe reemplazarse por datos reales de Loja o eliminarse hasta tenerlos confirmados.
3. **Crear páginas de servicio indexables.** Hoy la propuesta vive principalmente en una landing de una sola página. Las búsquedas `clases`, `cursos`, `teatro musical` e `inglés por edades` necesitan URLs y contenidos específicos.
4. **Activar SEO local real.** Crear/verificar Google Business Profile, publicar dirección o área de servicio real, teléfono local/WhatsApp, horarios, fotos, reseñas y enlaces consistentes.
5. **Añadir rastreabilidad técnica.** No se encontraron `sitemap.xml`, `robots.txt` ni JSON-LD `LocalBusiness` en el proyecto ni en la respuesta pública revisada.

## Diagnóstico del sitio actual

### Fortalezas

- Título en español orientado a Loja: `Playhouse – Teatro Educativo en Inglés | Loja, Ecuador`.
- Meta descripción con teatro educativo, shows musicales, talleres, niños y jóvenes.
- Rutas bilingües `/es` y `/en`, `hreflang` y canonical declarados.
- HTML renderizado en servidor: el contenido principal está disponible sin depender exclusivamente de JavaScript.
- WhatsApp visible y perfiles sociales enlazados.
- La propuesta combina categorías difíciles de diferenciar: teatro + inglés + pedagogía + experiencia escénica.

### Problemas y riesgo

| Prioridad | Hallazgo | Impacto | Acción |
|---|---|---|---|
| P0 | `playhouse.ec` no resolvió; el servidor responde en `playhouseec.com`. | Canónicas, OG y alternates apuntan a un host inaccesible. | Elegir un dominio oficial. Configurar DNS, HTTPS, redirección 301 y actualizar todas las URLs. |
| P0 | Contacto de ejemplo en `src/content/playhouse/index.ts`: Barcelona y teléfono `+34`. | Señal local contradictoria; baja confianza y riesgo de leads perdidos. | Sustituir por datos reales de Loja antes de publicar. |
| P1 | Sin `sitemap.xml` ni `robots.txt`. | Menor control de rastreo y descubrimiento. | Crear `src/app/sitemap.ts` y `src/app/robots.ts`. |
| P1 | Sin JSON-LD `LocalBusiness`/`Organization` visible. | Menos claridad de entidad y ubicación. | Añadir `EducationalOrganization` o `LocalBusiness` específico, solo con datos verificables. |
| P1 | Landing única para múltiples intenciones. | Difícil posicionar una sola URL para servicios distintos. | Crear páginas `/es/teatro-musical`, `/es/teatro-en-ingles`, `/es/clases-de-teatro`, `/es/cursos-de-ingles`. |
| P1 | La keyword principal no aparece con suficiente precisión en URLs, H1 y arquitectura de servicios. | Menor relevancia temática. | Un servicio principal por página; evitar repetir keywords de forma artificial. |
| P2 | `keywords` meta existe en el código. | No es una palanca relevante de Google y puede distraer del contenido útil. | Mantener opcionalmente, pero priorizar texto, enlaces, entidad, rendimiento y conversiones. |
| P2 | No hay señales comprobables de reseñas, dirección, horarios o categorías de GBP. | Baja visibilidad en Maps/pack local. | Completar GBP y alinear NAP: nombre, dirección, teléfono. |

## Análisis de palabras clave

No se asignan volúmenes numéricos sin datos de Keyword Planner o Search Console. La cuenta de Google Cloud disponible no permitió consultar la API de Search Console: la solicitud a `webmasters/v3/sites` devolvió `403`. Por eso, la prioridad se basa en intención, cercanía a conversión, competencia visible y ajuste con la oferta real.

| Keyword | Intención | Encaje | Prioridad | URL recomendada | Título sugerido |
|---|---|---:|---:|---|---|
| **Teatro musical** | Informativa/comercial; puede buscar obras, clases o eventos. | Medio-alto | P1 | `/es/teatro-musical` | Teatro musical en Loja: shows y formación escénica |
| **Teatro en ingles** | Servicio local; la tilde debe cubrirse en texto, no en la URL. | Muy alto | P0 | `/es/teatro-en-ingles` | Teatro en inglés en Loja, Ecuador | Playhouse |
| **Clases de teatro** | Alta intención de inscripción; padres, jóvenes y adultos. | Alto | P0 | `/es/clases-de-teatro` | Clases de teatro en Loja para niños, jóvenes y adultos |
| **Clases de Ingles para niños, jovenes y adultos** | Servicio transaccional; demanda segmentada por edad. | Alto | P0 | `/es/clases-de-ingles` | Clases de inglés en Loja para niños, jóvenes y adultos |
| **Cursos de teatro** | Comercial; busca programa, duración, horarios y cupos. | Alto | P0 | `/es/cursos-de-teatro` | Cursos de teatro en Loja: actuación, voz y movimiento |
| **Cursos de ingles** | Muy competida y amplia; intención comercial. | Medio | P1 | `/es/cursos-de-ingles` | Cursos de inglés en Loja con aprendizaje a través del teatro |

### Variantes locales que conviene trabajar

- teatro musical en Loja
- teatro musical para niños en Loja
- teatro en inglés para niños en Loja
- clases de actuación en Loja
- talleres de teatro en Loja
- curso de teatro para niños en Loja
- curso de teatro para jóvenes en Loja
- clases de teatro para adultos en Loja
- clases de inglés para niños en Loja
- inglés para jóvenes en Loja
- inglés para adultos en Loja
- cursos de inglés presenciales en Loja
- teatro educativo en Loja
- talleres de inglés con teatro en Loja
- actividades extracurriculares para niños en Loja

### Mapeo de contenido recomendado

No crear seis páginas casi idénticas. Cada página debe resolver una necesidad distinta:

1. **Teatro en inglés:** metodología, beneficios, formato para escuelas/familias, edad, modalidad y CTA.
2. **Clases/cursos de teatro:** niveles, edades, competencias, horarios, duración, muestra final y cupos.
3. **Clases/cursos de inglés:** niveles, edades, objetivos comunicativos y cómo el teatro/música apoya el aprendizaje.
4. **Teatro musical:** repertorio, canto, actuación, movimiento, shows y eventos.
5. **Página por audiencia:** familias, colegios y docentes. Cada una con problemas, resultados y CTA específicos.
6. **Blog o agenda:** obras, talleres, vacaciones, actividades para colegios, vocabulario y casos reales. Solo publicar contenido útil, con autor y fecha.

## SEO local para Loja

### Google Business Profile

Crear o reclamar un perfil con el nombre real de la marca. No añadir keywords al nombre salvo que formen parte del nombre comercial usado públicamente.

Completar:

- categoría principal más precisa disponible para la actividad real;
- categorías secundarias solo si describen servicios reales;
- dirección exacta si reciben público en una sede verificable;
- área de servicio si trabajan en colegios o se desplazan y no atienden en un local abierto;
- teléfono/WhatsApp de Ecuador consistente con el sitio;
- horarios normales y horarios especiales para talleres/eventos;
- enlace al dominio oficial y a una landing local;
- descripción con Loja, teatro educativo, inglés y públicos atendidos;
- fotos reales: clases, elenco, escenario, materiales, equipo y fachada si existe.

Google recomienda usar datos estructurados `LocalBusiness` para comunicar horarios, departamentos y otros datos de un negocio local, pero el marcado debe reflejar datos visibles y verificables en la página. Fuente: [Google Search Central — LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business).

### Reseñas y prominencia

Solicitar reseñas auténticas después de shows o cursos. Pedir que describan la experiencia de forma natural —por ejemplo, edad del estudiante, curso, metodología o ciudad— sin entregar guiones ni incentivos condicionados.

Responder todas las reseñas. Enlazar desde redes sociales, colegios colaboradores y notas de prensa a la página correcta. Evitar directorios de baja calidad y páginas ciudad repetitivas sin contenido propio.

### Consistencia NAP

Definir una única ficha:

```text
Nombre: Playhouse [nombre comercial oficial]
Ciudad: Loja, Loja, Ecuador
Teléfono: +593 [número real]
WhatsApp: +593 [número real]
Web: https://[dominio-oficial]/es
Horario: [horario real]
Dirección o área de servicio: [dato real]
```

Usar exactamente esos datos en sitio, GBP, Instagram, Facebook, TikTok, YouTube, directorios y materiales PDF.

## Plan de implementación de 90 días

### Días 1–7: corrección de base

- Decidir entre `playhouse.ec` y `playhouseec.com`.
- Corregir DNS, SSL, redirecciones y `siteUrl`.
- Actualizar canonical, `hreflang`, Open Graph, Twitter, imágenes absolutas y verificación.
- Eliminar datos de ejemplo de Barcelona y confirmar datos reales de Loja.
- Añadir `robots.ts`, `sitemap.ts`, favicon y `Organization`/`LocalBusiness` verificable.
- Verificar que `/es`, `/en`, assets, formularios y WhatsApp devuelvan estado correcto.

### Días 8–30: arquitectura y conversión

- Publicar las cuatro páginas de servicio prioritarias.
- Añadir H1 único, title, description, breadcrumbs, FAQ visible y enlaces internos.
- Crear CTAs diferenciados: reservar taller, solicitar propuesta para colegio, inscribirse y escribir por WhatsApp.
- Añadir pruebas de confianza: equipo, experiencia, testimonios, instituciones colaboradoras y fotos reales.
- Validar datos estructurados con Rich Results Test y Schema Markup Validator.

### Días 31–60: autoridad local

- Crear/verificar GBP.
- Cargar 15–25 fotos originales y publicar actualizaciones semanales.
- Conseguir 5–10 reseñas auténticas iniciales y responderlas.
- Obtener menciones de escuelas, centros culturales, prensa local, Municipio de Loja y organizaciones colaboradoras cuando sean reales.
- Publicar una página de agenda/eventos con fechas, lugar, edades y CTA.

### Días 61–90: medición y expansión

- Conectar Search Console al dominio final y enviar sitemap.
- Medir consultas, páginas, impresiones, CTR, conversiones y llamadas/WhatsApp.
- Usar Keyword Planner para validar demanda y separar variantes exactas, amplias y locales.
- Expandir páginas por audiencia/edad solo donde exista oferta real.
- Mejorar los titles con CTR bajo y posiciones 5–20.

## Medición recomendada

Configurar estos eventos en GA4 o una herramienta equivalente:

- `whatsapp_click`
- `contact_form_start`
- `contact_form_submit`
- `course_inquiry`
- `school_inquiry`
- `material_download`
- `phone_click`

Reporte mensual mínimo:

| Indicador | Objetivo inicial |
|---|---|
| Páginas indexadas | Todas las páginas de servicio válidas |
| Consultas locales | Crecimiento de variantes con “Loja” |
| CTR orgánico | Mejorar titles/descriptions de páginas con impresiones |
| Posiciones | Entrar al top 20 y luego top 10 en páginas P0 |
| Leads | Más formularios, WhatsApp y llamadas calificadas |
| GBP | Vistas, búsquedas, llamadas, mensajes, rutas y clics web |
| Reseñas | Crecimiento sostenido y respuestas completas |

## Conclusión

La estrategia no debe intentar posicionar Playhouse como una academia genérica de inglés ni como un teatro convencional. El activo diferencial es **teatro educativo en inglés en Loja**. La ruta más rápida es corregir dominio y datos locales, crear páginas de servicio con intención transaccional y convertir GBP, reseñas y alianzas locales en señales consistentes.

## Fuentes y alcance

- Revisión del código del proyecto y del HTML público de `playhouseec.com`, 31-07-2026.
- [Google Search Central — LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business).
- [Fine Tuned English — cursos de inglés en Loja](https://fte.edu.ec/), competidor visible en búsquedas locales.
- [Educaedu — cursos de inglés en Loja](https://www.educaedu.com.ec/cursos/ingles/loja), agregador visible en búsquedas locales.
- [Great English — cursos de inglés en Ecuador](https://www.great.com.ec/), competidor nacional visible.
- Los resultados de búsqueda son una fotografía del momento y no sustituyen volúmenes de Keyword Planner ni datos propios de Search Console.
