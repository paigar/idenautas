---
title: "LLMs.txt: el nuevo robots.txt para la era de la inteligencia artificial"
alt: Una mano sostiene un pequeño mapa luminoso y lo entrega a una figura abstracta que representa una inteligencia artificial, con la estructura de un sitio web iluminada al fondo
date: 2026-04-13
heroImage: idenautas-web/blog/157.png
description: ChatGPT, Claude, Perplexity y Gemini ya no solo indexan la web, la leen. Un nuevo archivo llamado llms.txt propone darles un mapa curado de tu sitio para que entiendan lo importante sin perderse en la maraña del HTML. Te explico qué es, cómo funciona y si deberías añadirlo a tu web.
tags: ["desarrollo-tecnico", "contenido-y-marketing"]
---

Durante casi treinta años, los buscadores han sido el puente entre tu web y las personas que buscaban información. El protocolo estaba claro: tú publicabas contenido, Google lo indexaba, y cuando alguien hacía una búsqueda, aparecías en una lista de resultados. Para que ese sistema funcionara, existía un archivo pequeño pero fundamental llamado `robots.txt` que indicaba a los rastreadores qué partes de tu sitio podían o no podían visitar.

En 2026 ese paradigma ha cambiado. Ya no son solo los buscadores quienes consumen la web. Son también los modelos de lenguaje: ChatGPT, Claude, Perplexity, Gemini, Copilot y decenas de asistentes integrados en navegadores, aplicaciones y sistemas operativos. Cuando alguien les hace una pregunta, estos modelos no siempre devuelven diez enlaces azules: cada vez más a menudo **leen el contenido de varias webs, lo sintetizan y generan una respuesta directa**.

Ese cambio tiene una consecuencia enorme para quien publica en internet. Ya no basta con que tu página aparezca en un listado. Ahora también importa si la inteligencia artificial **entiende lo que dices y lo representa bien** cuando otros le preguntan por tu ámbito, tus servicios o tu marca.

Y aquí es donde entra en escena una propuesta relativamente reciente: **llms.txt**.

## Qué es exactamente llms.txt

`llms.txt` es un archivo de texto plano, escrito en formato Markdown, que se coloca en la raíz de tu dominio, igual que `robots.txt`. Su dirección es siempre la misma: `https://tudominio.com/llms.txt`.

Su propósito es sencillo de enunciar pero profundo en sus implicaciones: **ofrecer a los modelos de lenguaje un resumen curado de tu sitio web, con enlaces directos a las páginas más importantes y una descripción concisa de cada una**. En lugar de obligar a la IA a rastrear decenas o cientos de páginas para adivinar qué es relevante, tú le entregas un mapa claro y estructurado.

La propuesta nació en septiembre de 2024 de la mano de Jeremy Howard, cofundador de Answer.AI y figura conocida en la comunidad de inteligencia artificial. Howard observó un problema práctico: los modelos de lenguaje tienen un contexto limitado, es decir, solo pueden "leer" una cantidad finita de texto cada vez. Cuando un modelo intenta entender una web compleja, con menús de navegación, pies de página, scripts, widgets y contenido mezclado, **se gasta gran parte de su capacidad en ruido**. Y lo que es peor: puede malinterpretar el contenido, priorizar lo accesorio o directamente ignorar lo importante.

La solución que propuso es elegante: dejar que el propio autor del sitio diga qué merece la pena leer y cómo está organizado. Un índice editorial, no un rastreo ciego.

## En qué se parece y en qué se diferencia de robots.txt

Es tentador ver `llms.txt` como "el robots.txt de la IA", y hasta cierto punto la analogía funciona: ambos son archivos de texto en la raíz del dominio, ambos están pensados para sistemas automatizados y ambos son convenciones voluntarias. Pero su intención es radicalmente distinta.

