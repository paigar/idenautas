---
title: Desarrollo web con generadores de contenido estático
alt: Pantalla de ordenador mostrando un mundo lleno de ideas e imaginación
date: 2023-02-04
heroImage: idenautas-web/blog/025.png
description: Qué son los generadores de contenido estático, sus ventajas reales frente a WordPress, y por qué Eleventy es el SSG con el que trabajamos en Idenautas.
tags: ["desarrollo-tecnico"]
---

Durante años, la forma dominante de construir webs fue dinámica: el servidor recibe una petición, consulta una base de datos, genera el HTML al vuelo y lo envía al navegador. WordPress, Drupal, Joomla. Todo ese ecosistema se construyó sobre esa idea. Y funcionaba.

El problema es que hacer todo ese trabajo para servir una página que en realidad no cambia entre visita y visita es, cuanto menos, ineficiente. Para la mayoría de webs corporativas, blogs y portfolios, el contenido es estático: cambia cuando alguien lo actualiza, no en función de quién lo visita. Y hay una forma mucho más elegante de resolver eso.

## Qué es un generador de contenido estático

Un generador de contenido estático toma el contenido —normalmente archivos de texto en formato Markdown o similar— y las plantillas de diseño, los combina y produce archivos HTML listos para servir directamente. Sin base de datos, sin procesamiento en el servidor, sin dependencias frágiles. El resultado es un conjunto de archivos estáticos que cualquier servidor web puede entregar de forma instantánea.

Las ventajas son directas y medibles. Las páginas cargan más rápido porque no hay procesamiento en el servidor: el archivo ya está generado, el servidor solo lo envía. La seguridad mejora radicalmente porque no hay superficie de ataque: sin base de datos no hay inyecciones SQL, sin código ejecutándose en el servidor no hay vulnerabilidades de ese tipo. El coste de alojamiento se reduce porque los archivos estáticos pueden servirse desde una CDN a una fracción del coste de un servidor con PHP y MySQL.

## Por qué Eleventy es nuestro generador favorito

Hay una buena cantidad de generadores estáticos disponibles: Jekyll, Hugo, Gatsby, Astro, y muchos más. Cada uno con su filosofía y su comunidad.

Nosotros nos hemos decantado por Eleventy —y de hecho este mismo blog está construido con él— por varias razones. Primero, es flexible sin ser complicado: acepta múltiples formatos de plantillas y de contenido, y no te obliga a seguir una estructura rígida. Segundo, no impone JavaScript en el cliente: genera HTML limpio, sin el peso de un framework de JavaScript que el navegador tiene que descargar e interpretar. Tercero, el rendimiento es excelente por defecto, sin necesitar configuración avanzada para conseguir puntuaciones buenas en Core Web Vitals.

Para proyectos donde el contenido es lo principal y la interactividad es limitada —que es el caso de la inmensa mayoría de webs corporativas y blogs— este enfoque ofrece un resultado difícil de igualar con plataformas dinámicas.

## No es para todo, pero sí para mucho más de lo que se cree

La pregunta lógica es: ¿y si necesito un formulario de contacto, un buscador o una tienda online? Los sitios estáticos no son incompatibles con esa funcionalidad: se puede integrar con servicios externos para el correo, con soluciones de búsqueda estática como Pagefind, o con plataformas de e-commerce específicas. Es un modelo híbrido que mantiene todas las ventajas del estático para el contenido principal y añade lo dinámico solo donde hace falta.

Para el cliente que viene a nosotros con una web corporativa en WordPress que carga lento, que hay que actualizar constantemente por motivos de seguridad y que ocupa cientos de megabytes en el servidor, la conversión a un generador estático suele ser una revelación. Misma apariencia, mismo contenido, pero más rápido, más seguro y mucho más fácil de mantener a largo plazo.

---

No toda web necesita un servidor que piensa. A veces lo mejor es un servidor que simplemente entrega. Y para eso, los generadores de contenido estático llevan años siendo la mejor respuesta disponible.
