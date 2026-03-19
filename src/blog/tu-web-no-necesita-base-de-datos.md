---
title: "Por qué tu web probablemente no necesita base de datos"
heroImage: idenautas-web/blog/148.png
alt: Una web flotando libre en el cielo, sin servidores ni cables, ligera y veloz
date: 2025-08-14
description: "La base de datos se convirtió en el componente por defecto de cualquier web. Pero para la mayoría de proyectos, es una capa de complejidad que no aporta nada y sí genera problemas."
tags: ["desarrollo-tecnico", "negocio-y-estrategia"]
---

Hay una decisión técnica que se tomó hace veinte años y que todavía condiciona cómo se construye la mayoría de las webs: poner una base de datos en el centro de todo. WordPress lo hace. Drupal lo hace. Joomla lo hace. Y durante mucho tiempo, era la única forma sensata de gestionar contenido dinámico en la web.

El problema es que ese modelo se siguió aplicando por inercia mucho después de que dejara de ser necesario para la mayoría de proyectos.

## Qué hace realmente una base de datos en una web típica

En una web corporativa o un blog construido sobre WordPress, la base de datos almacena el contenido: los posts, las páginas, los menús, la configuración, los usuarios. Cada vez que alguien visita una página, WordPress consulta esa base de datos para obtener el contenido, lo combina con la plantilla y genera el HTML que llega al navegador.

Eso tiene sentido cuando el contenido cambia en función de quién lo visita, o cuando se actualiza con tanta frecuencia que pre-generarlo no es viable. Una red social, un marketplace, una aplicación bancaria — estos casos necesitan una base de datos.

Pero una web de servicios profesionales, un portfolio, un blog corporativo — el contenido de estas webs cambia cuando alguien decide actualizarlo. No entre visita y visita. No en función del usuario. Simplemente existe, y se sirve igual a todo el mundo.

Para ese caso, consultar una base de datos en cada visita es un trabajo innecesario que ralentiza la página, añade superficie de ataque y aumenta el coste de infraestructura.

## El contenido en archivos de texto es más robusto de lo que parece

La alternativa que ofrecen los generadores de sitios estáticos como Eleventy es gestionar el contenido en archivos de texto plano — típicamente Markdown con metadatos en YAML. El contenido de un post es un archivo `.md`. El contenido de una página es otro archivo. La configuración son más archivos.

Esto suena más primitivo que una base de datos, pero en la práctica tiene ventajas importantes.

**Portabilidad total.** El contenido está en tu sistema de archivos, en un formato que cualquier herramienta puede leer. No hay lock-in con ningún proveedor, no hay importaciones ni exportaciones complicadas, no hay riesgo de que una actualización corrompa la base de datos.

**Control de versiones.** Al vivir en archivos de texto, el contenido puede gestionarse con Git. Eso significa historial completo de cambios, posibilidad de deshacer cualquier modificación, ramas para trabajar en borradores sin afectar a la web en producción.

**Sin mantenimiento de seguridad.** No hay base de datos que parchear, no hay credenciales de acceso que proteger, no hay inyecciones SQL posibles. La superficie de ataque se reduce a prácticamente cero.

**Copia de seguridad trivial.** Hacer una copia de seguridad de una carpeta de archivos de texto es más sencillo y más fiable que hacer un backup de una base de datos MySQL.

## Lo que se pierde y cómo se compensa

La objeción obvia es la interfaz de administración. Con WordPress, cualquier persona puede entrar al panel y publicar contenido sin saber nada de desarrollo. Con archivos Markdown, hay que editar texto y hay que saber dónde está cada cosa.

Para algunos proyectos eso es un problema real. Para otros no lo es — muchas webs corporativas las actualiza el mismo equipo que construyó el proyecto, o una agencia, y la curva de aprendizaje es mínima.

Y cuando sí hace falta una interfaz de administración amigable, existen los CMS headless — sistemas que ofrecen un panel de edición cómodo pero que guardan el contenido en una API en lugar de en una base de datos acoplada al servidor web. Lo mejor de los dos mundos.

---

La base de datos no es mala en sí misma. Es la herramienta correcta cuando el problema la requiere. El error está en usarla por defecto, sin preguntarse si el problema que resuelve existe en el proyecto concreto que se está construyendo.
