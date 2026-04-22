---
title: "Por qué dejé Google Analytics y qué me enseñó Matomo"
alt: Un pequeño estudio trasladando sus archivos desde un despacho alquilado en una torre corporativa a una oficina propia en su barrio
date: 2026-04-22
heroImage: idenautas-web/blog/164.png
description: "Durante años instalé Google Analytics casi por inercia. Este artículo cuenta por qué dejé de hacerlo, qué me empujó a probar Matomo, qué eché de menos al principio, qué gané después, y qué mirarías tú antes de plantearte el mismo salto."
tags: ["negocio-y-estrategia", "sostenibilidad-y-etica"]
---

Durante años, Google Analytics fue mi respuesta por defecto a cualquier pregunta que empezara por "¿cuánta gente visita mi web?". Era gratis, estaba en todas partes, y en la mayoría de los estudios se instalaba casi sin pensarlo: dos líneas en la cabecera del HTML, un correo al cliente con el enlace al panel, y listo. Yo lo hice así durante mucho tiempo. No había épica detrás; era lo que se hacía.

Aquí cuento por qué dejé de hacerlo, qué me llevó a migrar a Matomo, qué eché de menos, qué descubrí por el camino, y qué haría distinto si tuviera que volver a empezar.

## Lo que Google Analytics hace bien (y no es poco)

Empecemos por lo justo. Google Analytics, especialmente desde la versión 4, es una pieza de ingeniería enorme. Permite hacer preguntas complejas sobre el comportamiento de los visitantes, cruzar datos con Google Ads, seguir embudos de conversión, comparar audiencias entre países y dispositivos, y profundizar en segmentaciones que en otras herramientas te cuestan horas.

Para un ecommerce grande que vive de Google Ads, GA4 sigue teniendo todo el sentido del mundo. Si tu negocio entero depende de optimizar campañas de pago en Google, trabajar fuera del ecosistema de Google es remar contra corriente: puede hacerse, pero no ganas nada.

Y hay algo más que conviene reconocer: **es el estándar que todo el mundo conoce**. Cuando un cliente abre el panel y ve el mapa del mundo con los puntitos parpadeando, se siente en casa. La alfombra roja del sector ha tenido el logo de Google durante quince años, y eso no se cambia por decreto.

## Por qué empecé a dudar

El contexto venía de lejos. Llevo tiempo intentando desgooglelizar mi día a día todo lo que puedo: correo fuera de Gmail, búsquedas fuera de Google, mapas fuera de Google Maps cuando se puede, navegador fuera de Chrome. Es una incomodidad creciente con depender de una sola empresa para casi todo lo que hago en internet, y Google Analytics era, de largo, la pieza que más contradecía ese camino. La tenía en el punto de mira desde hacía meses.

El empujón final, sin embargo, fue práctico. Un día cualquiera, mirando el informe de un cliente, caí en algo incómodo: **casi nadie estaba apareciendo en las estadísticas**.

La web tenía tráfico real. Lo veía en los registros del servidor, lo veía en los formularios, lo veía en las llamadas. Pero Google Analytics reportaba una fracción. La razón era simple: el banner de cookies. La mayoría de los visitantes lo rechazaba, y con el rechazo desaparecía cualquier rastro medible. Estaba tomando decisiones sobre una muestra mutilada sin darme cuenta.

Al mismo tiempo, el contexto legal apretaba. La CNIL francesa declaró en 2022 que el uso de Google Analytics, tal y como estaba configurado por defecto, era incompatible con el RGPD, y las autoridades austríaca e italiana llegaron a conclusiones similares. La sentencia Schrems II seguía sin tener una solución estable: la transferencia de datos personales a Estados Unidos es un campo de minas que se negocia y se renegocia desde 2020. El EU-US Data Privacy Framework de 2023 puso un parche, pero no cerró del todo el debate; hay litigios abiertos sobre si ese parche aguantará.

Resumen sin ruido: tenía una herramienta que me daba datos degradados por un consentimiento que casi nadie aceptaba, y que además vivía en una zona gris jurídica cada vez más difícil de defender ante un cliente que preguntaba. A eso se le sumaba una capa más difícil de articular: la sensación de estar **pagando con los datos de mis visitantes** por un panel que ya no usaba tanto.

## El paisaje de alternativas

Cuando empecé a mirar fuera, me sorprendió la cantidad de herramientas serias que habían crecido en paralelo. Ninguna tenía la profundidad de GA4, pero casi todas resolvían cosas que GA4 hacía regular o no hacía.

- **Plausible**. Ligero, sin cookies, enfoque en lo imprescindible. Servicio en la nube con servidores en Europa.
- **Fathom**. Filosofía parecida a Plausible, de pago, con especial cuidado en el cumplimiento legal.
- **Umami**. Código abierto, muy minimalista, fácil de autoalojar.
- **Simple Analytics**. Panel limpísimo, sin cookies, orientado a negocios pequeños.
- **Pirsch**. Alemán, de pago, con analítica por servidor (sin bloqueadores de script).
- **Matomo**. El veterano. Código abierto, autoalojable o en la nube, con una potencia más cercana a GA4 que la del resto.