**robots.txt es un portero.** Le dice al rastreador: "esto sí lo puedes mirar, esto no". Su lenguaje es el de los permisos: `Allow`, `Disallow`, `User-agent`.

**llms.txt es un guía.** No dice lo que se puede o no se puede leer. Dice: "si has llegado hasta aquí y solo tienes tiempo para leer unas pocas cosas, lee estas y en este orden". No controla el acceso, facilita la comprensión.

Otra diferencia importante es el formato. `robots.txt` tiene una sintaxis propia, rígida, de los años noventa. `llms.txt` está escrito en Markdown, que es precisamente el formato que los modelos de lenguaje procesan con más naturalidad. No es casualidad: el archivo está diseñado desde el principio para ser leído por una IA, no por un rastreador tradicional.

Dicho esto, ambos archivos son complementarios, no alternativos. Una web bien configurada en 2026 debería tener los dos.

## Cómo es el formato del archivo

La especificación es deliberadamente minimalista. Un archivo `llms.txt` válido tiene esta estructura:

```markdown
# Nombre del sitio

> Una o dos frases que describan de qué trata este sitio, a quién va dirigido y qué valor ofrece.

Opcionalmente, un párrafo más de contexto general sobre el proyecto, la empresa o el autor.

## Sección principal

- [Título de la página](https://tudominio.com/pagina): breve descripción de qué encontrará el lector aquí.
- [Otro recurso](https://tudominio.com/otro): descripción igualmente breve.

## Otra sección

- [Enlace](https://tudominio.com/enlace): descripción.

## Opcional

- [Recursos secundarios](https://tudominio.com/extra): cosas útiles pero no esenciales.
```

<br/>
Solo hay unas pocas reglas:

- El archivo empieza con un encabezado H1 que contiene el nombre del sitio.
- A continuación, un bloque de cita (la línea que empieza por `>`) con un resumen corto.
- Después, secciones temáticas con encabezados H2, cada una conteniendo una lista de enlaces con descripciones.
- La sección opcional `## Opcional` (u `## Optional` en inglés) agrupa recursos que el modelo puede ignorar si tiene poco espacio de contexto.

La belleza de este formato es que un humano puede leerlo igual de bien que una máquina. No hay XML, ni JSON, ni etiquetas especiales. Es, literalmente, un índice escrito en lenguaje claro.

## llms.txt y llms-full.txt: dos niveles de profundidad

La propuesta contempla dos archivos distintos para dos casos de uso distintos.

**`llms.txt`** contiene solo el índice con enlaces y descripciones. Es ligero, cabe cómodamente en el contexto de casi cualquier modelo y sirve como mapa de navegación. Cuando un modelo lo lee, sabe qué existe en tu sitio y puede decidir qué páginas concretas vale la pena visitar a continuación.

**`llms-full.txt`** va un paso más allá: contiene **el texto completo** de tus páginas más importantes, ya concatenado y limpio de HTML, scripts y navegación. La idea es que un modelo pueda ingerir de una sola vez todo lo esencial de tu sitio sin tener que hacer múltiples peticiones. Para una documentación técnica o un blog, esto puede suponer la diferencia entre que la IA responda con precisión citando tus textos o que invente cosas que nunca dijiste.

No todas las webs necesitan ambos. Para un sitio corporativo pequeño, un `llms.txt` bien escrito suele bastar. Para una documentación de un producto, una API o un blog extenso, `llms-full.txt` es donde está la diferencia real.

## Un ejemplo concreto

Imagina que tienes una web de servicios de desarrollo web. Tu `llms.txt` podría parecerse a esto:

```markdown
# Estudio Ejemplo

> Estudio independiente de desarrollo web especializado en sitios rápidos, sostenibles y hechos a medida con tecnologías Jamstack. Trabajamos con pequeñas empresas y profesionales que valoran la calidad artesanal del código.

## Servicios

- [Desarrollo a medida](https://ejemplo.com/servicios/desarrollo): creación de sitios web desde cero usando generadores estáticos y despliegue en CDN.
- [Rediseño web](https://ejemplo.com/servicios/rediseno): auditoría y renovación completa de sitios existentes.
- [Consultoría de rendimiento](https://ejemplo.com/servicios/rendimiento): análisis y optimización de Core Web Vitals y sostenibilidad.

## Blog

- [Optimización de imágenes en 2026](https://ejemplo.com/blog/imagenes-2026): guía práctica sobre AVIF, WebP y variantes pregeneradas.
- [Por qué tu web contamina](https://ejemplo.com/blog/web-contamina): la huella de carbono de un sitio mal optimizado.
- [Jamstack explicado sin tecnicismos](https://ejemplo.com/blog/jamstack): introducción al enfoque moderno de desarrollo web.

## Sobre nosotros

- [Quiénes somos](https://ejemplo.com/sobre-nosotros): historia, valores y metodología del estudio.
- [Contacto](https://ejemplo.com/contacto): cómo trabajar con nosotros.

## Opcional

- [Página de agradecimientos](https://ejemplo.com/gracias): herramientas y personas que han inspirado nuestro trabajo.
```

<br/>
Un modelo que lea este archivo entiende en menos de un segundo qué hace el estudio, a quién se dirige, qué temas toca en su blog y cómo contactar. Si alguien le pregunta "¿qué estudios en España trabajan con Jamstack?", tiene contexto suficiente para mencionarte con propiedad.

## Pero… ¿los modelos lo respetan?

Esta es la pregunta incómoda y hay que responderla con honestidad: **no existe ninguna obligación de que los modelos lean o respeten `llms.txt`**. Es una convención, igual que `robots.txt` empezó siendo una convención a mediados de los años noventa. Su adopción depende de que los fabricantes de modelos y las empresas que los usan decidan apoyarla.

La buena noticia es que la adopción está creciendo rápido. Desde mediados de 2025, empresas como Anthropic, Cloudflare, Stripe, Hugging Face y Mintlify publican sus propios `llms.txt`. Las herramientas de documentación técnica están integrando su generación automática. Y los asistentes de programación más usados empiezan a consultarlos cuando un desarrollador les pide información sobre una librería o un servicio.

Lo que aún no existe es una garantía. Si publicas un `llms.txt` hoy, no sabes con certeza si ChatGPT lo va a leer cuando alguien pregunte por tu negocio. Pero el coste de publicarlo es prácticamente cero, y el beneficio, si la adopción sigue el camino que parece seguir, puede ser sustancial.

Piénsalo como una apuesta de bajo riesgo: no te cuesta casi nada hacerlo y te posiciona mejor para un futuro que probablemente se cumpla.

## Qué no es llms.txt

Para evitar malentendidos, conviene dejar claro lo que este archivo **no** es.

**No es un mecanismo de control de acceso.** Si quieres que un modelo no lea cierta parte de tu web, `llms.txt` no te sirve. Para eso existen `robots.txt` (aunque muchos rastreadores de IA lo ignoran) y cabeceras HTTP específicas como `X-Robots-Tag`.

**No es un sustituto del SEO tradicional.** Google sigue siendo Google, y aunque cada vez más búsquedas se resuelven con respuestas generativas, el SEO clásico y los datos estructurados siguen siendo esenciales.

**No es una garantía de aparecer en las respuestas de una IA.** Los modelos tienen sus propios criterios de selección, relevancia y confianza. `llms.txt` te da visibilidad y contexto, pero no te garantiza protagonismo.

**No es un estándar oficial todavía.** Es una propuesta en proceso de adopción, no una especificación del W3C ni del IETF. Puede evolucionar, cambiar de forma o incluso desaparecer si no gana tracción. De momento, todo apunta a que va en la dirección contraria.

## Cómo añadirlo a tu web paso a paso

Si quieres implementarlo hoy mismo en tu propio sitio, el proceso es más corto de lo que parece:

1. **Haz un inventario de las páginas más importantes de tu sitio.** No todas, solo las que de verdad representan lo que haces: servicios, artículos destacados, página "sobre nosotros", contacto. Entre diez y veinte enlaces suelen ser suficientes para un sitio pequeño o mediano.

2. **Escribe una descripción clara de cada una.** Una frase o dos como máximo. Imagina que estás explicándoselo a alguien que tiene prisa y necesita decidir si entrar o no.

3. **Redacta un resumen general de tu proyecto.** Una o dos frases que capturen qué haces, a quién sirves y qué te diferencia. Va en el bloque de cita al principio del archivo.

4. **Guarda todo en un archivo llamado `llms.txt`** con la estructura Markdown que vimos antes, y súbelo a la raíz de tu dominio, al mismo nivel que `robots.txt` y `sitemap.xml`.

5. **Comprueba que es accesible** visitando `https://tudominio.com/llms.txt` en tu navegador. Debería mostrarse como texto plano.

6. **Considera generar también `llms-full.txt`** si tu sitio tiene contenido denso (documentación, blog técnico, manuales). Puede generarse automáticamente a partir de tus archivos fuente durante el proceso de build si usas un generador estático.

7. **Revísalo cada cierto tiempo.** Igual que un sitemap, el `llms.txt` debe mantenerse actualizado cuando publiques contenido nuevo o reestructures tu web.

En un sitio estático bien organizado, todo el proceso cabe en una tarde. En un sitio con CMS, puede incluso automatizarse con un script que lea los artículos más visitados y los incluya en el listado.

## Por qué importa ahora, no el año que viene

Hay una tentación comprensible a decir "esperaré a que esto esté maduro antes de dedicarle tiempo". Con la mayoría de tecnologías, es una postura razonable. Con `llms.txt`, creo que no lo es, por tres razones.

La primera es que **el coste de implementarlo es mínimo**. No necesitas cambiar tu stack, tu CMS ni tu forma de trabajar. Es literalmente un archivo de texto.

La segunda es que **los modelos ya están leyendo tu web**, tengas o no un `llms.txt`. Si no les das un mapa curado, te representarán como buenamente puedan, interpretando tu home, tu menú y lo que encuentren primero. Y esa representación puede no ser la que te gustaría.

La tercera es que **la búsqueda generativa está creciendo más rápido que la búsqueda tradicional**. Cada mes hay más gente que pregunta a una IA en lugar de a Google. Y esa gente recibe respuestas, no listas de enlaces. Si en esas respuestas tu marca, tu proyecto o tu contenido aparece bien representado, ganas. Si aparece mal representado, o directamente no aparece, pierdes visibilidad en silencio.

## Una última reflexión

Cuando se publicó el primer `robots.txt` en 1994, nadie pensaba que tres décadas después seguiría siendo el estándar universal para comunicarse con los rastreadores. Nació como una convención voluntaria propuesta en una lista de correo. Su adopción fue gradual, luego exponencial, y finalmente universal.

`llms.txt` está exactamente en ese punto inicial. Puede cuajar y convertirse en la forma estándar en que las webs se presentan ante los modelos de lenguaje, o puede quedarse en una curiosidad interesante que acabe siendo reemplazada por otra cosa. Nadie lo sabe con certeza.

Pero la historia de la web está llena de pequeños archivos de texto plano que resultaron tener un impacto enorme: `robots.txt`, `sitemap.xml`, `humans.txt`, `security.txt`. Todos empezaron como propuestas modestas y acabaron formando parte del mobiliario básico de cualquier sitio bien construido. No sería raro que `llms.txt` siguiera el mismo camino.

Y si lo sigue, los sitios que lo adoptaron pronto tendrán algo que los demás tendrán que correr a copiar: una voz clara y curada para hablar con las inteligencias artificiales que cada vez más personas usan para conocer el mundo.
