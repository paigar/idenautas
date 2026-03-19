---
title: "Astro vs Eleventy: dos generadores estáticos, dos filosofías"
heroImage: idenautas-web/blog/152.png
alt: Dos cohetes minimalistas despegando lado a lado desde una plataforma de lanzamiento
date: 2025-12-18
description: "Astro y Eleventy son los dos generadores de sitios estáticos más interesantes del momento. Se parecen en lo importante y se diferencian en lo que define qué tipo de proyecto encaja mejor con cada uno."
tags: ["desarrollo-tecnico"]
---

Cuando la gente habla de sitios estáticos rápidos, suelen aparecer dos nombres: Eleventy y Astro. Los dos generan HTML. Los dos funcionan sin base de datos ni servidor dinámico. Los dos son proyectos activos con comunidades reales. Y los dos están escritos sobre Node.js. Hasta ahí las similitudes. Desde ahí, las diferencias son las que importan.

No hay una respuesta universal sobre cuál es mejor. Sí hay una respuesta concreta para cada proyecto. Y eso es lo que vale la pena entender.

## Eleventy: menos es más, en serio

Eleventy tiene una filosofía que se puede resumir en una frase: hace una cosa bien. Toma tu contenido, lo pasa por una plantilla y genera HTML. Eso es todo.

No hay framework de componentes. No hay JavaScript que se envía al navegador por defecto. No hay convenciones rígidas sobre cómo estructurar tu proyecto. Puedes escribir tus plantillas en Nunjucks, Liquid, Markdown, HTML puro, o en varios de ellos a la vez dentro del mismo proyecto. Eleventy no opina demasiado sobre cómo haces las cosas, lo que lo convierte en una herramienta enormemente flexible.

Esa flexibilidad tiene un coste: la curva de entrada requiere que entiendas lo que estás haciendo. Eleventy no te lleva de la mano. Pero una vez que entiendes su modelo mental, que es sencillo, puedes construir exactamente lo que necesitas sin arrastrar nada que no hayas pedido.

El resultado es código de salida limpio, ligero y predecible. Una web construida con Eleventy que no añade JavaScript innecesario parte con ventaja natural en cualquier auditoría de rendimiento. Menos peso, menos procesamiento, menos cosas que pueden fallar.

Para sitios orientados al contenido, como webs corporativas, blogs, portfolios o páginas de servicios, ese modelo es ideal. El contenido vive en archivos Markdown o en datos estructurados, las plantillas lo transforman en páginas, y el resultado es un conjunto de archivos estáticos que cualquier servidor puede servir sin esfuerzo.

## Astro: componentes, islas y una propuesta diferente

Astro parte de un enfoque distinto. Su unidad de trabajo es el componente, y su sintaxis recuerda a React o Vue: archivos `.astro` con una sección de lógica en JavaScript y una sección de plantilla que mezcla HTML y expresiones. Si vienes de trabajar con frameworks modernos de frontend, te resultará familiar desde el primer día.

Lo más interesante de Astro es su arquitectura de islas. Por defecto, también genera HTML estático sin JavaScript. Pero cuando necesitas que una parte de la página sea interactiva, puedes indicar explícitamente qué componentes deben hidratarse en el cliente, y cuándo: al cargar la página, cuando el componente entra en el viewport, cuando el usuario interactúa. Eso te da un control muy fino sobre qué JavaScript llega al navegador y en qué momento.

Esto lo convierte en una opción muy atractiva para proyectos que mezclan páginas de contenido estático con zonas interactivas: un e-commerce con filtros dinámicos, una web de producto con demos en vivo, un portal con componentes que consumen APIs. En esos casos, Astro ofrece una solución más elegante que añadir JavaScript a mano encima de un generador estático.

Además, Astro tiene un ecosistema de integraciones bien construido. Conectar Tailwind, un [sistema de CMS headless]({% blogUrl "que-es-un-cms-headless" %}), un componente de React o una librería de UI es más directo que en Eleventy, que requiere configuración manual para muchas de esas cosas.

## Cuándo elegir uno u otro

Si el proyecto es fundamentalmente un sitio de contenido, Eleventy es la opción más limpia. Blogs, webs de empresa, portfolios, páginas de aterrizaje, documentación. Cualquier cosa donde el HTML estático es suficiente y el peso del output importa. El modelo mental es simple, el resultado es predecible y no hay magia que pueda sorprenderte más adelante.

Si el proyecto combina contenido estático con componentes interactivos, o si el equipo viene de trabajar con React o Vue y quiere aprovechar ese conocimiento sin renunciar a las ventajas de lo estático, Astro tiene mucho sentido. También es la opción más cómoda cuando el diseño se basa en un sistema de componentes reutilizables con estado.

En Idenautas usamos Eleventy por defecto para los proyectos de webs corporativas y blogs, porque encaja bien con lo que hacemos: sitios orientados al contenido, con buen rendimiento, bajo mantenimiento y sin dependencias innecesarias. Conocemos bien sus límites y sabemos cuándo esos límites no son un problema sino una ventaja.

Pero no descartamos Astro. Cuando un proyecto necesita interactividad real en el cliente o cuando el equipo del cliente trabaja habitualmente con componentes, Astro es una elección honesta y no solo una concesión a la moda.

---

Al final, elegir entre Astro y Eleventy no es una decisión técnica en el sentido estricto. Es una decisión sobre qué tipo de sitio estás construyendo y qué modelo de trabajo encaja mejor con tu equipo. Los dos son buenos. Los dos producen sitios rápidos. La diferencia está en para qué proyecto es cada uno la herramienta más adecuada. Una vez elegido el generador, la siguiente pieza es el [proceso de despliegue]({% blogUrl "despliegue-web-moderno" %}) — cómo pasar de un commit a producción de forma automática y reversible.
