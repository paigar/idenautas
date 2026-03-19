---
title: Las ventajas del desarrollo web progresivo
alt: Una misma página web visualizándose en una televisión, un ordenador portátil, una tablet y un smartphone
date: 2023-04-12
heroImage: idenautas-web/blog/111.png
description: Beneficios que el desarrollo web progresivo puede traer tanto para los desarrolladores como para los usuarios finales
tags: ["desarrollo-tecnico"]
---

Una Progressive Web App, o PWA, no es exactamente una app ni exactamente una web. Es lo mejor de ambos mundos —o al menos esa es la promesa. Y en muchos casos, la promesa se cumple.

La idea central es esta: una web que puede instalarse en el dispositivo del usuario, funcionar sin conexión, enviar notificaciones push y ofrecer una experiencia tan fluida como una aplicación nativa, sin pasar por una tienda de aplicaciones ni requerir una descarga de decenas de megabytes.

## Qué hace que una web sea "progresiva"

El término "progresivo" viene de un principio importante: la mejora progresiva. Una PWA funciona en cualquier navegador, pero ofrece capacidades adicionales cuando el navegador y el dispositivo las soportan. Un usuario con un navegador antiguo ve una web normal. Un usuario con un navegador moderno puede instalarla, usarla offline y recibir notificaciones.

Las tecnologías que hacen posible esto son principalmente dos: los **Service Workers** —scripts que se ejecutan en segundo plano y gestionan la caché, las peticiones de red y las notificaciones push— y el **Web App Manifest** —un archivo JSON que define cómo se ve la app instalada: nombre, icono, color de tema, orientación preferida.

## Las ventajas reales

El argumento más sólido para una PWA es la universalidad. En lugar de desarrollar una app para iOS, otra para Android y mantener además la web, una sola base de código sirve para todo. El ahorro en desarrollo y mantenimiento puede ser significativo, especialmente para proyectos sin el presupuesto de un equipo de desarrollo móvil dedicado.

La velocidad es otro punto fuerte bien documentado. Con una estrategia de caché inteligente mediante Service Workers, los recursos que el usuario ya ha descargado se sirven instantáneamente en visitas posteriores, sin depender de la red. Para webs con contenido que no cambia con mucha frecuencia, esto se traduce en tiempos de carga que rivalizan con los de una app nativa.

La posibilidad de funcionar offline —o con conectividad degradada— cambia completamente las expectativas del usuario. Si alguien abre tu web en el metro sin cobertura, en lugar de ver una página de error puede seguir navegando por el contenido que ya estaba en caché. Twitter Lite, AliExpress y The Washington Post son ejemplos conocidos de empresas que han obtenido mejoras medibles en conversión y retención después de implementar PWA.

La instalabilidad sin tienda de apps elimina uno de los mayores obstáculos para la adopción. Instalar una app requiere convencer al usuario de que merece ese esfuerzo. Una PWA se puede añadir a la pantalla de inicio con un par de toques, sin salir del navegador.

## Las limitaciones que hay que conocer

Los Service Workers solo funcionan sobre HTTPS. No es una limitación técnica difícil de resolver, pero sí un requisito que hay que cumplir desde el principio.

El soporte en iOS ha mejorado significativamente en los últimos años, pero sigue siendo menos completo que en Android. Las notificaciones push en Safari iOS, por ejemplo, llegaron tarde y tienen sus particularidades. Hay que comprobar qué funcionalidades concretas están disponibles para la audiencia específica del proyecto.

Las PWA dependen de JavaScript para casi todo su funcionamiento avanzado. Si el JS falla o el usuario lo tiene desactivado, la experiencia se degrada a una web normal, lo que en principio está bien —ahí está la mejora progresiva— pero hay que tenerlo en cuenta al diseñar el comportamiento offline.

Algunas capacidades de hardware —acceso a ciertos sensores, Bluetooth, comunicación entre apps— siguen siendo territorio nativo. Si el proyecto necesita integración profunda con el dispositivo, una app nativa puede seguir siendo la opción más adecuada.

## Cuándo tiene sentido plantearse una PWA

Las PWA funcionan especialmente bien para proyectos con audiencia global y dispositivos variados, para servicios donde la velocidad y la disponibilidad offline son críticas, o para empresas que no pueden permitirse el coste de mantener apps nativas para cada plataforma.

Para una tienda online, un medio de comunicación, una herramienta de gestión interna o un servicio con usuarios recurrentes, el modelo PWA tiene mucho sentido. Para un juego que necesita acceso completo al hardware gráfico o una app de fotografía profesional, probablemente no.

---

Lo interesante de las PWA no es que sean la solución para todo, sino que han demostrado que la brecha entre web y app nativa es mucho más pequeña de lo que se pensaba. Y que en muchos casos, apostar por la web abierta es la decisión técnica y estratégica más inteligente.
