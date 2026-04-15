---
title: "Cambiar de herramienta sin cambiar de filosofía: de Eleventy a Lume 3"
alt: Dos puentes paralelos sobre un mismo valle conectando la misma orilla, simbolizando el cambio de generador estático manteniendo el destino
date: 2026-04-15
heroImage: idenautas-web/blog/158.png
description: "Durante tres años construí este sitio con Eleventy y estaba contento. En abril de 2026 lo he reconstruido entero sobre Lume 3 y Vento. Este es el relato honesto de por qué, qué he cambiado, qué he conservado y qué aprendí sobre migraciones que, en realidad, no lo son tanto."
tags: ["desarrollo-tecnico"]
# El cuerpo contiene ejemplos literales de sintaxis Vento ({{ … }}) dentro de
# bloques de código. Deshabilitamos el motor Vento para este archivo para que
# no intente ejecutar esos ejemplos como expresiones reales; el layout sigue
# procesándose con Vento como siempre.
templateEngine: md
---

Hace ya unos años publiqué en este mismo blog [un artículo titulado «Abrazando el Jamstack en Idenautas»](/blog/abrazando-el-jamstack-en-idenautas/). Contaba cómo había elegido Eleventy para reconstruir mi web, por qué me parecía una herramienta honesta y qué esperaba de ella. No era un post promocional: era el diario de una decisión tomada después de mirar bastantes alternativas y descartar casi todas por exceso de complejidad.

