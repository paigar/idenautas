---
title: "Que Google te encuentre, pero que no te habite"
alt: Ilustración minimalista de una web independiente iluminada por un foco de búsqueda, sin cables que la conecten a servicios externos
date: 2026-05-07
heroImage: idenautas-web/blog/166.png
description: Necesitamos que Google nos indexe, pero eso no significa regalarle los datos de cada persona que visita nuestra web. Cómo reducir la dependencia de sus herramientas sin desaparecer de sus resultados.
tags: ["sostenibilidad-y-etica", "desarrollo-tecnico", "negocio-y-estrategia"]
---

Google sigue siendo el buscador que más tráfico reparte en internet. Eso no va a cambiar en el corto plazo, y ignorarlo sería poco inteligente. Si quiero que mi web llegue a personas que no me conocen, necesito que Google la encuentre, la entienda y la muestre cuando alguien busca algo relacionado con lo que hago.

Pero una cosa es optimizar para que Google me indexe y otra muy distinta es llenar mi web de sus herramientas. Cada vez que instalo Google Analytics, cargo fuentes desde sus servidores o empotro un mapa de Google Maps, no estoy solo usando un servicio cómodo y gratuito. Estoy invitando a Google a que se siente en mi web y observe a cada persona que pasa por ella: qué dispositivo usa, desde dónde viene, cuánto tiempo se queda, adónde va después. Y eso sin que mis visitantes hayan dado permiso para ser analizados por un tercero que ni siquiera aparece en mi política de privacidad.

La distinción que me parece importante hacer es esta: quiero que Google me encuentre, pero no quiero que Google me habite.

## El coste invisible de los servicios gratuitos

Cuando digo que algo es gratuito en internet, lo que quiero decir es que el precio no se paga con dinero. Se paga con datos. Google Analytics es gratuito porque los datos de comportamiento que recoge en millones de webs alimentan los modelos que hacen que su publicidad sea más precisa y más cara. Google Fonts es gratuito porque cada petición a sus servidores le dice a Google qué dominio usa esa fuente, cuándo, con qué frecuencia y desde dónde.

No es una teoría conspirativa. Es el modelo de negocio documentado de una empresa que factura cientos de miles de millones al año vendiendo publicidad basada en datos de comportamiento.

La pregunta que me hago cada vez que voy a añadir uno de estos servicios a una web es: ¿qué le estoy regalando a Google a cambio de esta comodidad? Y luego: ¿existe una alternativa que me dé lo mismo sin ese intercambio?

Casi siempre existe.

## Las fuentes tipográficas

Google Fonts es probablemente el servicio de Google más extendido en la web. Es cómodo, tiene miles de opciones y basta con copiar dos líneas de código para tener la tipografía que quieras. El problema es que cada vez que alguien carga tu web, su navegador hace una petición a los servidores de Google para descargar esa fuente, y esa petición incluye la dirección IP del visitante.

