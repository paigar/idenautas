---
title: "De WordPress a Eleventy: cómo es el proceso de migración"
heroImage: idenautas-web/blog/147.png
alt: Mariposa emergiendo de un capullo, simbolizando la transformación digital de una web
date: 2025-07-03
description: "Migrar de WordPress a Eleventy no es tan complicado como parece. Aquí explicamos cómo funciona el proceso, qué se gana, qué hay que planificar y qué esperar."
tags: ["desarrollo-tecnico"]
---

Hay un momento en la vida de muchas webs WordPress en que el mantenimiento empieza a pesar más que el valor que aporta. Actualizaciones de plugins que rompen cosas, avisos de seguridad, velocidad que no termina de ser la que debería, costes de alojamiento que suben. Y en algún punto alguien pregunta: ¿merece la pena seguir remendando esto o hay una forma mejor?

Si esa pregunta te suena, este artículo es una respuesta honesta a cómo funciona el proceso de migrar a un generador de sitios estáticos como Eleventy.

## Qué se migra y qué no

Lo primero que hay que entender es que una migración de este tipo no es simplemente mover archivos de un servidor a otro. Es un cambio de arquitectura. Eso implica repensar algunas cosas.

**El contenido sí se migra**, y generalmente bien. Posts, páginas, imágenes: todo eso existe en WordPress en formatos que se pueden exportar e importar. El contenido escrito en texto no se pierde.

**La estructura y el diseño se reconstruyen**. Las plantillas de WordPress no funcionan en Eleventy — son tecnologías distintas. Esto es en realidad una oportunidad: la mayoría de webs WordPress llevan años con un diseño que alguien eligió hace tiempo y que nunca se ha revisado en profundidad. La migración es el momento natural para hacerlo bien.

**Los plugins desaparecen**. Cada funcionalidad que venía de un plugin hay que evaluarla: ¿realmente se usa? ¿Es necesaria? ¿Hay una alternativa más limpia? La mayoría de las veces, el 80% de los plugins instalados resuelven problemas que no existen o que se pueden solucionar de forma más elegante.

## El proceso en la práctica

Una migración bien hecha tiene varias fases.

**Auditoría del contenido existente.** Antes de mover nada, hay que entender qué hay: cuántas páginas, qué contenido es relevante y qué lleva años sin actualizarse y puede eliminarse. Es el momento del KonMari digital — conservar lo que tiene función real, dejar ir el resto.

**Diseño y desarrollo de la nueva web.** En paralelo al análisis del contenido, se diseña y construye la nueva web desde cero. Esto incluye definir la estructura de navegación, el diseño visual, las plantillas y la lógica de contenido.

**Migración del contenido.** Con la estructura lista, se importa el contenido existente y se adapta al nuevo formato. Los posts del blog se convierten a Markdown, las páginas se revisan y actualizan.

**Redirecciones y SEO.** Si las URLs cambian — y en una migración de este tipo suelen cambiar — hay que configurar redirecciones para que el posicionamiento acumulado no se pierda. Este paso es crítico y no puede saltarse.

**Pruebas y lanzamiento.** Revisión completa antes de apagar la web antigua, período de transición y lanzamiento.

## Qué se gana

Los resultados son consistentes en todos los proyectos que hemos migrado. La velocidad mejora de forma inmediata y significativa — no es raro pasar de tiempos de carga de 3-5 segundos a menos de un segundo. La puntuación en Core Web Vitals sube. Y el mantenimiento se simplifica: sin plugins que actualizar, sin base de datos que vigilar, sin vectores de ataque habituales.

El coste de alojamiento baja. En algunos casos de forma muy notable — de pagar por un servidor dedicado a prácticamente nada con una CDN.

Y hay un efecto secundario que los clientes suelen valorar mucho: la web deja de ser algo que "hay que mantener" constantemente y se convierte en algo que simplemente funciona.

## Cuándo tiene sentido hacerlo

No toda web WordPress merece una migración. Si tienes una tienda online con miles de productos que cambian con frecuencia, si tienes un equipo de contenidos que publica varias veces al día, si dependes de funcionalidades muy específicas de plugins de WooCommerce — probablemente no sea la decisión correcta.

Pero si tienes una web corporativa, un portfolio, un sitio de servicios profesionales o un blog, y esa web está en WordPress porque "así se hacían las webs" — merece la pena evaluar si tiene más sentido seguir manteniendo lo que hay o construir algo que dure más tiempo con menos esfuerzo.

---

Si tienes curiosidad por saber cómo aplicaría este proceso a tu web concreta, cuéntanoslo. Sin compromiso — a veces la respuesta es que merece la pena quedarse con WordPress, y también eso lo decimos sin problema.
