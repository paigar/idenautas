---
title: La semántica en HTML5
heroImage: idenautas-web/blog/011.png
alt: Pantalla de ordenador con imágenes y gran cantidad de texto
date: 2023-01-28
description: En el mundo del desarrollo web, hablamos de contenido semántico cuando los robots comprenden la estructura de un documento y los roles de los elementos dentro de él.
tags: ["desarrollo-tecnico"]
---

Hay algo que diferencia a un HTML bien escrito de uno que simplemente funciona: la semántica. Dos páginas pueden verse idénticas en el navegador y comportarse de forma completamente distinta para un motor de búsqueda, un lector de pantalla o un desarrollador que hereda el código meses después.

La semántica es el estudio del significado. En el contexto de HTML, un elemento semántico es aquel que describe claramente qué es, no solo cómo se ve. Esa distinción parece pequeña hasta que empiezas a trabajar con webs complejas o a preocuparte de verdad por la accesibilidad y el SEO.

## Etiquetas semánticas y el esquema del documento

El concepto no nació con HTML5. Tim Berners-Lee ya hablaba de la "web semántica" en 2001, refiriéndose a una web donde los datos fueran interpretables por máquinas. HTML siempre tuvo etiquetas con significado implícito: `form` contiene un formulario, `img` contiene una imagen. Nadie pondría un titular dentro de una etiqueta `img`. Eso es semántica, aunque no siempre se llamara así.

El problema llegó con el diseño basado en tablas. Durante años, los desarrolladores usaron `table` para maquetar páginas enteras, convirtiendo una etiqueta con un significado claro en un contenedor genérico. La lógica estructural se sacrificó a cambio de control visual.

### Los div y el problema de la "divitis"

Cuando el diseño basado en tablas cayó en desuso, llegaron los `div`. Y los `div` tienen un problema fundamental: no significan nada. Un `div` dentro de otro `div` no establece ninguna relación semántica entre ambos. Son contenedores vacíos de significado, útiles para aplicar estilos pero incapaces de decirle nada a un motor de búsqueda o a un lector de pantalla sobre qué contienen.

Eso no significa que los `div` sean malos. Son necesarios cuando necesitas agrupar elementos con fines de estilo y no existe una etiqueta más específica. El problema es usarlos para todo, por defecto, sin preguntarse si hay algo más adecuado.

### Lo que trajo HTML5

HTML5 introdujo elementos de sección que permiten definir la estructura del documento de forma explícita:

- `section` para agrupar contenido alrededor de un tema concreto.
- `article` para composiciones autocontenidas, como una entrada de blog o una noticia.
- `nav` para bloques de navegación.
- `aside` para contenido complementario, como una barra lateral o un bloque de información relacionada.

A estos se suman `header` y `footer`, que no crean nuevas secciones sino que dividen el contenido dentro de las existentes. Cada elemento de sección —`body`, `article`, `section`, `nav`, `aside`— puede tener su propio `header` y su propio `footer`.

También llegaron etiquetas de texto más específicas: `time` para fechas y horas legibles por máquinas, `mark` para texto destacado con significado contextual.

## Cómo construir un documento bien estructurado

Hay algunas reglas que conviene tener claras cuando trabajas con HTML semántico:

El elemento más externo siempre es `body`. Dentro de él, las secciones pueden anidarse libremente. Cada sección tiene su propia jerarquía de encabezados, lo que significa que cada una puede tener su propio `h1` sin que eso rompa la lógica del documento.

Lo que sí rompe la lógica es saltar niveles de encabezado sin motivo. Si el primer encabezado de una sección es un `h3`, los siguientes encabezados dentro de esa sección deben ser `h4` o inferior, no volver a subir a `h2`.

Los elementos `nav` y `aside` son un caso especial: no pertenecen al esquema principal del documento y las tecnologías de asistencia suelen tratarlos de forma diferente. Un lector de pantalla puede anunciar que el usuario está entrando en una región de navegación, lo que le ayuda a orientarse sin tener que escuchar todo el menú.

## Por qué importa más de lo que parece

Una estructura HTML semántica tiene beneficios concretos. Google entiende mejor qué partes de tu página son el contenido principal y cuáles son navegación o contenido secundario. Los lectores de pantalla pueden ofrecer una experiencia de navegación coherente a personas con discapacidad visual. Y cualquier desarrollador que abra el código seis meses después sabrá qué está mirando sin tener que ejecutar la página.

El HTML bien escrito no es un lujo de proyectos con presupuesto. Es simplemente la forma correcta de hacerlo, y en la mayoría de casos no requiere más tiempo que la alternativa.
