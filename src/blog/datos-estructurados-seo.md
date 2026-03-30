---
title: "Datos estructurados y SEO: cómo hablarle a Google en su idioma"
alt: Una página web con fragmentos de código JSON-LD flotando como etiquetas visibles que un robot de búsqueda lee con atención
date: 2026-03-30
heroImage: idenautas-web/blog/155.png
description: Google no lee tu web como lo haría una persona. Necesita pistas claras para entender qué es cada cosa. Los datos estructurados son esas pistas, y pueden marcar la diferencia entre aparecer como un resultado más o destacar con información enriquecida.
tags: ["contenido-y-marketing", "desarrollo-tecnico"]
---

Cuando buscas una receta en Google y ves las estrellas de valoración, el tiempo de preparación y una foto directamente en los resultados, eso no es magia. Es el resultado de que alguien ha añadido datos estructurados a su web. Lo mismo ocurre cuando buscas un negocio y aparecen sus horarios, su dirección y las opiniones de clientes sin necesidad de entrar en la página.

Google es muy bueno leyendo texto, pero no tan bueno interpretando contexto. Sabe que tu página contiene la palabra "Bilbao", pero no sabe si Bilbao es tu ubicación, el nombre de tu empresa o el título de un artículo. Los datos estructurados son la forma de decírselo explícitamente. Y cuando Google entiende bien tu contenido, puede mostrarlo de formas mucho más atractivas en los resultados de búsqueda.

## Qué son los datos estructurados (sin complicaciones)

Los datos estructurados son fragmentos de código que añades a tu web para etiquetar la información de forma que los buscadores la entiendan sin ambigüedad. En lugar de esperar que Google interprete que "Café Amalur, Gran Vía 15, Bilbao, 9:00-21:00" es un negocio con dirección y horario, se lo dices directamente usando un formato estandarizado.

El estándar que usan los buscadores se llama Schema.org. Es un vocabulario común creado por Google, Microsoft, Yahoo y Yandex que define cientos de tipos de entidades: negocios locales, artículos, productos, eventos, personas, recetas, preguntas frecuentes y muchos más.

El formato más habitual para implementarlo es JSON-LD, que son bloques de código que se insertan en el HTML de la página. Lo bueno de JSON-LD es que va separado del contenido visible: no cambia nada de lo que el usuario ve, solo añade información para las máquinas.

