---
title: "Qué es Eleventy y por qué lo usamos en Idenautas"
heroImage: idenautas-web/blog/144.png
alt: Editor de código mostrando la generación de archivos estáticos en un terminal moderno
date: 2025-03-06
description: "Eleventy es el generador de sitios estáticos con el que construimos todas nuestras webs. Aquí explicamos qué es, cómo funciona y por qué lo elegimos frente a otras opciones."
tags: ["desarrollo-tecnico"]
---

Si en alguna conversación con nosotros has escuchado la palabra "Eleventy" y no has preguntado qué es para no interrumpir, este artículo es para ti. Y si ya la conoces pero quieres entender por qué la usamos específicamente nosotros, también.

Eleventy — escrito oficialmente como 11ty — es un generador de sitios estáticos. Eso significa que en lugar de construir una web que genera las páginas en el momento en que alguien las visita, las genera todas de una vez durante el proceso de publicación. El resultado es un conjunto de archivos HTML, CSS y JavaScript listos para servir directamente, sin ningún procesamiento en el servidor.

## La diferencia práctica con un CMS tradicional

Cuando visitas una web construida con WordPress, lo que ocurre entre el momento en que escribes la URL y el momento en que ves la página es esto: tu navegador envía una petición al servidor, el servidor ejecuta PHP, PHP consulta la base de datos MySQL, la base de datos devuelve los datos, PHP los combina con la plantilla y genera el HTML, y ese HTML llega finalmente a tu navegador.

Con una web generada con Eleventy, ese proceso ocurre una sola vez: cuando el desarrollador publica. A partir de ahí, cuando alguien visita la página, el servidor simplemente entrega un archivo que ya existe. No hay PHP, no hay base de datos, no hay esperas.

El impacto en velocidad es inmediato y medible. Pero hay más.

## Por qué nos gusta Eleventy en particular

Hay varios generadores de sitios estáticos — Hugo, Astro, Jekyll, Next.js en modo estático. Cada uno tiene su filosofía. Eleventy tiene la nuestra.

**Es extraordinariamente ligero.** Eleventy no impone ningún framework JavaScript al resultado final. La web que genera es HTML, CSS y el JS que tú decides incluir. Nada más. Eso significa webs que cargan en décimas de segundo y que no arrastran megabytes de librerías que el usuario nunca pidió.

**Es flexible sin ser complejo.** Permite usar distintos lenguajes de plantillas (Nunjucks, Liquid, Markdown, HTML puro...) y mezclarlos en el mismo proyecto. Eso nos da libertad para estructurar cada proyecto de la forma que tiene más sentido, no de la forma que el framework impone.

**El contenido vive en archivos de texto.** Los artículos, las páginas, los datos: todo en Markdown y YAML. Sin bases de datos propietarias, sin interfaces de terceros que pueden cambiar o desaparecer. El contenido es tuyo y está en tu sistema de archivos.

**No sobreingeniería.** Uno de los problemas habituales en el ecosistema JavaScript es la tendencia a usar herramientas enormes para resolver problemas pequeños. Eleventy hace exactamente lo que tiene que hacer, sin capas innecesarias.

## Lo que esto significa para un cliente

Una web construida con Eleventy no necesita mantenimiento de seguridad del tipo que requiere WordPress — no hay plugins que actualizar, no hay base de datos que parcheear, no hay vectores de ataque habituales. El alojamiento es más barato porque los archivos estáticos pueden servirse desde una CDN a una fracción del coste de un servidor con PHP. Y la velocidad es mejor desde el primer día.

No es la solución adecuada para todos los proyectos. Una tienda online con miles de referencias dinámicas, un portal con contenido personalizado por usuario, una aplicación web compleja — esos proyectos necesitan otra arquitectura. Pero para la inmensa mayoría de webs corporativas, portfolios, blogs y sitios de servicios, Eleventy hace el trabajo mejor que cualquier CMS.

---

Esta web que estás leyendo está construida con Eleventy. Los tiempos de carga, el comportamiento en móvil, la puntuación en Core Web Vitals — todo eso es, en gran parte, consecuencia de esa decisión.