La solución es descargar las fuentes y servirlas desde tu propio servidor. Google Fonts permite descargar los archivos directamente. También existe [Google Fonts Helper](https://gwfh.mranftl.com/fonts), una herramienta que genera los archivos y el CSS necesario de forma automática. Una vez descargadas, las sirves tú, no Google, y el comportamiento de tu web no cambia en nada que el visitante pueda notar.

De hecho, lo que sí cambia es la velocidad. Una fuente servida desde tu propio servidor evita una conexión externa, reduce la latencia y mejora los tiempos de carga. Google valora eso en sus métricas de Core Web Vitals. Al deshacerte de una herramienta de Google, mejoras tu posicionamiento en Google. La ironía no se me escapa.

## La analítica web

Google Analytics es la herramienta de medición más usada del mundo. Entiendo por qué: es potente, tiene una integración perfecta con el resto del ecosistema de Google y todo el mundo sabe usarla. También transfiere los datos de tus visitantes a servidores en Estados Unidos, lo que desde 2020 es un asunto legalmente complicado para cualquier web que opere en Europa.

Hay alternativas que funcionan muy bien y que guardan los datos en servidores que tú controlas. [Matomo](https://matomo.org) es la más completa: se puede instalar en tu propio servidor, es de código abierto y ofrece prácticamente las mismas métricas que Analytics. [Plausible](https://plausible.io) y [Umami](https://umami.is) son opciones más ligeras, con interfaces más limpias y filosofía similar.

Con cualquiera de estas herramientas sabes cuántas personas visitan tu web, desde dónde vienen, qué páginas leen y cuánto tiempo se quedan. Lo que no sabes es quiénes son, y eso, si lo piensas, es exactamente lo que necesitas para tomar decisiones sobre tu contenido. No necesitas perfiles individuales. Necesitas tendencias.

## Los mapas

Empotrar un mapa de Google Maps en una página de contacto es lo más habitual del mundo. El resultado visual es bueno, permite buscar rutas y está actualizado. También ejecuta scripts de Google en tu web y registra quién ha visitado esa página.

La alternativa más sencilla no requiere ninguna herramienta especial: una captura de pantalla del mapa con un enlace. El visitante ve exactamente dónde estás, y si quiere abrir el mapa interactivo para buscar cómo llegar, hace clic y se abre en Google Maps, en Apple Maps o en cualquier aplicación que tenga configurada. La diferencia es que el script de Google no se ejecuta en tu web, sino en el dispositivo del usuario cuando él decide abrirlo.

Para quienes prefieren un mapa interactivo real sin Google, [OpenStreetMap](https://www.openstreetmap.org) con la librería [Leaflet](https://leafletjs.com) es una opción sólida. Los datos son libres, el mapa funciona bien y no hay ningún tercero observando a tus visitantes.

## Los formularios

Google Forms es cómodo para recoger información rápidamente, pero los datos de los formularios que tus clientes rellenan van directamente a Google. Nombres, correos, consultas, presupuestos. Información que no le pertenece a ninguna plataforma externa.

Existen soluciones propias para esto. Desde el formulario más básico procesado con un script PHP en tu propio servidor hasta plataformas como [Formbricks](https://formbricks.com) o [Tally](https://tally.so), que puedes autoalojar. La clave es que los datos de tus clientes potenciales los guardes tú, no un tercero.

## Otras dependencias que pasan desapercibidas

Hay dos más que aparecen con frecuencia y que vale la pena mencionar.

**reCAPTCHA.** El sistema antispam de Google es quizás el más usado en formularios de contacto. Funciona bien, pero analiza el comportamiento del visitante en tu web para distinguir humanos de bots. Alternativas como [hCaptcha](https://www.hcaptcha.com) o [Turnstile de Cloudflare](https://www.cloudflare.com/products/turnstile/) ofrecen protección equivalente con menos cesión de datos.

**Librerías desde CDN de Google.** Cargar jQuery o cualquier otra librería desde `ajax.googleapis.com` era una práctica muy común hace diez años. Hoy no tiene sentido: las librerías van en tu propio servidor o se gestionan con un bundler. Una dependencia menos, una petición externa menos, una mejora de rendimiento.

## El círculo que se cierra

Hay algo que encuentro genuinamente satisfactorio en todo esto: cada dependencia de Google que eliminas de tu web mejora su rendimiento. Menos peticiones a servidores externos, menos scripts de terceros, menos tiempo esperando recursos que vienen de fuera. Y un mejor rendimiento se traduce directamente en mejores métricas de Core Web Vitals, que Google usa para determinar cómo posicionar tu web.

Es decir: cuanto menos dependes de las herramientas de Google, mejor te posiciona Google. Hay una lógica en eso que me parece honesta: Google quiere indexar webs rápidas y que ofrezcan buena experiencia al usuario. Que sus propias herramientas gratuitas penalicen el rendimiento es un problema de sus clientes, no el suyo.

## Lo que sí quieres de Google

Nada de lo anterior significa que debas ignorar a Google. Al contrario. Lo que sí quiero de Google es que rastree mi web regularmente, que entienda de qué trata cada página y que la muestre a las personas adecuadas en el momento adecuado.

Para eso, lo que importa es tener un sitio con buena estructura semántica, contenido relevante y actualizado, tiempos de carga razonables y una experiencia que haga que la gente se quede leyendo. Nada de eso requiere instalar ninguna herramienta de Google. Un archivo `sitemap.xml` bien generado y la Search Console —que sí es legítimo usar, porque ahí solo ves datos de tu web— son más que suficientes.

La relación que quiero con Google es la misma que quiero con cualquier plataforma: que trabaje para mí. Que me traiga visitas, que me ayude a llegar a personas que buscan lo que ofrezco. Lo que no quiero es que viva en mi web, observe a mis visitantes y use esa información para sus propios fines.

Esa distinción, que parece sutil, marca la diferencia entre una web que usa Google y una web que depende de él.
