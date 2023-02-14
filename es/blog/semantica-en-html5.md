---
titulo: La <b>semántica</b> en HTML5
uuid: e4e68fab-1f8b-4660-8f4b-56531aa28498
date: 2023-01-28
description: En el mundo del desarrollo web, hablamos de contenido semántico cuando los robots comprenden la estructura de un documento y los roles de los elementos dentro de él.
---

El diseño web y la programación han evolucionado mucho a lo largo de los años, y con el avance de la tecnología, es cada vez más importante prestar atención a la estructura y la semántica de los documentos HTML. Si se planifica cuidadosamente la estructura de los documentos HTML, se puede ayudar a los robots a comprender mejor el significado del contenido.

La sintaxis correcta es importante, pero básicamente sólo proporciona a los programas de análisis, motores de búsqueda y tecnologías de asistencia una serie de datos sin sentido. Si se mejora el flujo de trabajo de la web con atención a la semántica, se puede crear un contenido de mayor calidad que atraiga a más visitantes.

La semántica es el estudio del significado y, en un contexto más amplio, es una rama de la lógica y la lingüística. En el mundo del desarrollo web, hablamos de contenido semántico cuando los robots comprenden la estructura de un documento y los roles de los elementos dentro de él.

Si queremos crear una semántica adecuada, necesitamos comprender profundamente la estructura de nuestro contenido y las capacidades de las tecnologías de front-end. ¿Cuáles son los beneficios tangibles?

La semántica adecuada significa un contenido más buscable que lleva a una mejor clasificación en los motores de búsqueda. También aumentamos la accesibilidad, ya que las tecnologías de asistencia como los lectores de pantalla pueden interpretar mejor el significado de nuestro contenido.

Existen muchas técnicas de desarrollo de front-end que permiten a los desarrolladores lograr una estructura de página semántica. Este artículo proporcionará una breve introducción a las etiquetas HTML semánticas y al concepto del esquema de documento.

## Etiquetas HTML Semánticas y el Esquema de Documento

El concepto de la semántica no es tan nuevo como parece, existía mucho antes de la era de HTML5. El término "web semántica" fue acuñado tan temprano como en 2001 por Sir Tim Berners-Lee. Bajo "web semántica", se refería a una web de datos que puede ser procesada por máquinas.

Esto significa principalmente que los elementos HTML separados necesitan tener roles estructurales distinguibles.

Según la definición de W3C, "un elemento semántico describe claramente su significado tanto para el navegador como para el desarrollador".

### Los elementos semánticos antes de HTML5

Los elementos semánticos existían antes de HTML5 también, pero en la mayoría de los casos, los desarrolladores no eran conscientes de que algunas de las etiquetas que utilizaban eran en realidad semánticas.

Piensa en las etiquetas "form" o "img". Sus roles son claros para nosotros y para el agente de usuario: "form" simplemente contiene un formulario, al igual que "img" contiene una imagen. Nadie colocará nunca una tabla o un titular dentro de una etiqueta "img" (o al menos espero que no lo hagan).

El elemento "table" y sus etiquetas relacionadas, como las filas de tabla, las celdas de tabla, etc., son también etiquetas semánticas que existían antes de HTML5, sin embargo, debido al diseño basado en tablas que se utilizaba mucho durante muchos años, la mayoría de los desarrolladores no las utilizaron de manera semántica.

**Durante muchos años las página web sacrificaron la lógica de la estructura a cambio de las opciones de disposición de elementos**.

### Elementos no-semánticos

Los elementos no-semánticos no tienen ningún significado especial, las relaciones jerárquicas entre ellos son simplemente ilusorias. Los ejemplos más utilizados de etiquetas HTML no-semánticas son las etiquetas "div" y "span".

Los div no son necesariamente incorrectos, pero la "divitis" debe ser combatida si queremos escribir un código HTML mantenible, modular y significativo.

El verdadero problema del uso excesivo e irrazonable de la etiqueta "div" es que si incluimos un div dentro de otro div, parece que el div exterior sería el elemento padre del interior, cuando en realidad no es así. No hay relación entre los dos, al igual que en el caso de la etiqueta "span" que funciona de la misma manera, pero a nivel de línea.

En cualquier caso, tanto div como span, todavía son la mejor opción para agrupar contenido únicamente con fines de estilo y en otros casos de último recurso.

### La semántica en HTML5

HTML5 introdujo muchos nuevos elementos semánticos que permiten una fácil organización del contenido. No solo ayudan a organizar el contenido a nivel de todo el documento (ver en detalle en la siguiente sección), sino también dentro de bloques de texto, como etiquetas en línea.

Probablemente, las etiquetas semánticas de nivel de texto más populares son "strong" y "em", pero también existían antes de HTML5. Entre los nuevos elementos semánticos en línea podemos encontrar, por ejemplo, la etiqueta "time" para fechas y horas legibles para humanos y la etiqueta "mark" para destacar texto.

### Esquema del Documento en HTML5

El esquema de un documento en HTML5 se refiere a la estructura de dicho documento, es decir, a cómo están relacionados los diferentes elementos que lo componen. En versiones anteriores de HTML, como HTML4.01 y XHTML, la generación del esquema se basaba en la identificación de elementos como encabezados, títulos de tablas o de formularios.

Con HTML5, el algoritmo de esquematización se ha mejorado gracias a la inclusión de nuevos elementos de sección, a saber:

- "section" para secciones agrupadas alrededor de un tema específico.
- "article" para composiciones completas o autocontenidas, como una publicación de blog o un widget.
- "nav" para bloques de navegación.
- "aside" para contenidos complementarios, como barras laterales.

Existe un quinto elemento de sección en HTML5, que no es nuevo, se trata del elemento "body". Además, se han incluido nuevos elementos como "header" y "footer", aunque no generan nuevas secciones en el documento. En cambio, estos elementos dividen el contenido dentro de las secciones existentes. Esto significa que cada elemento de sección (body, article, section, nav y aside) puede tener su propio encabezado y pie de página.

## Consejos para contenido estructurado semánticamente

Si queremos crear un esquema de documento bien estructurado, debemos prestar atención a las siguientes reglas:

- El elemento de seccionamiento más externo es siempre la etiqueta "body".

- Las secciones en HTML5 pueden estar anidadas.

- Cada sección tiene su propia jerarquía de encabezados. Cada una de ellas (incluso la sección anidada más interna) puede tener una etiqueta h1.

- Mientras que el esquema del documento está definido principalmente por los 5 elementos de seccionamiento, también necesita encabezados adecuados para cada sección.

- Siempre es el primer elemento de encabezado (ya sea h1 o una etiqueta de encabezado de rango inferior) que define el encabezado de la sección dada. Las etiquetas de encabezado siguientes dentro de la misma sección deben ser relativas a esto. (Si el primer encabezado es un h4 dentro de un elemento de seccionamiento, no ponga un h4 después de eso).

- Las secciones definidas por las etiquetas "nav" y "aside" no pertenecen al esquema principal del documento HTML y generalmente no se representan inicialmente por tecnologías de asistencia.

- Cada sección (body, section, article, aside, nav) puede tener sus propias etiquetas "header" y "footer", que definen el encabezado (como el logotipo, el nombre del autor, las fechas, la información de metadatos, etc.) y el pie de página (derechos de autor, notas, enlaces, etc.) de esa sección.
