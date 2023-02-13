---
titulo: Páginas de scroll infinito vs <b>paginación</b>
uuid: 0ed3226a-323e-4476-a87c-87b03e09e343
date: 2023-02-03
description: Una página de scroll infinito es un tipo de diseño de página web en el que el contenido se carga y se muestra automáticamente a medida que el usuario desplaza hacia abajo en la página.
---

Si has echado un vistazo a este blog ya podrás imaginar mi respuesta a la hora de elegir una página de scroll infinito o separar un índice largo (como el de este blog) en varias páginas diferenciadas. Pero vamos a analizar con un poco de detalle los motivos para tomar una decisión.

## Qué es el scroll infinito

Una página de scroll infinito es un tipo de diseño de página web en el que el contenido se carga y se muestra automáticamente a medida que el usuario desplaza hacia abajo en la página. En lugar de tener una barra de desplazamiento o un botón de "cargar más" tradicional, la página continúa cargando nuevos contenidos a medida que el usuario desplaza hacia abajo en la página. Este tipo de diseño se utiliza a menudo en aplicaciones móviles y sitios web sociales para mejorar la experiencia de usuario y hacer que la exploración del contenido sea más fluida y sin interrupciones.

Es decir, el muro de Facebook puede ser el caso más conocido de página de scroll infinito.

A priori podemos considerar que el scroll infinito es el camino a seguir: presenta una forma más natural de navegar por el contenido, minimiza las interacciones del usuario con el sitio, los tiempos de carga suelen ser rápidos, podemos tener más contenido a la vista...

Pero la realidad es que (a no ser que estén muy bien construidos) los sitios de scroll infinito suelen terminar resultando lentos y consumiendo enormes cantidades de memoria de nuestros dispositivos. El motivo es fácil de entender: a medida que vamos añadiendo elementos al DOM (a las propia página web al hacer scroll) el tamaño del sitio va haciéndose cada vez más grande. Y toda esa información se almacena en la memoria para recuperarla cuando cambiemos la dirección del scroll.

Además, hay algunos problemas claros de usabilidad que aparecen con este tipo de sitios:

- **Resulta difícil llegar al pie de página**. Puede parece baladí, pero en muchas ocasiones nos interesa llegar al pie del sitio para acceder a los avisos legales, información de contacto, un menú secundario de navegación... Y si cada vez que hacemos scroll se ba añadiendo nuevo contenido al sitio, el pié de la página resulta inaccesible.

- **Es complicado localizar un contenido específico**: Como los contenidos se van añadiendo de forma dinámica, no podemos hacer uno de una búsqueda en la página hasta que no hayamos cargado el contenido que nos interesa, porque de otra forma no aparecerá (aún no existe). Y tampoco podremos tener un enlace directo a un contenido intermedio del sitio.

## Ventajas de la paginación tradicional

A pesar de poder parece una forma menos intuitiva de presentar la información, separar los contenidos de una determinada sección de nuestro sitio en diferentes páginas individuales nos proporciona una serie de ventajas que no debemos despreciar:

- **Control**: La paginación ofrece un mayor control sobre la experiencia de navegación, ya que los usuarios pueden ver claramente cuántas páginas hay y cuál es la página actual.

- **Navegación**: La paginación permite una navegación más clara y precisa, ya que los usuarios pueden ir directamente a la página que desean sin tener que desplazarse por una cantidad interminable de contenido.

- **Carga de la página**: La paginación puede mejorar la velocidad de carga de la página, ya que solo se carga una pequeña cantidad de contenido a la vez.

- **Optimización para motores de búsqueda**: La paginación puede ser más fácilmente indexada y optimizada por los motores de búsqueda, ya que cada página tiene una URL única.

Por lo tanto, aunque es menos "efectista" yo soy me considero un firme defensor de la paginación tradicional y de mostrar la información repartida en páginas sucesivas. Este blog es una muestra de ello.
