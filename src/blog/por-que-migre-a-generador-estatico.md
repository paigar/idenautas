---
title: "Por qué migré a un generador estático (y no volvería atrás)"
alt: Una mesa de trabajo ordenada con un portátil, archivos de texto plano en pantalla y ningún panel de administración a la vista
date: 2026-05-14
heroImage: idenautas-web/blog/167.png
description: "Durante años usé CMS para construir webs que no los necesitaban. Aquí cuento por qué decidí migrar a un generador estático, qué proceso fue ese, qué perdí por el camino y qué gané."
tags: ["desarrollo-tecnico", "negocio-y-estrategia"]
---

No hay un momento concreto que pueda señalar. No hubo una actualización catastrófica, ni un servidor caído en el peor momento, ni un plugin que se llevara consigo media web. La decisión fue otra cosa: una acumulación gradual de pequeñas molestias que, llegado un punto, pesaban más que las ventajas que justificaban seguir como estaba.

Pasé años trabajando con CMS —WordPress y otros—. Y no empezaré diciendo que estaba equivocado al hacerlo, porque no lo estaba.

## Lo que los CMS hacen bien

WordPress es bueno en cosas importantes. Tiene una interfaz que cualquier persona puede aprender a usar en poco tiempo, una comunidad enorme que ha resuelto casi cualquier problema imaginable, y un ecosistema de plugins que cubre desde la galería de imágenes hasta el comercio electrónico sin necesitar a ningún desarrollador para conectar las piezas.

Para muchos proyectos, ese equilibrio tiene todo el sentido. Un cliente que necesita publicar entradas de blog sin intermediarios, un ecommerce con catálogo variable, un sitio multiidioma con muchas piezas móviles: para eso, un CMS sigue siendo una respuesta razonable.

El problema no era que los CMS fueran malas herramientas. El problema era que yo los estaba usando para construir cosas que no los necesitaban.

## La fricción que se acumula

Un sitio web corporativo típico —cinco o seis páginas, un blog, un formulario de contacto— no cambia de contenido todos los días. Cambia pocas veces al año. Y sin embargo, para servirlo, mantenía una base de datos MySQL, un servidor PHP, una instalación de WordPress con sus actualizaciones periódicas, y encima de todo eso una capa de plugins —caché, seguridad, SEO, formularios— que había que mantener sincronizados.

Cada actualización era una posibilidad de rotura. A veces rompía la caché. A veces un plugin dejaba de ser compatible con la última versión de WordPress. A veces no pasaba nada, y eso se sentía como un alivio más que como normalidad, que ya es decir algo.

El hosting también pesaba. Un servidor capaz de mantener WordPress con rendimiento decente cuesta bastante más que uno que sirve archivos estáticos. El argumento de que "el hosting es barato" aguanta menos cuando te comparas con lo que necesitarías si no existiera la base de datos.

Había algo más difícil de articular: la sensación de que el sistema era más grande que el problema que resolvía. Como llegar a casa en camión para traer la compra de la semana.

## Qué es un generador estático, sin complicarlo

Un generador estático funciona de forma diferente a un CMS. En lugar de construir cada página cuando alguien la pide —consultando la base de datos, procesando la lógica del servidor, ensamblando el HTML al vuelo—, genera todas las páginas de una vez, antes de que llegue ningún visitante. El resultado es un conjunto de archivos HTML, CSS y JavaScript que el servidor simplemente entrega cuando alguien los pide.

Sin base de datos. Sin PHP. Sin actualizaciones de plugins. Sin superficie de ataque adicional.

El contenido se escribe en ficheros de texto plano —Markdown, normalmente— con un poco de metadatos al principio. Eso es todo.

## El proceso real de migrar

La migración no fue un fin de semana de trabajo. Fue un proceso que ocupó semanas, repartidas entre proyectos, con mucho tiempo de aprendizaje que no aparece en ninguna factura.

