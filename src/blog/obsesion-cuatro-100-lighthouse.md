---
title: "La obsesión por los cuatro 100 en Lighthouse"
alt: Un desarrollador mirando fijamente la pantalla con los resultados de Lighthouse
date: 2026-03-10
heroImage: idenautas-web/blog/125.png
description: Perseguir la puntuación perfecta en Lighthouse puede convertirse en una trampa. Exploramos qué mide realmente esta herramienta, qué técnicas merecen la pena y cuándo es mejor parar de optimizar.
tags: ["negocio-y-estrategia"]
---

Si eres desarrollador web, conoces la sensación. Abres Lighthouse, lanzas el análisis y aparecen cuatro círculos. Performance: 96. Accessibility: 93. Best Practices: 100. SEO: 100. Dos de cuatro. Casi perfecto. _Casi_. Y ese _casi_ te persigue.

Porque sabes que podrías llegar. Solo un par de ajustes más. Unos milisegundos menos de LCP, un par de ratios de contraste que corregir. Así que te arremangas y empiezas a optimizar. Y optimizar. Y optimizar.

Bienvenido al club de los que persiguen los cuatro 100.

## Qué mide realmente Lighthouse

Antes de obsesionarnos, conviene entender qué estamos midiendo. Lighthouse es una herramienta automatizada de Google que audita cuatro áreas:

- **Performance**: velocidad de carga percibida y real (LCP, FCP, CLS, TBT, Speed Index).
- **Accessibility**: cumplimiento de estándares WCAG (contraste, etiquetas ARIA, navegación por teclado).
- **Best Practices**: seguridad, APIs modernas, ausencia de errores en consola.
- **SEO**: metadatos, estructura semántica, rastreabilidad.

Cada categoría tiene su propia lógica de puntuación. Y aquí está la primera trampa: **un 100 no significa perfección**. Significa que la herramienta no ha encontrado problemas detectables automáticamente. Hay aspectos de accesibilidad, rendimiento y SEO que ninguna herramienta automatizada puede evaluar.

## El viaje de 96 a 98 (y por qué 100 se resiste)

En nuestro propio sitio, el camino fue más o menos así:

**Accessibility de 93 a 100** fue relativamente directo. El problema eran ratios de contraste insuficientes en algunos botones y áreas táctiles demasiado pequeñas en el footer. Ajustar el color del botón principal de `var(--color-accent)` a un `#c0392b` con ratio 5.05:1 y añadir padding a los enlaces del pie resolvió ambas cosas. Cambios pequeños, impacto grande.

**Performance de 96 a 98** requirió más trabajo. Implementamos LQIP (Low Quality Image Placeholders) con data URIs en base64, añadimos `preconnect` al CDN de imágenes, preload para las hero images con `imagesrcset`, y atributos `width` y `height` explícitos en todas las imágenes para eliminar el CLS.

**Performance de 98 a 100** es donde la cosa se pone interesante. El LCP depende de una imagen servida desde un CDN externo. Por mucho que optimices, hay una latencia de red que no controlas. Esos 2 puntos restantes están, literalmente, fuera de tu alcance.

## Cuando la optimización se vuelve contraproducente

En el proceso aprendimos algo valioso: **algunas optimizaciones "teóricamente correctas" pueden empeorar las cosas**.

Intentamos la técnica clásica de Critical CSS: extraer los estilos above-the-fold, inlinearlos en el HTML y cargar el resto de forma asíncrona con el truco de `media="print" onload="this.media='all'"`. Resultado: Lighthouse devolvió Performance **0**. Cero. Las métricas aparecían como indefinidas.

¿La razón? El headless Chrome que usa Lighthouse no ejecuta el `onload` del `<link>` de forma fiable. Una técnica que en un navegador real funciona perfectamente, en el entorno de pruebas es catastrófica. Revertimos el cambio inmediatamente.

