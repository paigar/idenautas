---
title: "Indie web: recuperar la web que queríamos tener"
heroImage: idenautas-web/blog/154.png
alt: Una web artesanal flotando independiente en un paisaje digital, con grandes plataformas corporativas al fondo
date: 2026-03-19
description: "El movimiento indie web defiende algo sencillo: que tu sitio web te pertenezca a ti, no a una plataforma. Y resulta que Jamstack encaja perfectamente con esa filosofía."
tags: ["desarrollo-tecnico", "negocio-y-estrategia"]
---

Hubo un momento en que la web era de todos. Cualquiera podía tener su propio espacio, con su propio diseño, en su propio dominio. Luego llegaron las plataformas — Facebook, Twitter, Medium, Substack — y mucha gente delegó su presencia online a servicios que no controla, en dominios que no son suyos, bajo condiciones que pueden cambiar en cualquier momento.

El movimiento **indie web** nació como respuesta a eso. No es tecnología nueva ni una tendencia de diseño. Es una filosofía sobre quién debería controlar tu presencia en internet.

## La idea central: tu dominio, tu contenido, tus reglas

El principio básico del indie web es que publiques en tu propio sitio primero. Si quieres que ese contenido llegue a más gente, lo distribuyes desde ahí hacia otras plataformas — no al revés. En la comunidad indie web esto se llama **POSSE**: Publish on your Own Site, Syndicate Elsewhere.

La diferencia parece pequeña pero no lo es. Si publicas en LinkedIn, LinkedIn es dueño de esa URL. Si LinkedIn cierra, cambia el algoritmo o decide que tu contenido no encaja con sus políticas, pierdes la visibilidad que habías construido. Si publicas en tu propio dominio y lo distribuyes desde ahí, esa URL es tuya para siempre.

Lo mismo aplica a los blogs de Medium o las newsletters de Substack. Son servicios estupendos mientras duran y mientras su modelo de negocio se alinea con tus intereses. Pero no son tuyos.

## Por qué Jamstack encaja con esta filosofía

Una web Jamstack es, por construcción, una web indie. El contenido vive en archivos de texto en tu repositorio — no en la base de datos de un tercero. Puedes cambiar de proveedor de alojamiento sin perder nada. Puedes desplegar tu web en cualquier CDN del mundo. Si Netlify o Vercel desaparecen mañana, tus archivos siguen siendo tuyos y puedes publicarlos en otra parte en cuestión de minutos.

No hay lock-in técnico. No hay dependencia de un panel de administración propietario. No hay datos atrapados en un sistema que no puedes exportar completamente.

Esto es exactamente lo que el indie web lleva años pidiendo: que la web sea portable, duradera y controlada por quien la crea.

## Durabilidad como criterio de diseño

Otra idea central del indie web es que una web debería durar. No rediseñarse cada dos años porque la tecnología quedó obsoleta, no romperse porque un plugin dejó de actualizarse, no desaparecer porque el servicio de hosting cerró o subió los precios.

Hay webs hechas en HTML puro en los años noventa que siguen funcionando perfectamente. Hay blogs en WordPress de hace diez años que son una pesadilla de mantenimiento. La diferencia no es la antigüedad — es la arquitectura.

Un sitio generado con [Eleventy]({% blogUrl "astro-vs-eleventy" %}), desplegado en una CDN, con el contenido en Markdown plano en un repositorio Git, tiene todas las características de una web que dura. Sin dependencias frágiles, sin actualizaciones que rompen cosas, sin bases de datos que corromper.

## No es nostalgia, es estrategia

Es fácil malinterpretar el indie web como nostalgia por una web más simple. No es eso. Es el reconocimiento de que delegar tu presencia online a plataformas ajenas tiene un coste real — en autonomía, en durabilidad y en propiedad de tus propios datos.

Para un negocio, esto se traduce en algo muy concreto: una web que funciona hoy, dentro de cinco años y dentro de diez, sin que nadie tenga que estar encima de ella para que no se caiga. Y la infraestructura que lo hace posible —CDN global, deployments automáticos, repositorio Git— es exactamente lo que describe nuestro artículo sobre [despliegue web moderno]({% blogUrl "despliegue-web-moderno" %}).

---

Eso es lo que intentamos construir en cada proyecto. Webs que no dependen de nadie más que de quien las encargó.
