---
title: "Optimización de imágenes en 2026: AVIF, WebP y el fin de los servicios de transformación en tiempo real"
alt: Una imagen que se descompone en tres versiones de diferente peso y calidad, representando los formatos AVIF, WebP y JPEG
date: 2026-03-31
heroImage: idenautas-web/blog/156.png
description: Las imágenes siguen siendo el recurso más pesado de la mayoría de webs. En 2026, formatos como AVIF y WebP permiten reducir su peso drásticamente, pero la forma de servirlas también ha cambiado. Adiós a la transformación en tiempo real, hola a las variantes pregeneradas.
tags: ["desarrollo-tecnico", "sostenibilidad-y-etica"]
---

Si alguna vez has abierto una web en el móvil y has visto cómo las imágenes tardaban en cargar, o has sentido que la página iba lenta sin motivo aparente, lo más probable es que el problema estuviera en las imágenes. En 2026, las imágenes siguen representando, de media, más de la mitad del peso total de una página web. Y aunque llevamos años hablando de optimización, la realidad es que la mayoría de sitios web siguen sirviendo imágenes más pesadas de lo necesario.

Lo que ha cambiado en los últimos años no es tanto la conciencia sobre el problema, sino las herramientas disponibles para resolverlo. Formatos como AVIF y WebP han madurado, el soporte en navegadores es prácticamente universal y las estrategias de entrega han evolucionado hacia modelos más eficientes y predecibles.

## JPEG, WebP y AVIF: tres generaciones de compresión

Para entender por qué esto importa, conviene saber qué hace cada formato y cuándo tiene sentido usar uno u otro.

### JPEG: el veterano que sigue en pie

JPEG lleva con nosotros desde 1992. Más de treinta años. Y sigue siendo el formato de imagen más extendido en la web. Su compresión con pérdida funciona razonablemente bien para fotografías, y cualquier dispositivo del planeta sabe abrirlo.

El problema es que JPEG fue diseñado en una época en la que las conexiones eran lentas y las pantallas pequeñas. Su algoritmo de compresión no es especialmente eficiente comparado con lo que existe hoy. Una foto JPEG de buena calidad puede pesar fácilmente entre 200 y 500 KB, y en muchas webs se sirven imágenes de varios megabytes sin ningún tipo de optimización.

JPEG sigue siendo imprescindible como formato de respaldo, pero ya no debería ser la primera opción.

### WebP: el salto de Google

Google lanzó WebP en 2010 con un objetivo claro: ofrecer mejor compresión que JPEG manteniendo una calidad visual comparable. Y lo consiguió. Una imagen WebP típica pesa entre un 25% y un 35% menos que su equivalente en JPEG, con una calidad perceptualmente idéntica.

WebP soporta tanto compresión con pérdida como sin pérdida, transparencia (como PNG) y hasta animaciones (como GIF, pero mucho más ligeras). En 2026, el soporte de WebP en navegadores es del 97%, lo que lo convierte en una opción segura para prácticamente cualquier proyecto.

### AVIF: la nueva referencia

AVIF es el formato más reciente de los tres. Está basado en el códec de vídeo AV1, desarrollado por la Alliance for Open Media (que incluye a Google, Apple, Mozilla, Netflix, Amazon y otros). Su compresión es notablemente superior: una imagen AVIF puede pesar entre un 40% y un 50% menos que su equivalente JPEG, y entre un 15% y un 25% menos que WebP.

Además de la compresión, AVIF ofrece mejor reproducción de colores, soporte para HDR y una gestión del ruido y los degradados que supera claramente a los otros dos formatos. Donde JPEG y WebP pueden mostrar artefactos visibles en zonas de color uniforme o transiciones suaves, AVIF mantiene una calidad visual muy alta incluso con archivos pequeños.

El soporte en navegadores ha sido la principal barrera de AVIF, pero en 2026 la situación es muy diferente a la de hace dos años. Chrome, Firefox, Safari y Edge lo soportan de forma nativa. El soporte global supera el 95%.

## La comparativa en números

Para hacerlo tangible, veamos qué ocurre con una fotografía típica de una web corporativa, una imagen de 1200 píxeles de ancho:

| Formato           | Peso aproximado | Reducción vs JPEG |
| ----------------- | --------------- | ----------------- |
| JPEG (calidad 75) | 180 KB          | —                 |
| WebP (calidad 75) | 120 KB          | -33%              |
| AVIF (calidad 60) | 90 KB           | -50%              |

Esos 90 KB de diferencia por imagen pueden parecer poco, pero multiplicados por las 15 o 20 imágenes que puede tener una página de blog o un catálogo de servicios, estamos hablando de más de un megabyte de ahorro. En una conexión móvil, eso se traduce en segundos.

