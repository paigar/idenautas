---
title: "Core Web Vitals en 2026: qué ha cambiado y cómo adaptarse"
alt: Un panel de métricas web mostrando gráficas de rendimiento y velocidad de carga de un sitio
date: 2026-03-18
heroImage: idenautas-web/blog/133.png
description: Google lleva años usando las Core Web Vitals para medir la experiencia de usuario. En 2026 las métricas han cambiado, los umbrales se han ajustado y lo que antes bastaba ya no es suficiente. Guía práctica para entender qué medir y cómo mejorar.
tags: ["desarrollo-tecnico", "experiencia-de-usuario"]
---

Desde que Google introdujo las Core Web Vitals en 2020, la forma de medir la experiencia de usuario en la web ha cambiado radicalmente. Lo que empezó como un conjunto de tres métricas técnicas se ha convertido en uno de los factores que Google tiene en cuenta para decidir qué páginas aparecen primero en los resultados de búsqueda. Y en 2026, el paisaje es diferente al de hace unos años.

Si tienes una web y te preocupa su rendimiento, su posicionamiento o simplemente que tus visitantes tengan una buena experiencia, necesitas entender qué son estas métricas, qué ha cambiado y qué puedes hacer para mejorarlas sin necesidad de ser un experto en desarrollo web.

## Qué son las Core Web Vitals y por qué importan

Las Core Web Vitals son un conjunto de métricas que Google usa para evaluar la experiencia real de los usuarios cuando visitan una página web. No miden lo que pasa en un laboratorio, sino lo que pasa en los navegadores de personas reales, con conexiones reales y dispositivos reales.

Google las agrupa dentro de lo que llama "señales de experiencia de página", junto con otros factores como el uso de HTTPS, la adaptación a móviles y la ausencia de intersticiales molestos. Pero las Core Web Vitals son las que más peso tienen y las que más han evolucionado.

La idea de fondo es sencilla: una web que carga rápido, que responde inmediatamente cuando haces clic y que no se mueve mientras la estás usando es una web que ofrece buena experiencia. Y Google quiere premiar eso.

## Las métricas actuales: LCP, INP y CLS

En 2026, las tres métricas que componen las Core Web Vitals son:

### LCP: Largest Contentful Paint

Mide cuánto tarda en aparecer el elemento más grande visible en la pantalla. Normalmente es una imagen principal, un vídeo o un bloque de texto grande. Es la métrica que mejor refleja la percepción de velocidad de carga, porque hasta que ese elemento no aparece, el usuario siente que la página no ha cargado.

- **Bueno:** menos de 2,5 segundos
- **Necesita mejora:** entre 2,5 y 4 segundos
- **Malo:** más de 4 segundos

El LCP lleva con nosotros desde el principio y sigue siendo la métrica de carga de referencia. Lo que ha cambiado es que Google es cada vez más estricto en cómo la mide y más preciso en identificar qué elemento cuenta como el más grande.

### INP: Interaction to Next Paint

Esta es la métrica que más ha cambiado en los últimos años. INP sustituyó a FID (First Input Delay) en marzo de 2024, y con razón. FID solo medía el retraso de la primera interacción del usuario con la página. INP mide la respuesta de todas las interacciones durante toda la visita y reporta el peor caso representativo.

En la práctica, esto significa que ya no basta con que la página responda bien al primer clic. Tiene que responder bien siempre: al hacer scroll, al abrir menús, al enviar formularios, al cambiar de pestaña. Si tu página se bloquea durante medio segundo cuando alguien pulsa un botón, INP lo detecta.

- **Bueno:** menos de 200 milisegundos
- **Necesita mejora:** entre 200 y 500 milisegundos
- **Malo:** más de 500 milisegundos

INP es probablemente la métrica más difícil de optimizar, porque depende en gran medida del JavaScript que se ejecuta en la página. Cada script, cada librería, cada widget de terceros que añades es un potencial problema de INP.

### CLS: Cumulative Layout Shift

Mide la estabilidad visual de la página. Cada vez que un elemento se mueve de forma inesperada mientras la página carga, eso cuenta como un cambio de diseño. CLS suma todos esos movimientos y da una puntuación.

El ejemplo clásico: estás leyendo un artículo, vas a hacer clic en un enlace y justo en ese momento carga un anuncio encima que desplaza todo el contenido hacia abajo. Acabas haciendo clic en algo que no querías. Eso es un cambio de diseño, y es una de las experiencias más frustrantes en la web.

- **Bueno:** menos de 0,1
- **Necesita mejora:** entre 0,1 y 0,25
- **Malo:** más de 0,25

Lo que ha cambiado en CLS es la forma de calcularlo. Ahora Google usa una ventana de sesión que agrupa los cambios de diseño que ocurren en ráfagas, en lugar de sumar todos los cambios durante toda la vida de la página. Esto es más justo para las páginas de contenido largo donde el usuario pasa mucho tiempo, pero también significa que los cambios de diseño que ocurren juntos se penalizan más.

## Qué ha cambiado realmente respecto a años anteriores

Si ya optimizaste tu web para las Core Web Vitals hace unos años, hay varias cosas que conviene revisar:

**El cambio de FID a INP lo cambia todo para webs interactivas.** Si tu web tiene formularios, menús desplegables, filtros, carruseles o cualquier elemento interactivo, es posible que pasaras FID sin problemas pero que INP te esté penalizando. FID era demasiado permisivo: solo medía la primera interacción. INP mide todas.

**Google ha refinado cómo calcula el LCP.** Ahora detecta mejor las imágenes que se cargan de forma progresiva o con placeholders de baja calidad. Si usas lazy loading para tu imagen principal, es posible que Google esté midiendo un LCP peor de lo que crees, porque no cuenta el placeholder como contenido significativo.

**Los umbrales no han cambiado mucho, pero el contexto sí.** Los números siguen siendo los mismos, pero el hardware y las conexiones han mejorado. Esto significa que Google tiene datos de más usuarios con buenos dispositivos, y si tu web sigue sin cumplir los umbrales, el contraste con el resto es mayor.

**El impacto en el posicionamiento es más claro.** En los primeros años, Google insistía en que las Core Web Vitals eran solo uno de muchos factores. Eso sigue siendo cierto, pero el peso relativo ha aumentado. En nichos competitivos donde el contenido es similar, la experiencia de usuario puede ser el factor que decide quién aparece primero.

## Cómo medir tus Core Web Vitals

Antes de optimizar, necesitas saber dónde estás. Hay dos formas de medir:

**Datos de campo (real user metrics).** Son los que realmente importan para Google, porque reflejan la experiencia de usuarios reales. Puedes verlos en:

- **Google Search Console.** Tiene un informe específico de Core Web Vitals que te muestra qué URLs tienen problemas y de qué tipo. Es el punto de partida más práctico.
- **PageSpeed Insights.** Introduce tu URL y te muestra tanto los datos de campo (si los hay) como los datos de laboratorio. Los datos de campo aparecen en la sección "Descubre qué experimentan tus usuarios reales".
- **Chrome UX Report (CrUX).** Es la fuente de datos que alimenta a las herramientas anteriores. Si necesitas datos más detallados o quieres hacer un seguimiento histórico, puedes consultarlo directamente.

**Datos de laboratorio.** Son mediciones simuladas que puedes hacer en cualquier momento. No cuentan para el posicionamiento, pero son útiles para diagnosticar problemas:

- **Lighthouse** (integrado en Chrome DevTools). Te da puntuaciones y recomendaciones específicas.
- **WebPageTest.** Permite hacer pruebas desde diferentes ubicaciones y conexiones, lo que es útil para entender cómo experimentan tu web usuarios de distintos perfiles.

La diferencia entre datos de campo y datos de laboratorio puede ser significativa. Una página puede obtener puntuación perfecta en Lighthouse y tener problemas en el mundo real porque los usuarios acceden desde dispositivos más lentos o con peores conexiones. Siempre prioriza los datos de campo.

## Cómo mejorar el LCP

El LCP depende fundamentalmente de lo rápido que llegue el contenido principal al navegador. Los problemas más comunes y sus soluciones:

**Imágenes hero demasiado pesadas.** La imagen principal de una página suele ser el elemento LCP. Si pesa demasiado, tarda en cargar. Usa formatos modernos como WebP o AVIF, que ofrecen mejor compresión que JPEG sin pérdida visible de calidad. Ajusta el tamaño al que realmente se muestra: no envíes una imagen de 4000 píxeles para un espacio de 800.

**Servidor lento.** Si tu servidor tarda en responder, todo lo demás se retrasa. El TTFB (Time to First Byte) es el tiempo que pasa desde que el navegador pide la página hasta que recibe el primer byte de respuesta. Si es alto, ni la mejor optimización de imágenes compensará. Considera usar un CDN, mejorar tu hosting o, mejor aún, servir páginas estáticas que no necesitan procesamiento en el servidor.

**CSS y JavaScript que bloquean la carga.** Cuando el navegador encuentra un archivo CSS o JavaScript en el código de tu página, deja de renderizar hasta que lo descarga y lo procesa. Si tienes archivos pesados o muchos archivos externos, el contenido principal tarda más en aparecer. Carga el CSS crítico en línea y difiere todo lo que no sea imprescindible para la primera vista.

**Tipografías web que tardan en cargar.** Si tu texto principal usa una fuente que se descarga de un servidor externo, el navegador puede mostrar texto invisible o texto en una fuente de sistema hasta que la fuente carga. Usa `font-display: swap` para que el texto sea visible inmediatamente y preconecta con los servidores de fuentes usando `<link rel="preconnect">`.

## Cómo mejorar el INP

INP es la métrica donde más webs tienen problemas, porque depende directamente de la cantidad y calidad del JavaScript que se ejecuta:

**Reduce el JavaScript de terceros.** Cada widget de chat, cada herramienta de analítica, cada script de redes sociales que añades compite por el tiempo de procesamiento del navegador. Cada uno de ellos puede retrasar la respuesta a las interacciones del usuario. Audita todo lo que tienes instalado y elimina lo que no sea estrictamente necesario.

