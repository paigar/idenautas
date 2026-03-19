---
title: Uso de Tailwind CSS para el desarrollo web
alt: Ordenador mostrando una pagina web atractiva en la pantalla
date: 2023-02-28
heroImage: idenautas-web/blog/045.png
description: Tailwind CSS es un framework de diseño web de código abierto que proporciona un conjunto completo de clases CSS predefinidas que se pueden utilizar para construir interfaces de usuario personalizadas.
tags: ["desarrollo-tecnico"]
---

Tailwind CSS lleva unos años siendo el tema recurrente en las conversaciones de desarrolladores front-end. Hay quien lo ama sin reservas y quien lo encuentra absolutamente intolerable. Pocas herramientas generan opiniones tan contrapuestas. Y eso, en general, suele indicar que merece la pena entenderla bien.

La idea central de Tailwind es diferente a la de frameworks como Bootstrap o Foundation. En lugar de darte componentes predefinidos —un botón con su estilo, un modal con su comportamiento—, te da utilidades atómicas: clases que aplican una sola propiedad CSS. `text-center`, `mt-4`, `bg-blue-500`, `rounded-lg`. Construyes el diseño componiendo esas clases directamente en el HTML.

## Cómo surgió y por qué importa

Adam Wathan, su creador principal, venía trabajando con CSS de forma bastante ortodoxa cuando empezó a sentir que el modelo clásico —un archivo CSS separado con nombres de clases semánticos— no escalaba bien en proyectos grandes. La tentación de reutilizar nombres de clases para estilos ligeramente diferentes, la dificultad de mantener la especificidad bajo control, la acumulación de CSS muerto... problemas conocidos por cualquiera que haya trabajado en proyectos reales.

Tailwind propone lo contrario: que los estilos vivan en el HTML, cerca del marcado que modifican, y que cada clase haga exactamente una cosa. El resultado es un CSS de salida muy pequeño en producción —solo se generan las clases que realmente usas— y un HTML que, una vez que conoces las convenciones, cuenta su propio estilo de forma bastante explícita.

## Las ventajas reales en el día a día

La velocidad de prototipado es probablemente la ventaja más apreciada. No tienes que saltar entre el HTML y un archivo CSS, inventar nombres de clases ni preocuparte de si el estilo que necesitas ya existe o tienes que crearlo. Aplicar márgenes, colores y tipografía es inmediato.

La consistencia es otro punto fuerte. Tailwind usa por defecto una escala de espaciado y colores bien pensada que hace difícil acabar con valores arbitrarios (`margin: 13px`) diseminados por todo el proyecto. Si el sistema de diseño sigue la escala de Tailwind, la coherencia visual se mantiene casi sola.

La personalización es más potente de lo que parece desde fuera. El archivo `tailwind.config.js` permite redefinir colores, tipografías, breakpoints y prácticamente cualquier aspecto del sistema. Y las utilidades personalizadas que no existían en la librería se pueden añadir fácilmente.

## Los inconvenientes que nadie debería ignorar

El HTML con Tailwind puede volverse ruidoso. Un botón con varios estados hover, focus y responsive puede acumular quince o veinte clases en un solo elemento. Hay quien lo acepta como el coste del modelo y hay quien lo encuentra inaceptable. No es una cuestión de gusto: es una pregunta legítima sobre mantenibilidad.

La curva de aprendizaje existe aunque se subestime. Saber qué clase corresponde a qué propiedad CSS lleva tiempo. Las primeras semanas con Tailwind implican mucho ir y venir a la documentación. Pasado ese umbral, la velocidad aumenta considerablemente, pero hay que invertir ese tiempo.

La dependencia del HTML también es un punto de debate. Los puristas del CSS separado del marcado verán en Tailwind una regresión a los tiempos de los `style` inline. La respuesta habitual —que con componentes reutilizables el problema se mitiga— es razonable pero no elimina la objeción por completo.

## Tailwind frente a Bootstrap

La comparación más frecuente es con Bootstrap, y es justa. Son herramientas con filosofías distintas. Bootstrap te da componentes listos para usar: navbar, cards, modales, carruseles. Puedes montar una interfaz funcional en muy poco tiempo sin casi tocar CSS. El precio es que todos los proyectos con Bootstrap tienden a parecerse si no se personaliza a fondo.

Tailwind no tiene componentes de serie. Tienes que construirlos tú, pero con total libertad sobre el resultado. La interfaz final puede ser completamente única. El precio es que necesitas saber más de diseño y CSS para aprovechar bien la herramienta.

¿Cuál elegir? Depende del proyecto. Bootstrap tiene sentido cuando la velocidad es prioritaria y la originalidad visual es secundaria. Tailwind tiene sentido cuando el diseño es parte del producto y quieres control total sobre él.

## El estado actual y hacia dónde va

Tailwind es hoy uno de los frameworks CSS más usados en proyectos nuevos, especialmente en combinación con React, Vue o Astro. Su ecosistema ha crecido: Tailwind UI ofrece componentes de pago de alta calidad, y la integración con las herramientas de build modernas es prácticamente transparente.

La versión 4, que llegó a finales de 2024, apostó fuertemente por las variables CSS nativas y simplificó la configuración. Es una señal de que el proyecto sigue evolucionando hacia mayor integración con los estándares del navegador, no en dirección contraria.

---

Tailwind no es la respuesta correcta para todos los proyectos. Pero entender por qué ha tenido tanto éxito —y qué problemas resuelve de forma diferente— es útil independientemente de si acabas usándolo. A veces la herramienta que más polariza es la que más obliga a pensar en cómo y por qué hacemos las cosas.