## El elemento `<picture>`: servir el formato adecuado a cada navegador

Tener las imágenes en tres formatos no sirve de nada si no hay un mecanismo para que cada navegador reciba el que mejor entiende. Para eso existe el elemento HTML `<picture>`.

```html
<picture>
	<source
		type="image/avif"
		srcset="foto-480.avif 480w, foto-800.avif 800w, foto-1200.avif 1200w"
		sizes="(max-width: 768px) 100vw, 50vw" />
	<source
		type="image/webp"
		srcset="foto-480.webp 480w, foto-800.webp 800w, foto-1200.webp 1200w"
		sizes="(max-width: 768px) 100vw, 50vw" />
	<img
		src="foto-1200.jpg"
		srcset="foto-480.jpg 480w, foto-800.jpg 800w, foto-1200.jpg 1200w"
		sizes="(max-width: 768px) 100vw, 50vw"
		alt="Descripción de la imagen"
		loading="lazy"
		width="1200"
		height="800" />
</picture>
```

El navegador recorre las fuentes de arriba a abajo. Si soporta AVIF, usa la primera. Si no, prueba con WebP. Y si tampoco, recurre al JPEG del `<img>`. Todo esto ocurre de forma transparente para el usuario.

El atributo `srcset` con descriptores de ancho (`480w`, `800w`, `1200w`) permite al navegador elegir la resolución más adecuada según el tamaño de la pantalla y la densidad de píxeles. Combinado con `sizes`, que indica cuánto espacio ocupa la imagen en el diseño, el navegador puede tomar decisiones muy inteligentes sobre qué versión descargar.

## El fin de la transformación en tiempo real

Hasta hace poco, la forma más habitual de servir imágenes optimizadas era usar un servicio de transformación en tiempo real. Servicios como Cloudinary, Imgix o Bunny Optimizer reciben la imagen original y generan sobre la marcha la versión que necesitas: le pasas parámetros en la URL (ancho, calidad, formato) y el servicio devuelve la imagen transformada.

```
https://cdn.ejemplo.com/foto.jpg?width=800&quality=75&format=webp
```

Este modelo tiene ventajas evidentes: no necesitas generar las variantes tú mismo, el servicio se encarga de la negociación de formato y puedes cambiar los parámetros sin tocar el código. Pero también tiene inconvenientes que se han ido haciendo más visibles con el tiempo.

### Los problemas de la transformación en tiempo real

**Coste.** Estos servicios cobran por transformación o por ancho de banda. En un sitio con mucho tráfico o muchas imágenes, la factura puede crecer rápido. Y lo que es peor: cada vez que el caché se invalida, las transformaciones se repiten.

**Latencia en el primer acceso.** La primera vez que se solicita una variante concreta, el servicio tiene que generarla. Esto introduce una latencia adicional que puede ser perceptible, especialmente en imágenes grandes o en momentos de tráfico alto.

**Dependencia de terceros.** Si el servicio tiene una caída, tus imágenes desaparecen. Si cambia sus precios o sus condiciones, estás atado. Si decide discontinuar una funcionalidad, tienes que adaptar tu código.

**Formatos limitados.** No todos los servicios soportan AVIF o lo soportan con la misma calidad. Algunos generan AVIF con artefactos visibles o con tiempos de codificación que penalizan la primera carga.

### La alternativa: variantes pregeneradas

La tendencia en 2026 es generar todas las variantes de cada imagen durante el proceso de build o de subida, no en el momento de la petición. Es decir, cuando subes una foto a tu proyecto, un script genera automáticamente las versiones necesarias:

```
foto-480.jpg    foto-480.webp    foto-480.avif
foto-800.jpg    foto-800.webp    foto-800.avif
foto-1200.jpg   foto-1200.webp   foto-1200.avif
foto-1920.jpg   foto-1920.webp   foto-1920.avif
```

<br/>
Estas variantes se suben a un CDN estático (como Cloudflare R2, Bunny Storage, Amazon S3 o cualquier otro) y se sirven directamente, sin procesamiento intermedio. El navegador, mediante el elemento `<picture>`, elige la versión adecuada.

Las ventajas son claras:

- **Sin latencia de generación.** Todas las variantes ya existen. La primera visita es tan rápida como la centésima.
- **Sin costes por transformación.** Solo pagas almacenamiento y ancho de banda, que en un CDN estático es mucho más barato.
- **Sin dependencia de servicios externos.** Tus imágenes son archivos estáticos. Si mañana cambias de CDN, solo tienes que copiarlos.
- **Control total sobre la calidad.** Tú decides los parámetros de compresión de cada formato. Puedes afinar la calidad de AVIF sin depender de lo que un servicio de terceros considere "calidad 75".