Lo primero que tuve que desaprender fue la lógica del CMS. Cuando llevas años pensando en términos de entradas, categorías, widgets y plugins, el cambio de modelo mental no es automático. En un generador estático, la lógica está en el código: las plantillas, los datos, las reglas de construcción. Es más predecible, pero pide más conocimiento técnico para empezar.

El contenido existente hubo que exportarlo, limpiarlo y reformatearlo. Algunos elementos que dependían de plugins específicos —formularios, galerías— necesitaban soluciones distintas. Para los formularios encontré servicios especializados que encajan mejor con esta arquitectura. Para las galerías, código que controlo yo, sin dependencia de ningún tercero.

Hubo un momento, a mitad del proceso, en que el regreso parecía más fácil que seguir. Lo menciono porque creo que es honesto, y porque cualquiera que haga algo parecido probablemente pase por ese mismo punto.

## Lo que perdí

No quiero pintar esto mejor de lo que es.

El editor visual desapareció. En WordPress, alguien sin conocimientos técnicos puede cambiar un párrafo, subir una imagen o añadir una sección con el ratón. En un generador estático, el flujo de trabajo cambia: se edita un fichero de texto, se guarda, y el sistema reconstruye las páginas afectadas. Es un proceso completamente manejable si se tiene mínimo contexto técnico, pero no es lo mismo que el editor visual.

El ecosistema de plugins también desapareció. Cada funcionalidad nueva requiere buscar una alternativa compatible con la arquitectura estática, o implementarla directamente. A veces hay soluciones mejores. A veces hay que trabajar más.

Y hay una fricción inicial con los clientes que vienen del mundo WordPress. La mayoría esperan poder acceder a un panel y editar por su cuenta. Eso es posible también con sitios estáticos —hay interfaces de administración de contenido que funcionan por encima—, pero requiere una conversación y una configuración adicional que con WordPress no hace falta.

## Lo que gané

La velocidad fue lo primero que noté. Una página servida como HTML estático se carga en milisegundos. No hay consulta a la base de datos, no hay tiempo de respuesta del servidor PHP, no hay plugins de caché intentando compensar la complejidad del sistema. La velocidad no requería optimización: era el estado por defecto.

La seguridad se simplificó de forma radical. Sin base de datos, no hay inyección SQL. Sin PHP, no hay vulnerabilidades del intérprete. Sin plugins de terceros actualizándose constantemente, no hay superficie de ataque que mantener parcheada. Los vectores de ataque habituales de WordPress, que ocupaban una parte real de mi tiempo de mantenimiento, dejaron de existir.

El mantenimiento se redujo a casi nada. Actualizar el generador cuando hay una versión nueva —que suele ser infrecuente y sin consecuencias dramáticas— y nada más. Sin alertas de plugins desactualizados, sin revisiones periódicas del dashboard, sin la sensación permanente de que algo podría romperse sin previo aviso.

Y hay algo más que no esperaba: el control sobre el HTML final. Con un CMS y sus plugins acumulados, el HTML que se sirve es el resultado de muchas capas que no controlas del todo. Con un generador estático, el HTML es exactamente lo que escribes en las plantillas. Nada más, nada menos.

## Para quién tiene sentido y para quién no

No creo que los generadores estáticos sean la respuesta correcta para todo. Hay proyectos donde la lógica dinámica es esencial: una tienda con inventario en tiempo real, una plataforma con cuentas de usuario, un portal con contenido personalizado. Para eso, el servidor tiene que hacer trabajo en tiempo de petición, y un generador estático no resuelve eso.

Tampoco tiene sentido si el cliente necesita autonomía total para gestionar contenido sin ningún conocimiento técnico y no hay presupuesto para configurar una capa de administración adicional.

Pero para un sitio web corporativo, un portfolio, un blog, una web de producto con contenido que cambia poco: la arquitectura estática es, en casi todos los casos, la herramienta más sencilla, más rápida y más fácil de mantener que existe.

Podría haberlo visto antes. Pero a veces la herramienta que llevas años usando se vuelve invisible: la das por sentada incluso cuando hay opciones mejores. Esta fue la mía.