Un ejemplo sencillo. Si tu web tiene una página de contacto con la dirección de tu negocio, el JSON-LD correspondiente sería algo así:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Café Amalur",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Gran Vía 15",
    "addressLocality": "Bilbao",
    "postalCode": "48001",
    "addressCountry": "ES"
  },
  "telephone": "+34 944 000 000",
  "openingHours": "Mo-Su 09:00-21:00"
}
```

Eso es todo. Un bloque de texto que le dice a Google: "esto es un negocio local, se llama así, está aquí y abre en estos horarios". Sin ambigüedad.

## Por qué debería importarte

La razón principal es práctica: los datos estructurados pueden hacer que tu web aparezca en los resultados de búsqueda con lo que Google llama "resultados enriquecidos" o "rich results". En lugar de mostrar solo el típico enlace azul con un título y una descripción, Google puede mostrar información adicional que llama mucho más la atención.

Algunos ejemplos de resultados enriquecidos que se consiguen con datos estructurados:

- **Estrellas de valoración** junto a tu resultado, si tienes reseñas.
- **Preguntas frecuentes desplegables** directamente en la página de resultados.
- **Información de producto** con precio, disponibilidad y valoraciones.
- **Eventos** con fecha, lugar y precio de entrada.
- **Recetas** con foto, tiempo de preparación e ingredientes.
- **Breadcrumbs** (migas de pan) que muestran la jerarquía de navegación de tu web.
- **Logotipo y datos de empresa** en el panel de conocimiento lateral.

Estos resultados enriquecidos no solo son más visibles, sino que suelen tener tasas de clic significativamente más altas que los resultados normales. Ocupan más espacio visual, ofrecen información útil antes de hacer clic y transmiten una imagen de profesionalidad.

Y aquí viene un matiz importante: añadir datos estructurados no garantiza que Google los muestre. Google decide cuándo y cómo usar esa información. Pero si no los añades, la garantía es que nunca aparecerán.

## Qué tipos de datos estructurados son más útiles

No necesitas implementar todos los tipos de Schema.org (hay cientos). Para la mayoría de webs de pequeñas y medianas empresas, unos pocos tipos cubren casi todas las necesidades:

### Organization o LocalBusiness

Es el más básico y el primero que deberías añadir. Define quién eres: nombre de la empresa, logotipo, dirección, teléfono, redes sociales y horario de apertura. Si tienes un negocio con ubicación física, usa LocalBusiness. Si eres una empresa que opera principalmente online, usa Organization.

Este marcado ayuda a Google a construir el panel de conocimiento que aparece a la derecha cuando alguien busca tu marca directamente. También refuerza tu presencia en búsquedas locales, complementando lo que ya tengas en [Google Business Profile]({% blogUrl "seo-local-para-pequenas-empresas" %}).

### Article o BlogPosting

Si tienes un blog (como este), cada artículo debería llevar su marcado correspondiente. Incluye el título, la fecha de publicación, el autor, una imagen destacada y una descripción. Esto ayuda a Google a entender la estructura de tu contenido editorial y puede mejorar cómo aparecen tus artículos en los resultados.

### BreadcrumbList

Las migas de pan son esa línea de navegación que muestra dónde estás dentro de la estructura del sitio: Inicio > Blog > Artículo. Cuando las marcas con datos estructurados, Google las muestra en los resultados de búsqueda en lugar de la URL completa, lo que da un aspecto más limpio y profesional.

### FAQPage

Si tienes una página de preguntas frecuentes o incluso una sección de preguntas dentro de un artículo, este marcado hace que las preguntas y respuestas aparezcan directamente en los resultados de búsqueda como acordeones desplegables. Es uno de los tipos más visibles y efectivos.

### WebSite con SearchAction

Este marcado le dice a Google que tu web tiene un buscador interno y cómo funciona. Puede hacer que aparezca un campo de búsqueda directamente en los resultados de Google asociado a tu sitio, lo que es especialmente útil si tienes mucho contenido.

## Cómo implementarlos en un sitio estático

Si tu web está construida con un generador estático como [Eleventy]({% blogUrl "que-es-eleventy" %}), la implementación de datos estructurados es especialmente limpia. Como todo el HTML se genera en el momento de la compilación, puedes crear plantillas que generen el JSON-LD automáticamente a partir de los datos que ya tienes.

La idea es sencilla: en la plantilla de tu layout, añades un bloque `<script type="application/ld+json">` que se rellena con los datos de cada página. Si tu artículo ya tiene un título, una fecha y una descripción en el frontmatter (los metadatos que van al principio de cada archivo Markdown), reutilizas esos mismos datos para generar el marcado estructurado. Sin duplicar trabajo.

Para un sitio estático, esto tiene ventajas adicionales:

- **No hay dependencia de plugins.** En WordPress necesitas un plugin que genere los datos estructurados y que se mantenga actualizado. En un sitio estático, el JSON-LD forma parte de tu plantilla y tú controlas exactamente lo que genera.
- **Rendimiento cero.** El JSON-LD se genera una vez durante el build, no en cada visita. No añade tiempo de procesamiento en el servidor ni carga adicional para el usuario.
- **Control total.** Puedes ajustar cada campo, cada tipo y cada relación exactamente como necesitas, sin las limitaciones de una interfaz de plugin.

## Errores comunes que conviene evitar

Implementar datos estructurados no es difícil, pero hay errores que se repiten con frecuencia y que pueden hacer que Google ignore tu marcado o incluso te penalice:

**Marcar contenido que no existe en la página.** Los datos estructurados deben reflejar lo que el usuario ve. Si marcas una valoración de 4.8 estrellas pero en la página no hay ninguna reseña visible, estás engañando a Google. Y Google detecta estas inconsistencias.

**Usar tipos incorrectos.** Un error habitual es marcar un artículo de blog como NewsArticle cuando no es una publicación de noticias, o marcar un servicio como Product. Cada tipo tiene su significado y Google espera coherencia.

**Olvidar los campos obligatorios.** Cada tipo de Schema.org tiene campos que son opcionales y campos que son necesarios para que Google considere el marcado válido. Un Article sin fecha de publicación o un Product sin nombre no pasarán la validación.

**Duplicar marcados.** Si tienes el mismo tipo de dato estructurado varias veces en la misma página con información contradictoria, Google no sabrá cuál es el correcto y probablemente ignorará ambos.

**No actualizar los datos.** Si tu horario cambia, si te mudas, si cambias de teléfono, los datos estructurados deben reflejar la información actual. Un marcado desactualizado es peor que no tener marcado, porque transmite información falsa.

## Cómo validar que todo está bien

Google ofrece dos herramientas gratuitas para comprobar tus datos estructurados:

**Rich Results Test** (search.google.com/test/rich-results) te permite introducir una URL o pegar código HTML y te muestra qué resultados enriquecidos puede generar Google con los datos que encuentra. Te dice si hay errores, si faltan campos obligatorios y qué aspecto tendría el resultado.

**Schema Markup Validator** (validator.schema.org) es más técnico y valida la sintaxis de tu marcado contra la especificación de Schema.org. Útil para asegurarte de que no hay errores de formato.

Lo recomendable es pasar tus páginas por ambas herramientas después de implementar los datos estructurados y cada vez que hagas cambios significativos en la estructura de tu web.

También puedes revisar cómo Google está interpretando tus datos a través de Google Search Console, en el informe de "Mejoras". Ahí verás qué tipos de datos estructurados ha detectado Google en tu web, cuántas páginas los tienen y si hay errores o advertencias.

## Los datos estructurados no sustituyen al buen contenido

Un punto importante: los datos estructurados no son un truco de posicionamiento. No van a hacer que una página mediocre aparezca en primera posición. Lo que hacen es ayudar a Google a entender mejor un contenido que ya es bueno y a mostrarlo de forma más atractiva.

Si tu web [carga rápido]({% blogUrl "rendimiento-web-y-ventas" %}), tiene contenido útil y está bien estructurada, los datos estructurados son el complemento que le falta para comunicarse eficazmente con los buscadores. Son como poner etiquetas claras en los estantes de una tienda bien organizada: el producto ya es bueno, pero ahora el cliente lo encuentra más fácido.

Para un sitio web de empresa, el mínimo recomendable sería implementar Organization o LocalBusiness en todas las páginas, Article o BlogPosting en el blog, y BreadcrumbList para la navegación. Con eso cubres lo esencial. Después, según tu caso, puedes añadir FAQPage, Product, Event o cualquier otro tipo que se ajuste a tu contenido.

---

Los datos estructurados son una de esas mejoras técnicas que requieren poco esfuerzo, no afectan al rendimiento de la web y pueden tener un impacto visible en cómo apareces en Google. No son obligatorios, no son urgentes y no van a transformar tu negocio de la noche a la mañana. Pero son la forma de asegurarte de que cuando Google lee tu web, entiende exactamente lo que le estás diciendo. Y en un mundo donde millones de páginas compiten por la atención, que Google te entienda bien no es un detalle menor.