El inconveniente es que necesitas un proceso automatizado para generar las variantes. Pero con herramientas como Sharp (para Node.js), libvips, o servicios de CI/CD que ejecutan un script en cada despliegue, esto es trivial de configurar.

## Tamaños responsivos: cuántas variantes generar

No tiene sentido generar una variante para cada píxel posible. La clave es elegir un conjunto de anchos que cubra los escenarios reales de uso. Un conjunto razonable para la mayoría de webs es:

- **480px** — Móviles en orientación vertical.
- **800px** — Tablets y móviles en horizontal.
- **1200px** — Portátiles y pantallas de escritorio estándar.
- **1920px** — Pantallas grandes y retina.

Con cuatro tamaños en tres formatos, cada imagen genera 12 variantes. Si añades una versión diminuta de 16 píxeles para usar como placeholder de baja calidad (LQIP), son 13. Parece mucho, pero el peso total de las 12 variantes suele ser menor que el de una sola imagen JPEG sin optimizar.

## LQIP: la percepción importa tanto como la velocidad

Hay una técnica que complementa perfectamente la optimización de formatos: LQIP, o _Low Quality Image Placeholder_. La idea es mostrar una versión extremadamente pequeña y borrosa de la imagen mientras se carga la versión definitiva. Cuando la imagen real termina de descargarse, sustituye al placeholder con una transición suave.

El efecto es sutil pero potente. En lugar de ver un hueco vacío o un salto brusco cuando la imagen aparece, el usuario percibe que el contenido "ya estaba ahí" y simplemente se enfoca. Es la misma técnica que usan plataformas como Medium o Pinterest.

La implementación es sencilla: se genera una versión de la imagen a 16 o 20 píxeles de ancho, se codifica en base64 y se incrusta directamente en el HTML como imagen de fondo. Al pesar solo unos pocos bytes, no añade prácticamente nada al peso de la página y se renderiza instantáneamente.

```html
<div
	class="lqip-wrap"
	style="background-image:url('data:image/jpeg;base64,...')">
	<picture>
		<!-- fuentes AVIF, WebP y JPEG -->
		<img
			src="foto-1200.jpg"
			loading="lazy"
			onload="this.parentNode.parentNode.classList.add('loaded')" />
	</picture>
</div>
```

Con unas pocas líneas de CSS, la transición de borroso a nítido se convierte en una experiencia visual agradable:

```css
.lqip-wrap > picture > img {
	opacity: 0;
	transition: opacity 0.4s ease;
}
.lqip-wrap.loaded > picture > img {
	opacity: 1;
}
```

## El impacto en sostenibilidad

Cada kilobyte que se deja de transmitir es energía que no se consume. En un servidor, en la red de transporte y en el dispositivo del usuario. Puede parecer insignificante a nivel individual, pero a escala web el impacto es real.

Según el HTTP Archive, la mediana de peso de imágenes por página en 2026 es de 1,1 MB. Si la adopción de AVIF con variantes pregeneradas redujera ese peso a la mitad, estaríamos hablando de ahorrar cientos de terabytes de transferencia diaria a nivel global. Eso se traduce en menos energía, menos emisiones y menos carga en la infraestructura de red.

No es solo una cuestión técnica o de rendimiento. Es una decisión de diseño que tiene consecuencias ambientales tangibles.

## Qué debería hacer tu web hoy

Si tu web todavía sirve imágenes solo en JPEG o PNG sin optimizar, estos son los pasos prácticos para ponerte al día:

1. **Genera variantes en AVIF, WebP y JPEG** para cada imagen, en los tamaños que tu diseño necesite. Herramientas como Sharp o Squoosh pueden automatizarlo.

2. **Usa el elemento `<picture>`** para que cada navegador reciba el formato más eficiente que soporte.

3. **Implementa LQIP** para mejorar la percepción de velocidad mientras las imágenes cargan.

4. **Sirve desde un CDN estático** en lugar de depender de servicios de transformación en tiempo real. Es más barato, más rápido y más fiable.

5. **Mide el impacto.** Compara el peso de tu página antes y después con herramientas como WebPageTest o Lighthouse. La diferencia suele ser dramática.

La optimización de imágenes no es un tema nuevo, pero las herramientas y los formatos disponibles en 2026 hacen que sea más fácil que nunca hacerlo bien. La combinación de AVIF, WebP, variantes pregeneradas y el elemento `<picture>` es el estándar actual. Y si además añades LQIP, la experiencia de carga de tu web dará un salto cualitativo que tus usuarios notarán aunque no sepan explicar por qué.
