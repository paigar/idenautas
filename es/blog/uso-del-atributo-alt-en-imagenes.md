---
titulo: Uso del atributo <b>alt</b> en imágenes
uuid: cce3a117-a0a8-42d0-aab6-4c48f965bf2c
alt: Imagen de un paisaje imaginario, con las montañas reflejándose en un gran lago
date: 2023-02-06
description: Aunque es importante saber que el atributo "alt" puede ser beneficioso en términos de accesibilidad... ¿cuál es la forma correcta de usarlo?
---

Hoy en día, todo el mundo en la industria del diseño web sabe lo importante que es la accesibilidad. Se habla de ello constantemente y se insta a los clientes a tomarlo en serio. Es indudable el impacto que tiene en la web y en aquellos que la utilizan.

Sin embargo, a veces se pierden los puntos más importantes. Por ejemplo, a menudo se escuchan consejos insistentes diciendo "¡Usa texto alternativo en tus imágenes!". **Es un buen consejo** y bien intencionado, pero también es un poco vago.

Aunque es importante saber que el atributo "alt" puede ser beneficioso en términos de accesibilidad, lo que realmente necesitamos es contexto. **¿Cuál es la forma correcta de usarlo?** **¿Hay momentos en los que no debemos usarlo?**

En realidad estas preguntas no tienen una respuesta clara ni unánime entra las comunidades de desarrolladores web. Y soy muy consciente de que no soy el único que intenta construir sitios web que sean correctos para los usuarios, pero que en muchas ocasiones no lo consigo o me quedo a medio gas.

Hoy, vamos a intentar aclarar el uso adecuado de este atributo. ¡Empecemos!

## El papel cambiante de las imágenes

La forma en que los diseñadores web utilizan las imágenes ha cambiado bastante a lo largo de los años. En los primeros días de la web, se utilizaban las imágenes de maneras que probablemente no consideraríamos hacer ahora. Las utilizábamos como títulos de página, sistemas de navegación e incluso páginas enteras llenas de contenido.

Para los usuarios que dependen de lectores de pantalla u otras tecnologías de asistencia, esto podía hacer que una página fuera inutilizable. En los casos en que se mostraban grandes porciones de contenido como una imagen, incluso un simple atributo "alt" no iba a ser de mucha ayuda.

Afortunadamente, se han aprendido algunas lecciones importantes. La explosión de la tipografía web ha eliminado cualquier razón de diseño para mal utilizar imágenes como en el pasado.

Y como la accesibilidad ha cobrado importancia, muchos ahora se dan cuenta de que las imágenes tienen roles específicos que desempeñar.

## La importancia del texto alternativo

Es lógico que un uso más inteligente de las imágenes debería resultar en una mejor accesibilidad. Si bien eso es correcto hasta cierto punto, aún tenemos la capacidad de estropear las cosas. Aquí es donde el texto alternativo puede entrar y salvar el día, si se usa correctamente.

Recordar usar el atributo "alt" por sí solo no necesariamente proporciona muchos beneficios a los usuarios. Por ejemplo, digamos que tenemos una etiqueta de encabezado que dice "Sobre nosotros". Debajo de eso hay una foto grupal de empleados de la empresa. Si simplemente establecemos el atributo "alt" en "Sobre nosotros", se vuelve redundante cuando lo leen las tecnologías de asistencia. Por lo tanto, realmente no les dice a los usuarios qué es la imagen ni lo que significa.

Entonces, ¿qué deberíamos usar en su lugar? Esto depende mucho del contenido de la página en sí y del papel de la imagen dentro de ella. Sin embargo, esto plantea otro punto de confusión potencial:

**¿Que tipos de imágenes utilizamos en nuestros sitios web?** Podríamos desglosarlas en varias tipologías:

- **Informativas**: son aquellas que proveen información importante para el usuario. Por ejemplo, una imagen que muestre el mapa de un edificio o de un campus universitario.

- **Decorativas**: son aquellas que no añaden información, sino que se utilizan con fines estéticos. Por ejemplo, una imagen que se use como fondo de pantalla en la página web.

- **Funcionales**: son aquellas que cumplen una función específica, como botones o iconos.

- **Imágenes de texto**: son aquellas que contienen texto que es parte integral del contenido. Por ejemplo, una imagen que contenga una cita o un fragmento de un libro.

- **Complejas**: son aquellas que contienen muchos elementos y pueden ser difíciles de describir con pocas palabras.

- **Grupos de imágenes**: son aquellas que se agrupan juntas para formar una sola imagen. Por ejemplo, una imagen que muestre varias fotografías de un evento.

- **Mapas de imágenes**: son aquellas que se utilizan como mapa interactivo de una página web. Por ejemplo, una imagen que muestre la distribución geográfica de una empresa.

Creo que queda clara la dificultad que vamos a tener en muchos casos para encontrar un texto alternativo adecuado a esas imágenes.

## ¿No siempre es necesario el atributo alt?

Uno de los puntos más interesantes que debemos concluir es que **no todas las imágenes necesitan atributos alt**.

Pero, espera un momento. ¿Qué pasa con todos esos consejos para usar alt cada vez que insertamos una imagen? ¿No estamos ignorando la accesibilidad?

Resulta que, en el caso de las imágenes decorativas (que no añaden ninguna información a la página), el atributo alt se vuelve innecesario. En estas situaciones, proporcionar texto alternativo puede "añadir desorden audible a la salida del lector de pantalla". Por lo tanto, al igual que la falta de espacio en blanco puede llevar a un diseño visual desordenado de la página, este texto extra puede hacer lo mismo para aquellos que dependen de estas herramientas.

Lo que hace que esto sea difícil para los diseñadores web es que las herramientas de accesibilidad automatizadas como WAVE identifican las imágenes sin texto alternativo mientras leen una página. Incluso Google puede enviar correos electrónicos molestos quejándose de que una imagen en particular no es accesible en su vista. Esto nos obliga a completar el atributo, **solo para pasar una prueba automatizada**. Por lo tanto, depende de nosotros tomar estos como meras recomendaciones y, cuando sea necesario, explicar la situación a los clientes: "_Resulta que un atributo alt vacío puede ser beneficioso en circunstancias específicas_".

## El objetivo es ayudar a los usuarios

Al profundizar sobre el uso del atributo alt, me he dado cuenta de que a menudo he tomado el enfoque equivocado. Sospecho que a muchos otros desarrolladores les ha pasado lo mismo. Hasta cierto punto, es comprensible. Este atributo, aunque ha existido durante mucho tiempo, no es exactamente divertido. Es utilitario y no siempre lo tenemos en cuenta.

Sin embargo, para muchos usuarios, es **vitalmente** importante