**Divide las tareas largas.** Cuando un script necesita hacer mucho trabajo, el navegador no puede responder a clics o toques hasta que termina. La solución es dividir las tareas largas en trozos más pequeños que permitan al navegador atender las interacciones entre medias. Esto es especialmente importante en menús, filtros y formularios.

**Evita el JavaScript que no se usa.** Es habitual incluir librerías completas para usar una pequeña parte de su funcionalidad. Si solo necesitas una función de una librería de 200 KB, busca una alternativa más ligera o implementa solo lo que necesitas.

**Cuidado con los frameworks pesados.** Los frameworks de JavaScript modernos son potentes, pero también generan mucho código que el navegador necesita procesar. Si tu web es fundamentalmente informativa, un sitio estático puede ser mucho más rápido que un sitio construido con un framework completo que apenas aprovecha.

## Cómo mejorar el CLS

Los cambios de diseño inesperados casi siempre se deben a elementos que se cargan sin tener su espacio reservado:

**Reserva espacio para las imágenes.** Siempre incluye los atributos `width` y `height` en tus imágenes, o usa CSS con `aspect-ratio` para que el navegador reserve el espacio antes de que la imagen cargue. Esto elimina el salto que se produce cuando la imagen aparece y empuja el resto del contenido hacia abajo.

**Reserva espacio para los anuncios.** Si tu web tiene publicidad, define el tamaño del contenedor antes de que el anuncio cargue. Los anuncios son una de las principales causas de CLS porque se cargan de forma asíncrona y a menudo tienen tamaños variables.

**Cuidado con las fuentes web.** Cuando una fuente web se carga y reemplaza a la fuente de sistema, puede provocar un cambio de diseño si las métricas de ambas fuentes son diferentes. Ajusta la fuente de respaldo con `size-adjust` en tu declaración `@font-face` para minimizar la diferencia.

**No insertes contenido dinámico por encima del viewport.** Si cargas banners, avisos de cookies o barras de notificación que empujan el contenido hacia abajo, eso genera CLS. Usa posiciones fijas o reserva el espacio desde el principio.

## Webs estáticas: la ventaja natural

Hay un tipo de web que parte con ventaja en todas las Core Web Vitals: las webs estáticas. Cuando una página no necesita que un servidor ejecute código para generarla, cuando el HTML ya está creado de antemano y se sirve directamente, los tiempos de respuesta son mínimos.

No hay consultas a bases de datos. No hay procesamiento en el servidor. No hay frameworks que necesiten arrancar en el navegador. El servidor envía un archivo HTML y el navegador lo muestra. Esa simplicidad se traduce directamente en mejor LCP, mejor INP y mejor CLS.

Esto no significa que una web estática sea siempre la mejor opción para todos. Pero sí que para la mayoría de webs corporativas, de profesionales, de pequeños negocios y de blogs, un sitio estático bien construido ofrece un rendimiento que es muy difícil de igualar con plataformas dinámicas sobrecargadas de plugins.

## No optimices a ciegas

Es fácil caer en la trampa de perseguir puntuaciones perfectas en Lighthouse sin entender qué significan realmente. Algunas cosas que conviene tener en cuenta:

**Los datos de campo son los que importan.** Puedes tener un 100 en Lighthouse y que tus usuarios reales tengan una experiencia mediocre. Lighthouse mide en condiciones controladas. La realidad es más variada.

**No todas las páginas pesan igual.** Google evalúa las Core Web Vitals a nivel de página, no de sitio completo. Céntrate primero en las páginas más importantes: la portada, las páginas de servicio y las que reciben más tráfico orgánico.

**El contexto importa.** Si todos tus competidores tienen un LCP de 4 segundos y tú lo tienes en 2,5, estás en buena posición aunque no llegues a la puntuación ideal. Las Core Web Vitals son un factor entre muchos. Un buen contenido sigue siendo más importante que una décima de segundo menos de LCP.

**Optimizar no es solo técnica, es también decisión editorial.** A veces la mejor forma de mejorar el rendimiento es quitar cosas. Ese carrusel de imágenes que nadie usa, ese widget de chat que solo genera spam, ese script de analítica que nadie consulta. Cada elemento que quitas es rendimiento que ganas.

## El rendimiento es una inversión, no un gasto

Optimizar las Core Web Vitals no es un ejercicio técnico que se hace una vez y se olvida. Es una forma de pensar sobre tu web. Cada decisión que tomas, desde el hosting que eliges hasta el último script que añades, afecta a la experiencia de tus visitantes.

Y esa experiencia tiene consecuencias directas: en el posicionamiento, en la tasa de conversión, en la percepción de tu marca y en la satisfacción de las personas que visitan tu web. Una web rápida y estable transmite profesionalidad. Una web lenta y que se mueve mientras la usas transmite descuido.

Las Core Web Vitals seguirán evolucionando. Google ajustará métricas, añadirá nuevas y cambiará umbrales. Pero el principio subyacente no cambiará: las webs que ofrecen buena experiencia a sus usuarios serán las que mejor posicionen. Y eso, al final, es simplemente construir buenas webs.
