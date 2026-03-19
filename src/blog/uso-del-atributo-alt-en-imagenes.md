---
title: Uso del atributo alt en imágenes
alt: Imagen de un paisaje imaginario, con las montañas reflejándose en un gran lago
date: 2023-02-06
heroImage: idenautas-web/blog/029.png
description: Aunque es importante saber que el atributo "alt" puede ser beneficioso en términos de accesibilidad... ¿cuál es la forma correcta de usarlo?
tags: ["experiencia-de-usuario"]
---

En el mundo del diseño web, todo el mundo sabe que hay que usar el atributo `alt` en las imágenes. El problema es que "usarlo" y "usarlo bien" son cosas bastante distintas, y la diferencia importa.

El consejo de "pon texto alternativo en tus imágenes" es bienintencionado pero incompleto. Sin contexto sobre qué tipo de imagen es y cuál es su función, rellenar el `alt` a ciegas puede resultar en algo tan inútil como no ponerlo, o directamente en algo que empeora la experiencia para los usuarios que más necesitan ese atributo.

## Para quién existe el atributo alt

El texto alternativo existe principalmente para las tecnologías de asistencia, en especial los lectores de pantalla que usan personas con discapacidad visual. Cuando un lector de pantalla encuentra una imagen con un `alt` bien escrito, puede comunicar al usuario qué hay en esa imagen y por qué está ahí. Sin `alt`, o con un `alt` inútil, el usuario pierde esa información.

También tiene un papel secundario en SEO —los motores de búsqueda lo usan para entender las imágenes— y aparece como texto visible cuando la imagen no carga, lo que puede ser relevante en conexiones lentas.

## El papel de la imagen determina el texto alternativo

La forma en que los diseñadores web usan las imágenes ha cambiado mucho. Ya no se usan como sustituto del texto o como herramienta de maquetación. Pero incluso hoy, las imágenes que aparecen en una web tienen roles muy diferentes, y el `alt` correcto depende de cuál sea ese rol.

**Imágenes informativas** transmiten información que no está expresada de otra forma en la página. Por ejemplo, una fotografía de un producto, un gráfico que muestra datos, o la foto del equipo en la página de empresa. Aquí el `alt` debe describir lo que la imagen muestra y, cuando sea relevante, por qué está ahí. No es necesario empezar con "imagen de..." porque el lector de pantalla ya anuncia que es una imagen.

**Imágenes decorativas** no añaden información: están por razones estéticas. Un fondo, una textura, una ilustración genérica que simplemente hace la página más visual. En este caso, el `alt` correcto es... vacío. Literalmente: `alt=""`. Esto indica al lector de pantalla que ignore la imagen, evitando interrumpir el flujo de lectura con una descripción irrelevante.

**Imágenes funcionales** son las que actúan como botones o enlaces. Si un icono de lupa sirve para lanzar una búsqueda, su `alt` debería ser "Buscar", no una descripción visual del icono. El texto alternativo debe describir la función, no el aspecto.

**Imágenes de texto** contienen palabras que forman parte del contenido, como una cita en formato imagen o un logotipo con eslogan. El `alt` debe reproducir exactamente el texto que aparece en la imagen.

**Imágenes complejas** como gráficos, diagramas o mapas necesitan una descripción más elaborada. A veces el `alt` no es suficiente y hay que añadir una descripción larga en el propio contenido de la página o mediante el atributo `longdesc`.

## El problema con las herramientas automatizadas

Las herramientas de auditoría de accesibilidad como WAVE marcan automáticamente las imágenes sin `alt` como errores. Google Search Console puede alertar sobre imágenes que considera inaccesibles. Esto lleva a muchos desarrolladores a rellenar todos los `alt` para "pasar la prueba", a veces con descripciones genéricas o incluso con el nombre del archivo.

El resultado puede ser peor que el problema original. Imagina una página con doce imágenes decorativas, todas con un `alt` descriptivo: el usuario que navega con lector de pantalla tiene que escuchar doce descripciones de imágenes que no añaden nada al contenido. Es lo equivalente a poner espacios en blanco de colores en un diseño visual para que parezca relleno.

Un `alt` vacío en una imagen decorativa no es un error: es la opción correcta. Y explicar eso a un cliente que pregunta por qué "hay imágenes sin texto alternativo" es parte del trabajo.

## La prueba que funciona

Antes de escribir el texto alternativo de cualquier imagen, hacerse esta pregunta ayuda: si esta imagen no pudiera mostrarse y solo quedara su descripción, ¿cambiaría algo en la comprensión del contenido? Si la respuesta es sí, necesita un `alt` descriptivo. Si la respuesta es no, mejor dejarlo vacío.

---

El atributo `alt` es pequeño y lleva décadas en la especificación HTML. Pero usarlo con criterio requiere pensar en los usuarios reales que dependen de él: personas con discapacidad visual que navegan la web todos los días y para quienes la diferencia entre un `alt` bien escrito y uno descuidado puede ser la diferencia entre una página útil y una ininteligible.
