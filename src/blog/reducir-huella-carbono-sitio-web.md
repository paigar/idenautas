---
title: Cómo reducir la huella de carbono de tu sitio web
alt: Fábrica liberando grandes cantidades ed humo a través de sus chimeneas
date: 2023-03-21
heroImage: idenautas-web/blog/078.png
description: A medida que aumenta la cantidad de sitios web, también aumenta su impacto en el medio ambiente.
tags: ["sostenibilidad-y-etica"]
---

Internet parece limpio. No hay humo visible, no hay fábricas en el horizonte. Pero detrás de cada clic, cada vídeo en streaming y cada petición a un servidor hay una infraestructura física que consume enormes cantidades de energía. Los centros de datos que alojan la web mundial representan aproximadamente el 2% del consumo eléctrico global, una cifra comparable a la de toda la industria de la aviación.

Los desarrolladores y diseñadores web tenemos más influencia sobre esto de lo que solemos reconocer. Las decisiones que tomamos al construir un sitio determinan cuánta energía consume cada visita.

## Qué determina la huella de carbono de una web

La huella de un sitio web depende de cuántos datos se transfieren en cada carga, cuánto tiempo de procesamiento requiere cada petición y cuánta energía consume el servidor que lo aloja.

Un sitio lleno de imágenes sin optimizar, vídeos que se cargan automáticamente, scripts de terceros innecesarios y una arquitectura que obliga al servidor a calcular cada página desde cero en cada visita consume órdenes de magnitud más recursos que uno bien construido. Y esa diferencia se multiplica por cada visita, cada día, durante toda la vida del sitio.

## Sitios estáticos: la opción más eficiente

La diferencia entre un sitio estático y uno dinámico es relevante aquí. Un sitio dinámico (como WordPress sin caché) ejecuta código y consulta la base de datos en cada petición. Un sitio estático sirve archivos HTML pregenerados directamente. El procesamiento necesario es radicalmente menor.

Para muchos tipos de sitios —corporativos, portfolios, blogs, landing pages— un generador de sitios estáticos como Astro, Eleventy o Hugo es más que suficiente y produce webs considerablemente más eficientes que las alternativas dinámicas. No es renunciar a funcionalidades: es elegir la herramienta adecuada para cada caso.

## Optimizaciones concretas que marcan la diferencia

Las imágenes son responsables de una parte desproporcionada del peso de las páginas. Optimizarlas —formatos modernos como WebP o AVIF, dimensiones adecuadas, lazy loading para las que están fuera de la pantalla visible— puede reducir el peso de una página a una fracción de lo que pesaba.

El código también importa. Minificar CSS y JavaScript, eliminar librerías que no se usan, evitar plugins redundantes... cada kilobyte que se ahorra es energía que no se consume en millones de peticiones.

La caché del navegador es otra herramienta poderosa. Cuando un archivo ya descargado en una visita anterior no necesita descargarse de nuevo, el servidor no tiene que servir esos datos. Para sitios con contenido que no cambia frecuentemente, una política de caché bien configurada tiene un impacto real.

## El hosting importa más de lo que parece

No todo el electricity que alimenta los servidores viene de las mismas fuentes. Hay proveedores de hosting que funcionan con energía 100% renovable o que compensan sus emisiones con inversiones en proyectos de energía limpia. Elegir uno de ellos es probablemente el cambio individual de mayor impacto que puede tomar cualquier propietario de un sitio web.

The Green Web Foundation mantiene una base de datos de proveedores verificados que operan con energía renovable. Es un buen punto de partida para quien quiera revisar su situación actual.

## Herramientas para medir dónde estás

Antes de optimizar, tiene sentido saber en qué punto está el sitio. [Website Carbon Calculator](https://www.websitecarbon.com/) estima las emisiones de CO2 por visita de cualquier URL. Ecograder evalúa varios factores de sostenibilidad y da una puntuación general. Son herramientas aproximadas, pero útiles para identificar qué áreas tienen más margen de mejora.

La buena noticia: la mayoría de optimizaciones que reducen la huella de carbono también mejoran la velocidad de carga y la experiencia de usuario. No hay que elegir entre hacer el bien y hacer el trabajo bien.

---

La web seguirá creciendo. La pregunta es si va a hacerlo de forma más eficiente o siguiendo los mismos patrones de los últimos años. Desde el desarrollo, las decisiones de cada proyecto suman. Una web bien optimizada es mejor para el usuario, mejor para el posicionamiento, y también mejor para el planeta.