Hoy estás leyendo este artículo en un sitio que ya no se construye con Eleventy. Lo he rehecho entero con [Lume 3](https://lume.land/), un generador estático distinto, escrito en Deno, que nació inspirado precisamente en Eleventy. Y antes de que alguien piense que he caído en la rueda eterna de cambiar de herramienta por el gusto de cambiar, voy a contar la historia como fue: por qué lo hice, qué he conservado y qué he aprendido por el camino.

## La pregunta incómoda: ¿por qué cambiar algo que funciona?

Esta es la pregunta que cualquier persona sensata hace antes de aprobar una migración. Y la respuesta honesta, en mi caso, empieza por reconocer algo: **Eleventy no tenía ningún problema**. En la versión 3 está mejor que nunca, es estable, tiene una comunidad viva y sigue siendo una de las opciones más razonables del ecosistema. Si alguien me pregunta mañana qué usar para un proyecto nuevo, Eleventy va a seguir estando entre mis primeras recomendaciones.

Entonces, ¿por qué? La respuesta corta es que mis razones no son técnicas en el sentido en que normalmente se entiende. Son razones de ajuste: **Lume encajaba un poco mejor con cómo trabajo ahora**. Y cuando una herramienta encaja mejor, el día a día se vuelve más silencioso, que es uno de los mejores cumplidos que se le pueden hacer a una tecnología.

Los motivos concretos, si hay que enumerarlos, son cuatro:

1. **Deno nativo, sin ecosistema Node encima.** Llevaba tiempo mirando Deno con curiosidad. Es un runtime que aprendió de los errores del Node.js de 2009: seguridad por defecto, TypeScript sin configurar, módulos por URL, dependencias explícitas. Para un sitio donde la cadena de herramientas se ejecuta exclusivamente en mi máquina y en un script de despliegue, Deno me resulta simplemente más limpio.

2. **Menos dependencias transitorias.** La carpeta `node_modules` de un proyecto Eleventy con un par de plugins acaba teniendo cientos de paquetes. La mayoría nunca los había mirado. Con Lume, las dependencias son explícitas y pocas. No es una cuestión de pureza ideológica: es que cada dependencia es una superficie de ataque, una fuente potencial de incompatibilidades y un cambio que puede romperte el build un viernes por la tarde.

3. **Vento en lugar de Nunjucks.** Este es el que más pesó. Lo explico un par de secciones más abajo, porque merece su propio apartado.

4. **Un motivo algo menos racional pero real: es una herramienta española.** Lume la desarrolla [Óscar Otero](https://oscarotero.com/), un programador gallego con años de recorrido en el software libre. En un mundo donde casi todas las herramientas que uso cada día vienen de Silicon Valley, encontrarme con una que se construye desde aquí, en mi idioma y con la sensibilidad de quien trabaja el código como oficio, me produce un punto de orgullo patrio que no voy a fingir que no existe. No es un criterio que justifique una decisión técnica por sí solo, pero cuando lo que queda tras poner todo en la balanza es un empate, el orgullo de apoyar lo que se hace cerca inclina el plato.

No cambié porque Eleventy me decepcionara. Cambié porque apareció algo que, manteniéndose dentro de la misma familia de ideas, quitaba unas cuantas aristas que llevaba tiempo notando. Es una diferencia importante.

## Lume: Eleventy visto desde Deno

Para quien no lo conozca, conviene situar a Lume. Es un generador de sitios estáticos escrito por Óscar Otero, que ya he mencionado arriba. Lume nació en 2021 y su influencia declarada es, precisamente, Eleventy: la misma idea de procesar archivos del disco y generar HTML estático, sin opinión sobre el framework de frontend que uses, respetando los estándares y sin imponer una ideología de componentes JavaScript por todas partes.

La diferencia fundamental es el runtime. Mientras Eleventy vive dentro del ecosistema Node, Lume vive dentro del ecosistema Deno. Eso tiene consecuencias prácticas:

- **No hay `package.json` ni `node_modules`** en el sentido tradicional. Las dependencias se declaran en `deno.json` y se resuelven por URL.
- **TypeScript es ciudadano de primera clase.** No hay que configurar nada para usarlo: abres un archivo `.ts`, lo ejecutas y funciona.
- **Los permisos son explícitos.** Deno no deja a un script leer archivos, escribir en disco o hacer peticiones HTTP salvo que tú se lo autorices al ejecutarlo. En un script de despliegue, esta garantía tiene valor.

Pero más allá del runtime, Lume comparte con Eleventy la virtud más importante: **no se interpone entre el autor y el HTML final**. Lees archivos Markdown o plantillas, les pasas unos datos, obtienes HTML. Sin hidratación, sin componentes que ocultan lo que está pasando, sin build steps opacos que cada tantos meses deciden romperse por un cambio en la cadena de herramientas.

Cuando lees la documentación de Lume por primera vez, la sensación es familiar: reconoces las ideas que ya te gustaban en Eleventy, pero traducidas a un vocabulario un poco más consistente.

## Vento, o el adiós a Nunjucks

Si solo tuviera que elegir un motivo por el que la migración merecía la pena, sería Vento.

Durante los tres años que estuve en Eleventy, las plantillas las escribía en [Nunjucks](https://mozilla.github.io/nunjucks/), un lenguaje de plantillas heredero espiritual de Jinja2. Nunjucks funciona. Es maduro, está bien documentado y cubre todo lo que un sitio estático necesita. Pero también tiene aristas propias de un diseño de hace más de una década: una sintaxis con dos dialectos (`{% %}` para bloques, `{{ }}` para expresiones), un sistema de filtros con sus propias reglas, y una gestión del asincronismo que nunca fue su punto fuerte.

[Vento](https://vento.js.org/) es otra cosa. Lo escribe el mismo autor que Lume, y eso se nota en que ambas herramientas comparten filosofía. Los rasgos que más me gustaron:

- **Un único delimitador.** En Vento, todo va dentro de `{{ }}`: los bucles, los condicionales, las expresiones, los includes. Desaparece la dualidad `{% %}`/`{{ }}`.

- **Async nativo.** Puedes hacer `{{ await fetch(...) }}` dentro de una plantilla, y funciona. No es un truco: es una característica fundamental del motor. Para mí, que genero los placeholders de baja calidad de las imágenes (LQIP) descargándolos del CDN durante el build, esto simplifica mucho el código.

- **Expresiones JavaScript de verdad.** En Nunjucks tenía que registrar filtros personalizados para cosas triviales como «ordena este array por un campo». En Vento, escribes `array.sort((a, b) => a.order - b.order)` dentro de la plantilla y ya está. Cada función utilitaria que desaparece es un trozo menos de configuración que mantener.

- **No escapa por defecto.** Este punto es delicado y hay que conocerlo antes de adoptarlo. En Nunjucks, todo lo que imprimes se escapa automáticamente (por seguridad), y tienes que añadir `| safe` cuando quieres HTML crudo. Vento hace lo contrario: por defecto no escapa, y tú añades `|> escape` donde haga falta. Para un sitio estático cuyo contenido viene exclusivamente de quien lo edita, el cambio no introduce riesgos nuevos, pero obliga a pensar. Si alguna vez metes entradas de formulario en una plantilla Vento, conviene que las escapes.

El resultado, cuando comparas ambas plantillas lado a lado, es que la versión Vento suele ser entre un 10 y un 20 por ciento más corta y bastante más fácil de seguir. No es una diferencia que justifique una migración por sí sola, pero sumada al resto, pesa.

## Lo que cambió bajo el capó

La parte técnica, resumida para quien sienta curiosidad:

- **Generador estático**: Eleventy 3 → Lume 3.
- **Runtime**: Node.js → Deno.
- **Motor de plantillas**: Nunjucks → Vento.
- **Gestor de paquetes**: npm → dependencias por URL en `deno.json`.
- **Minificación CSS**: clean-css → lightningcss (sorprendentemente más rápido y un poco más agresivo).
- **Minificación JS**: Terser, idéntico en ambos mundos.
- **Generación de LQIP**: script standalone en Node → módulo en Deno integrado como hook `beforeBuild`.
- **Despliegue**: el script de publicación a Bunny CDN reescrito en Deno, aprovechando que `fetch` es nativo y no hace falta ninguna librería HTTP.

El código fuente del sitio tiene prácticamente el mismo tamaño que antes. La diferencia está en que ahora abro el proyecto, escribo `deno task build`, y en menos de quince segundos tengo el sitio listo. No hay paso intermedio de instalar dependencias, ni versiones de Node que gestionar, ni caches raras que limpiar.

## Lo que no cambió

Y aquí está la parte que me parece la más importante del relato. Porque en realidad, **no he cambiado nada esencial**. El sitio sigue siendo:

- **Estático.** Cero bases de datos, cero PHP, cero servidores de aplicación. HTML, CSS y un poco de JavaScript servidos desde una CDN.
- **Rápido por diseño.** El CSS va embebido en `<head>`, las imágenes son responsive con tres formatos (AVIF, WebP, JPG) y tres o cuatro anchos cada una, los scripts son mínimos.
- **Sostenible.** Misma filosofía que conté en [«Tu web contamina»](/blog/tu-web-contamina-como-reducir-su-huella-de-carbono-y-de-paso-hacerla-mas-rapida/): menos bytes viajando por la red, menos CPU ejecutando JavaScript en el dispositivo del visitante, menos energía.
- **Propiedad del autor.** Los artículos siguen siendo archivos Markdown en un repositorio Git. Si mañana Lume dejara de mantenerse, podría migrar a otro generador sin perder una coma de contenido.

Ese último punto es el que más me reconcilia con el ejercicio de cambiar de herramienta. Cuando tu contenido vive en formatos abiertos y en un repositorio que tú controlas, cambiar el generador estático es una operación reversible. No te casas con nadie. No pierdes datos. Pones unas horas de trabajo, un poco de pensamiento, y el resultado final es el mismo sitio con un motor ligeramente distinto.

Este es, en el fondo, el argumento más sólido a favor del Jamstack: **no estás atrapado**. Intenta hacer lo mismo con un WordPress de hace cinco años lleno de plugins y un constructor visual propietario.

## Las dos trampas que encontré

Ninguna migración sale perfecta a la primera. Dejo anotadas aquí las dos cosas que más tiempo me costaron, por si le sirven a alguien que esté planteándose un movimiento parecido.

**La primera fue la convivencia entre Vento y Markdown.** En Lume, cuando un archivo `.md` contiene shortcodes o expresiones de plantilla, hay que decirle al motor explícitamente que lo pase primero por Vento y luego por markdown-it. Se hace con una directiva `templateEngine: [vto, md]`. Hasta que no la añadí, los shortcodes aparecían literales en el HTML final, como si nadie los estuviera interpretando. Es un detalle que se explica en la documentación, pero si vienes de Eleventy (donde mezclar motores es el comportamiento por defecto), no lo esperas.

**La segunda fue el slugify.** Eleventy usa por defecto la librería `@sindresorhus/slugify`, que tiene algunas reglas de transliteración específicas para caracteres no latinos. Por ejemplo, convierte la letra `ü` en `ue`, al estilo alemán. Mi slugify casero (una función pequeña en el archivo de configuración) hacía una normalización Unicode genérica y simplemente eliminaba el acento, dejando una `u` pelada. El resultado fue que un artículo sobre sitios multilingües aparecía con una URL ligeramente distinta en Lume que en Eleventy. Una letra de diferencia, pero suficiente para romper un enlace existente. Me di cuenta comparando los archivos generados por ambos builds uno al lado del otro, y lo arreglé añadiendo manualmente las transliteraciones de las letras germánicas más comunes.

Ambas trampas tienen algo en común: son casos en los que **Lume hace algo sutilmente distinto a Eleventy** sin avisar explícitamente. Si haces una migración en la que necesitas que las URLs se mantengan idénticas, dedica un rato a comparar los dos builds archivo por archivo antes de dar nada por bueno.

## ¿Deberías migrar tú?

Probablemente no. Y esto no es falsa humildad.

Si tienes un sitio funcionando bien en Eleventy, la respuesta sincera es que **migrar a Lume es un trabajo considerable para un beneficio modesto**. Vas a tener que reescribir las plantillas (Nunjucks y Vento no son intercambiables), revisar los scripts de build, comprobar que las URLs no se rompen, y aprender las convenciones de Lume. Son unas cuantas horas que podrías dedicar a cosas más productivas, como escribir contenido nuevo o mejorar el diseño.

Tiene sentido migrar si:

- Ya estás usando Deno en otras partes del proyecto y te molesta mantener dos runtimes.
- Tu stack actual se ha vuelto frágil por acumulación de dependencias Node y quieres simplificar.
- Vas a arrancar un sitio nuevo y estás eligiendo entre ambos, en cuyo caso Lume es una alternativa perfectamente legítima a Eleventy.
- Te interesa Vento por razones concretas (async, JavaScript inline, plantillas más cortas) y valoras ese beneficio.

No tiene sentido migrar si:

- Tu sitio funciona, conoces Eleventy, y no hay nada del día a día que te esté haciendo sufrir.
- La única razón es que Lume parece más moderno en el ecosistema. Ese criterio te lleva a cambiar de herramienta cada seis meses.

Yo estaba en el primer grupo por casualidad: había empezado a usar Deno en otros proyectos y la asimetría de mantener Node solo para este sitio empezaba a pesar. Sumado al encaje con Vento y a la simplicidad del despliegue, salió rentable. Pero la decisión estuvo más cerca de lo que parece. Si Eleventy hubiera seguido siendo la herramienta mejor integrada en mi entorno, habría seguido usándola tranquilamente.

## La moraleja

La moraleja de esta migración, si hay una, es que **la filosofía pesa más que la herramienta**. Llevo años defendiendo ciertas ideas sobre cómo debería construirse una web: que sea rápida, que no dependa de servidores de aplicación, que no te ate a un proveedor, que el contenido viva en formatos abiertos y que el código sea legible para cualquiera dentro de seis meses. Esas ideas las podía sostener con Eleventy y las sigo sosteniendo con Lume. Cambié la herramienta porque Lume encajaba un poco mejor ahora mismo, pero no cambié lo que creo que una web debería ser.

Si estás en un momento de decidir qué generador estático usar para tu próximo proyecto, mi recomendación es la misma de siempre: **elige la herramienta que desaparezca en el día a día**, que no te obligue a pelearte con ella, y que te deje poner la atención en el contenido y en quienes lo van a leer. Eleventy cumple esa descripción. Lume también. El mundo está lleno de opciones peores.

Y si tienes curiosidad por ver cómo se ve este sitio por dentro, el código es abierto. Está todo ahí: la configuración de Lume, las plantillas en Vento, el script de despliegue. La migración completa está documentada en dos commits, por si alguien quiere seguir la cronología exacta de cómo se pasa de un generador al otro sin romper una sola URL por el camino.
