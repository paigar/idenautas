---
title: "Coste de entrada y coste de propiedad: lo que cuesta de verdad tener una web"
alt: Un iceberg visto de lado con el presupuesto inicial asomando sobre la superficie y una masa mucho mayor de facturas recurrentes sumergida
date: 2026-04-21
heroImage: idenautas-web/blog/163.png
description: "El precio que pagas al contratar una web es la parte visible del iceberg. Debajo están los años de mantenimiento, actualizaciones, sustos y dependencias. Comparamos el coste de propiedad de una web WordPress frente a una Jamstack sin entrar en cifras, pero diciendo lo que nadie te cuenta antes de firmar."
tags: ["desarrollo-tecnico", "negocio-y-estrategia"]
---

Al comprar un coche nadie mira solo el precio de la concesionaria. Todo el mundo pregunta por el consumo, el seguro, las revisiones, lo que se deprecia, las averías típicas del modelo. Se da por hecho que el precio de entrada es solo una parte de lo que ese coche va a costar a lo largo de los años. A eso se le llama, con acierto, **coste de propiedad**.

Con las webs ocurre lo contrario. Se comparan presupuestos de entrada como si esa cifra resumiera la inversión. No la resume. Una web que lleva cinco años en internet ha ido generando facturas todo ese tiempo: hosting, mantenimiento, actualizaciones, sustos puntuales, dependencias que se dan por hechas hasta que fallan. Lo que pagas al contratarla es la parte visible del iceberg. La parte sumergida es mucho más grande, y casi nadie te la enseña antes de firmar.

## Qué compone en realidad el coste de propiedad de una web

Dejando los números de lado, las categorías que marcan la diferencia entre una web tranquila y una web que siempre pide algo son estas:

- **Alojamiento**, más o menos exigente según la arquitectura.
- **Licencias de herramientas y extensiones**, cuando la web depende de ellas para funcionar.
- **Mantenimiento recurrente**, entendido como el trabajo de mantenerla viva y sana.
- **Intervenciones puntuales** que aparecen sin avisar cuando algo se rompe.
- **Incidentes de seguridad**, raros o no tanto según lo vulnerable que sea la tecnología elegida.
- **Rediseños parciales**, cuando la web envejece y toca refrescarla.
- **Tu propio tiempo**, que no aparece en ninguna factura pero se paga igual.

Sumadas a lo largo de cinco o siete años, estas partidas pesan bastante más que el presupuesto inicial. Y su composición cambia radicalmente según la arquitectura elegida.

## El perfil de gasto de una web WordPress

Una web WordPress se comporta, a efectos económicos, como un vehículo con muchas piezas móviles. Funciona, pero reclama atención constante: el núcleo se actualiza, los plugins se actualizan, el tema se actualiza, y de vez en cuando alguna actualización rompe algo. Si el ecosistema no se mantiene al día aparecen vulnerabilidades; si se mantiene al día aparece trabajo.

A eso se suma que muchos de los plugins que sostienen una web WordPress profesional tienen licencia anual. Seguridad, SEO, copias de seguridad, formularios avanzados, caché. Si no se renuevan, se degradan o dejan de funcionar, así que forman parte del coste real de tener la web encendida.

Y hay un factor estadístico que nadie cuenta en la primera reunión: las instalaciones WordPress reciben intentos de ataque constantes por el mero hecho de ser el CMS más extendido del mundo. Un cliente medio no sufre un incidente cada mes, pero es muy probable que sufra alguno a lo largo de cinco años. Y un incidente no avisa.

El resultado es una **factura recurrente frecuente y desigual**: la mayoría de los meses, contenida; en algunos, desproporcionada.

## El perfil de gasto de una web Jamstack

Una web Jamstack responde a una filosofía distinta. El contenido se genera una vez, se publica y se sirve desde una CDN. No hay panel de administración expuesto, no hay base de datos esperando conexiones, no hay una treintena de plugins que actualizar cada semana.

El coste recurrente existe, y ahora vuelvo sobre él, pero su forma es muy distinta. No se apila por acumulación de herramientas con licencia. No se dispara por incidentes de seguridad que en esta arquitectura apenas se producen. No obliga a un mantenimiento defensivo constante. Los cambios se hacen cuando el negocio los pide, no cuando el ecosistema amenaza con romperse.

Es una **factura recurrente previsible y estable**, sin picos inesperados.

## El hosting no es gratis, y me parece bien que no lo sea

Circula una idea engañosa sobre Jamstack: que todo se aloja gratis en algún servicio del otro lado del Atlántico. No es así como yo trabajo, y hay una razón de fondo.

Alojo las webs de mis clientes en CDNs profesionales de pago. Planes con soporte humano, métricas decentes y responsabilidades claras. ¿Por qué? Porque cuando algo va mal —y tarde o temprano algo va mal en cualquier infraestructura— quiero un interlocutor al otro lado del teléfono, no un foro público con respuestas caducas. Porque quiero que mis clientes sepan que si llaman, llaman a alguien; y si yo necesito ayuda, también llamo a alguien.

Eso cuesta dinero. Poco en comparación con el coste total de una web tradicional, pero dinero. Y está bien que cueste dinero, porque lo que se paga allí es un servicio real: infraestructura seria, soporte real, responsabilidad clara. No es lo mismo regalar hosting y que el cliente apague fuegos solo, que facturar un alojamiento bien elegido y responder de él.

La diferencia entre WordPress y Jamstack no es que Jamstack sea gratis. Es que lo que se paga va a infraestructura útil, no a sostener una arquitectura que hay que parchear continuamente para que no se caiga.

## Tu tiempo también es una factura

Falta una línea en esta cuenta que casi nunca se mira: **las horas que la web le roba al cliente o a su equipo**.

En una web con mantenimiento pesado esas horas existen aunque no se facturen. Revisar el panel, aprobar actualizaciones, comprobar que no se ha roto nada, renovar licencias, escribir al hosting cuando algo va lento sin razón aparente, responder a avisos de seguridad. Todo eso es trabajo, y ese trabajo tiene un coste de oportunidad enorme para un autónomo o una pyme ocupada.

En una web Jamstack bien montada, ese tiempo tiende a desaparecer. Se publica contenido cuando toca, y el resto es silencio. Para mucha gente, esa sola diferencia ya justifica la migración.

## La pregunta que debería hacer todo cliente antes de firmar

La próxima vez que te presenten un presupuesto de web, no preguntes solo por el precio de entrada. Pregunta por el **perfil de coste a lo largo de los próximos años**: qué vas a tener que pagar cada mes, qué tipo de incidencias cabe esperar, quién responde cuando algo se rompe, cuánto tiempo tuyo va a consumir la web solo por existir.

Si quien te la vende no sabe responder, es porque está pensando en la web como un producto que se entrega y se olvida. Pero una web no es un producto: es un servicio que vivirá contigo durante años. Y el servicio que menos cuesta no es el que paga menos la primera factura. Es el que deja de molestarte desde el primer día y cuya cuota recurrente va a infraestructura seria, no a sostener algo que no fue pensado para durar.

Esa es la verdadera diferencia entre WordPress y Jamstack cuando dejas de mirar la foto fija del presupuesto inicial y empiezas a pensar en el coste de tener una web. No es cuestión de tecnología. Es cuestión de saber qué estás comprando.
