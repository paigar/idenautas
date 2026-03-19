---
title: La importancia de racionalizar el uso de los servidores web
alt: Imagen de un centro de datos moderno
date: 2024-07-23
heroImage: idenautas-web/blog/117.png
description: Los servidores web consumen tanta energía como toda la aviación mundial. Cómo los sitios estáticos y el Jamstack ayudan a reducir ese impacto de forma real.
tags: ["sostenibilidad-y-etica"]
---

¿Alguna vez te has preguntado qué hay detrás de cada clic que haces en internet? Puede parecer magia, pero la realidad es que detrás de cada página web hay una compleja infraestructura de [servidores web](https://es.wikipedia.org/wiki/Servidor_web) y [centros de datos](https://es.wikipedia.org/wiki/Centro_de_procesamiento_de_datos) que consumen una enorme cantidad de energía. Una cantidad que, dicho de forma directa, ya no podemos ignorar.

## El impacto ambiental que no se ve

Los centros de datos y servidores web son responsables de alrededor del 2% del [consumo mundial de electricidad](https://www.nature.com/articles/d41586-018-06610-y), lo que equivale a las emisiones de CO2 de toda la industria de la aviación. Esa cifra incluye la energía para mantener los servidores encendidos las 24 horas —porque internet no cierra—, pero también la necesaria para refrigerarlos, que es sustancial.

Además del consumo eléctrico, los centros de datos usan refrigerantes, generadores diésel como respaldo y baterías de metales pesados. Todo esto contribuye a la [huella de carbono](https://es.wikipedia.org/wiki/Huella_de_carbono) de internet de formas que van más allá de la electricidad.

## Por qué los sitios estáticos marcan la diferencia

Una de las decisiones con mayor impacto en la eficiencia energética de un sitio web es la arquitectura que se elige. Las [páginas estáticas](https://es.wikipedia.org/wiki/P%C3%A1gina_web_est%C3%A1tica) se cargan más rápido y requieren menos recursos del servidor porque no ejecutan consultas a bases de datos ni procesan código en cada petición. El servidor simplemente entrega un archivo que ya existe.

Las páginas dinámicas —WordPress sin caché, aplicaciones que calculan cada respuesta en tiempo real— hacen mucho más trabajo por cada visita. Multiplicado por millones de peticiones al día, la diferencia energética es significativa.

Para muchos tipos de sitios esto importa: blogs, portfolios, webs corporativas, landing pages. No es necesario un CMS dinámico para cualquier cosa. Y ahora hay [generadores de sitios estáticos](https://jamstack.org/generators/) muy maduros —Astro, Eleventy, Hugo, Jekyll— que combinan la simplicidad de lo estático con la comodidad de plantillas y automatización. No hay excusa técnica para no considerarlos.

## Optimizaciones que sirven a dos objetivos a la vez

Lo interesante es que casi todas las medidas que reducen la huella de carbono de un sitio también mejoran su velocidad de carga y la experiencia del usuario. No hay conflicto entre hacer el bien y hacer el trabajo bien.

Algunas de las más impactantes:

- Comprimir y optimizar imágenes (representan el mayor porcentaje del peso de la mayoría de páginas)
- Usar [lazy loading](https://es.wikipedia.org/wiki/Lazy_loading) para cargar contenido solo cuando se necesita
- Activar compresión y caché para reducir transferencias repetidas
- Elegir un [hosting](https://es.wikipedia.org/wiki/Alojamiento_web) alimentado por energías renovables
- Escribir código limpio y eliminar dependencias que ya no se usan

Cada una de estas decisiones tiene un impacto medible en las métricas de rendimiento y, al mismo tiempo, en el consumo de recursos del servidor.

## Hacia un internet más sostenible

Cada vez hay más herramientas para medir y mejorar la huella digital de un sitio. [Website Carbon Calculator](https://www.websitecarbon.com/) estima las emisiones por visita de cualquier URL. The Green Web Foundation tiene un directorio de proveedores de hosting que operan con energía renovable. La información existe; usarla o no es ya una elección.

Como desarrolladores y propietarios de sitios web, las decisiones que tomamos sobre arquitectura, hosting, optimización de recursos y gestión del código tienen un efecto acumulativo real. La web seguirá creciendo, pero la dirección de ese crecimiento depende en parte de las opciones que tomamos en cada proyecto.

---

No se trata de culpa ni de perfeccionismo. Se trata de que, si ya vamos a hacer el trabajo, hacerlo de forma que consuma menos recursos no suele ser más difícil: a veces es incluso más sencillo. Un sitio eficiente es mejor en casi todos los sentidos.
