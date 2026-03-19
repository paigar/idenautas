---
title: Las animaciones al hacer scroll en una página web
alt: Pequeño dibujo animado con forma de monstruo, delante de un ordenador
date: 2023-02-25
heroImage: idenautas-web/blog/044.png
description: Cuando un usuario hace scroll en una página web, ciertos elementos en la página pueden animarse para agregar interactividad y atractivo visual.
tags: ["creatividad-e-innovacion", "experiencia-de-usuario"]
---

Las animaciones al hacer scroll se han convertido en uno de esos recursos que, bien usados, añaden vida a un diseño; mal usados, lo convierten en un espectáculo de circo. La diferencia entre uno y otro caso no está en la técnica sino en el criterio.

La idea de base es sencilla: conforme el usuario se desplaza por la página, ciertos elementos se activan, aparecen, se mueven o cambian. Eso puede ser un texto que aparece suavemente al entrar en el viewport, una imagen que hace parallax mientras te desplazas, o un gráfico que se construye conforme lees. Cuando está bien ejecutado, la animación refuerza el contenido y guía la atención. Cuando no lo está, distrae y molesta.

## Beneficios reales e inconvenientes concretos

El principal argumento a favor de estas animaciones es que hacen la navegación más dinámica e interesante. Rompen la monotonía de una página plana, ayudan a marcar el ritmo de la lectura y pueden destacar elementos que de otra forma pasarían desapercibidos.

Pero hay riesgos que conviene tener en cuenta antes de animar todo lo que se mueve. El primero y más obvio es el rendimiento: las animaciones mal optimizadas ralentizan la página, especialmente en dispositivos móviles o con conexiones lentas. Una página que tarda en cargar o que va a trompicones pierde todo el efecto visual que intentabas conseguir.

El segundo riesgo es la accesibilidad. Algunos usuarios tienen configurada en su sistema operativo la preferencia de reducir el movimiento, precisamente porque las animaciones intensas les generan molestias o mareos. Respetar esa preferencia mediante la media query `prefers-reduced-motion` no es un detalle opcional; es parte de hacer las cosas bien.

El tercero es simplemente el exceso. Un elemento que entra con animación tiene impacto. Veinte elementos que entran con animación crean caos. La sutileza casi siempre funciona mejor que la espectacularidad.

## Animaciones sincronizadas con el scroll

Una variante más sofisticada es la que vincula el progreso de la animación directamente a la posición del scroll: el elemento no se activa cuando entra en el viewport, sino que su estado depende de cuánto has bajado en la página. El efecto parallax es el ejemplo más conocido, pero puede aplicarse a cualquier propiedad CSS: opacidad, escala, posición, rotación.

Este tipo de animaciones tienen un gran potencial narrativo. Permiten construir experiencias donde la historia se va revelando conforme el usuario avanza, algo muy útil en páginas de producto o de presentación de marca. El coste está en la implementación: requieren más cuidado técnico para que no afecten al rendimiento.

## Las librerías que más se usan

Para no reinventar la rueda, hay varias librerías de JavaScript bien establecidas que facilitan enormemente el trabajo:

- **AOS (Animate On Scroll)**: probablemente la más popular para empezar. Fácil de implementar, muy personalizable mediante atributos en el HTML, y con un resultado limpio y profesional. Ideal para animaciones de entrada al viewport.
- **ScrollReveal**: similar a AOS en concepto, con una API algo más flexible. Buen equilibrio entre sencillez y opciones de configuración.
- **GSAP con ScrollTrigger**: para proyectos que requieren animaciones complejas y sincronización precisa con el scroll, GSAP es la referencia. Más curva de aprendizaje, pero resultados muy superiores cuando se domina.
- **ScrollMagic**: una opción potente para efectos avanzados, aunque en los últimos años ha perdido algo de tracción frente a GSAP.

La elección depende del proyecto. Para la mayoría de webs corporativas o de servicios, AOS o ScrollReveal son más que suficientes. Para una landing page o una web de producto donde el diseño es protagonista, GSAP da muchas más posibilidades.

---

Las animaciones al hacer scroll son una herramienta, no un objetivo. La pregunta que conviene hacerse antes de implementar cualquiera de ellas es siempre la misma: ¿esto le ayuda al usuario a entender o disfrutar mejor el contenido, o solo me parece chulo a mí? Si la respuesta honesta es la segunda, mejor dejarlo.