También probamos a forzar el formato WebP añadiendo `&format=webp` a las URLs del CDN. En teoría, imágenes más ligeras. En la práctica, invalidamos toda la caché del CDN al cambiar las URLs, y las imágenes tardaban más en cargar que antes. Resulta que nuestro CDN ya negociaba automáticamente el formato óptimo mediante la cabecera `Accept`. Estábamos resolviendo un problema que no existía.

## Lo que sí merece la pena

No todo fue tiempo perdido. Hay optimizaciones que mejoraron genuinamente la experiencia del usuario:

**LQIP (Low Quality Image Placeholders)**. En lugar de mostrar un espacio vacío mientras la imagen carga, mostramos una versión diminuta (20px) codificada en base64 directamente en el HTML. El usuario ve inmediatamente una mancha de color que sugiere la imagen final. Cuando la imagen real llega, una transición suave de opacidad la revela. La percepción de velocidad mejora drásticamente, aunque la imagen tarde lo mismo en cargar.

**Preconnect y preload**. Indicar al navegador que va a necesitar conectarse al CDN de imágenes antes de que descubra la primera imagen ahorra tiempo real de handshake DNS + TLS. Para la hero image, el preload con `imagesrcset` permite que empiece a descargar antes incluso de que el parser encuentre el `<img>`.

**Dimensiones explícitas**. Poner `width` y `height` en cada imagen permite al navegador reservar el espacio exacto antes de la descarga. Adiós al Cumulative Layout Shift, ese molesto salto de contenido cuando las imágenes aparecen.

**Accesibilidad real**. Los ajustes de contraste y touch targets no solo mejoran la puntuación: hacen el sitio genuinamente más usable para personas con baja visión o que navegan desde móviles pequeños.

## La diferencia entre métrica y experiencia

Aquí está la paradoja: nuestro sitio con 98 de Performance se _siente_ más rápido que muchos sitios con 100. ¿Por qué? Porque la puntuación mide tiempos absolutos, pero la experiencia del usuario depende de la **percepción**.

Un sitio que muestra contenido instantáneamente (aunque sea un placeholder borroso) y transiciona suavemente a la imagen final se percibe como inmediato. Un sitio que carga 200ms más rápido pero muestra una pantalla en blanco hasta que todo está listo se percibe como lento.

Las métricas de Lighthouse son útiles como guía, pero no capturan matices como:

- La suavidad de las transiciones
- El feedback visual durante la carga
- La consistencia de la experiencia entre páginas
- La sensación general de "pulido" de la interfaz

## Cuándo parar de optimizar

Esta es la pregunta difícil. Mi regla personal:

**Para si la siguiente optimización empeora la experiencia real del usuario o la mantenibilidad del código para ganar puntos en un test sintético**.

El Critical CSS inline era exactamente eso: complicaba el build, añadía fragilidad, y no mejoraba la experiencia real. El formateo forzado a WebP era resolver un problema inexistente. Ambas optimizaciones existían solo para subir un número.

En cambio, los LQIP mejoraron genuinamente la experiencia. La accesibilidad mejoró genuinamente la usabilidad. El preconnect mejoró genuinamente el tiempo de carga.

La diferencia está clara: **optimiza para personas, no para robots**.

## Los cuatro 100 como brújula, no como destino

Lighthouse es una herramienta extraordinaria. Te señala problemas reales que de otra forma pasarían desapercibidos. Te empuja a aprender sobre rendimiento, accesibilidad, seguridad y SEO. Te obliga a pensar en cosas que el usuario final agradecerá aunque nunca sepa que existen.

Pero los cuatro 100 son una asíntota, no una meta. Acercarse es valioso. Llegar es satisfactorio. Pero sacrificar la mantenibilidad del código, la cordura del equipo o la experiencia real del usuario por dos puntos porcentuales en un test automatizado no tiene sentido.

Así que la próxima vez que Lighthouse te muestre un 98, respira hondo. Mira tu sitio. Navega por él. ¿Se siente rápido? ¿Es accesible? ¿La experiencia es buena?

Entonces enhorabuena. Tienes algo mejor que cuatro 100: un sitio web que funciona de verdad.