Probé varias. Si buscara el panel más elegante y la instalación más fácil para un cliente pequeño, hoy probablemente diría Plausible. Pero tenía razones concretas para quedarme con Matomo, y merece la pena contarlas.

## Por qué elegí Matomo

La primera es **control**. Matomo se puede autoalojar. Los datos se quedan en mi servidor, bajo mi responsabilidad, y no viajan fuera de la Unión Europea. Para los clientes que me pedían garantías legales escritas, eso era un argumento directo y verificable.

La segunda es **profundidad**. Matomo no es minimalista. Tiene embudos, mapas de calor, grabaciones de sesión, informes personalizados, segmentación. Todo lo que un analista echa en falta cuando salta a una herramienta _sencilla_ de privacidad, en Matomo está. Eso me permitió migrar a clientes que venían de GA4 sin que sintieran que perdían capacidad.

La tercera, más discutible pero real, es **coherencia**. Llevaba tiempo explicándoles a mis clientes que el contenido era suyo, que el dominio era suyo, que el hosting debía ser suyo. Seguir enviando sus datos analíticos a una plataforma de terceros empezaba a sonar a contradicción. Matomo me permitía decir lo mismo también en este frente.

Y la cuarta, la menos romántica pero importante, es **coste**. En mi configuración, con el servidor que ya tenía, autoalojar Matomo me salía prácticamente gratis al mes. Para el gasto operativo de un estudio pequeño, eso era difícil de rechazar.

## Lo que eché de menos al principio

Hubo cosas que me molestaron los primeros meses.

- **La curva de configuración.** GA4 viene preconfigurado. Matomo requiere decisiones: tratamiento de IPs, política de cookies, tiempo de retención, respeto al _Do Not Track_, objetivos manuales. No es complicado, pero no son dos líneas y listo.
- **Las integraciones con ecosistemas de pago.** Si un cliente depende fuerte de Google Ads, abandonar GA significa perder el hilo entre clic y conversión. Hay formas de recuperarlo (Google Ads permite configurar conversiones independientes), pero es trabajo.
- **La jerga compartida.** Los clientes llevan años oyendo _GA4_, _eventos_, _conversiones_ en el lenguaje de Google. Al cambiar a Matomo hay una pequeña traducción que toca hacer en las reuniones. Se supera rápido, pero existe.

## Lo que gané

A los pocos meses, varias cosas cambiaron sin buscarlas.

La primera fue **volver a confiar en los datos**. Configurado sin cookies y con anonimización de IP, Matomo entra en el terreno que la ley permite medir sin banner. De repente volvía a ver a todo el mundo. Los informes cuadraban con los registros del servidor, con los formularios, con la realidad. Ese solo cambio reconcilió a más de un cliente con su propia web.

La segunda fue una **conversación diferente con los clientes**. Cuando abres un panel alojado en su dominio y les explicas que los datos son suyos y no salen de ahí, el tono cambia. Deja de ser "tienes analítica" y pasa a ser "controlas tu analítica". Es sutil, pero se nota.

La tercera fue **dejar de tenerle miedo al apartado de privacidad**. Los textos legales de las webs que gestiono se volvieron más cortos, más sinceros y más defendibles. No hay que justificar transferencias a Estados Unidos si no las haces.

## Qué mirar antes de dar el salto

Si estás pensando en hacer el mismo movimiento, estas son las preguntas que me habría hecho antes si hubiera tenido a alguien a quien preguntar.

- **¿Quién usa de verdad los informes?** Si el panel de GA4 se abre una vez al mes, probablemente no necesitas la mitad de su potencia. Si lo tiene abierto un analista cada mañana, revisa bien qué informes concretos necesita antes de migrar.
- **¿Cuánto depende el negocio de Google Ads?** Si depende mucho, no tires GA. Coexistir es válido: puedes tener Matomo para tu analítica diaria y mantener GA4 conectado solo a la campaña de pago.
- **¿Tienes dónde alojarlo?** Matomo autoalojado es ideal para el control, pero pide un hosting que soporte una base de datos MySQL razonable. Si tu web es estática y no tienes servidor propio, plantéate Matomo Cloud o una alternativa en la nube como Plausible.
- **¿Quién lo va a mantener?** Como cualquier pieza propia, necesita actualizaciones. No es gran cosa, pero no es cero.

## Lo que aprendí

La analítica web no es una herramienta neutra. Elegir una u otra dice algo sobre quién controla los datos de tus visitantes, qué promesas puedes hacerles de verdad, y cuánto estás dispuesto a depender de un proveedor que no trabaja para ti.

Durante años asumí que medir bien significaba medir más. Hoy pienso lo contrario: medir bien significa **medir lo que necesitas, con herramientas cuyos incentivos están alineados con los tuyos, y poder explicárselo a tu cliente sin bajar la mirada**.

El salto a Matomo no es para todo el mundo ni para todo tipo de negocio. Pero si llevas tiempo con la sensación incómoda de que tu panel de analítica mide cada vez menos y pide cada vez más, puede que no sea tu imaginación.
