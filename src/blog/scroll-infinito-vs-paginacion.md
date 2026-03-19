---
title: Páginas de scroll infinito vs paginación
alt: Pergamino de papel enrollado, pero de gran longitud
date: 2023-02-03
heroImage: idenautas-web/blog/024.png
description: Una página de scroll infinito es un tipo de diseño de página web en el que el contenido se carga y se muestra automáticamente a medida que el usuario desplaza hacia abajo en la página.
tags: ["experiencia-de-usuario"]
---

Si has echado un vistazo a este blog ya puedes imaginar mi posición en este debate. Pero vamos a explicar por qué.

## Qué es el scroll infinito

El scroll infinito es el mecanismo por el que una página carga nuevo contenido automáticamente a medida que el usuario baja. Sin botones de "cargar más", sin páginas separadas. El muro de Facebook es el ejemplo que todos conocen.

A primera vista parece la solución ideal: navegación fluida, menos clics, experiencia ininterrumpida. Y para algunos casos de uso concretos —redes sociales donde el objetivo es consumir contenido de forma continua y sin destino definido— funciona razonablemente bien.

El problema es que muchos sitios lo adoptan porque parece más moderno, sin preguntarse si es lo más adecuado para lo que necesita su usuario.

## Por qué el scroll infinito suele crear más problemas de los que resuelve

El primer problema es técnico. A medida que el usuario hace scroll, los elementos se añaden al DOM de la página. Esa información permanece en memoria. Después de varios minutos de scroll, la página puede haberse convertido en algo enormemente pesado que el navegador empieza a gestionar con dificultad. Dispositivos menos potentes acusan esto especialmente: lo que empezó siendo una experiencia fluida se vuelve lenta y entrecortada.

El segundo problema es de usabilidad. ¿Cómo llega alguien al pie de página en un sitio con scroll infinito? Cada vez que intentas llegar al fondo, aparece nuevo contenido. El footer —donde suele estar la información de contacto, el aviso legal, el mapa del sitio— se convierte en prácticamente inaccesible.

El tercer problema afecta tanto a usuarios como a SEO: la imposibilidad de enlazar a un punto específico dentro del contenido. Si alguien quiere compartir "el quinto artículo del listado", no puede. El contenido cargado dinámicamente no tiene URLs propias hasta que alguien llega hasta él, lo que también dificulta que los buscadores lo indexen de forma consistente.

## Las ventajas reales de la paginación

La paginación parece anticuada comparada con el scroll infinito, pero ofrece algo que este no puede: control.

El usuario puede ver cuántas páginas hay, saber en qué punto está, volver a una página anterior sin perder su posición, o ir directamente a la página 5 de los resultados. Esa orientación espacial es más útil de lo que parece cuando el contenido es denso o cuando el usuario busca algo concreto.

Cada página paginada tiene su propia URL, lo que facilita los enlaces, las redes sociales y la indexación por buscadores. El contenido existe de forma permanente y accesible.

Y desde el punto de vista técnico, solo se carga el contenido de una página concreta. Sin acumulación de elementos en memoria, sin degradación del rendimiento a medida que se navega.

---

Para un blog, un catálogo de productos, resultados de búsqueda o cualquier índice de contenidos donde el usuario tiene un objetivo concreto, la paginación tradicional es casi siempre la mejor opción. El scroll infinito puede tener sentido en contextos donde el objetivo es precisamente la exploración sin destino: feeds de noticias, redes sociales, galerías de inspiración. Para el resto, es una solución a la búsqueda de un problema.
