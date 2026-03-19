---
title: Consideraciones en el desarrollo de páginas web para personas mayores
alt: Hombre de edad avanzada usando un ordenador portátil
date: 2023-02-24
heroImage: idenautas-web/blog/043.png
description: Crear un sitio web para personas mayores puede ser un desafío, ya que a menudo tienen necesidades y limitaciones únicas en términos de accesibilidad y usabilidad.
tags: ["experiencia-de-usuario"]
---

Diseñar para personas mayores es diseñar bien para todos. Las decisiones que mejoran la experiencia de alguien con visión reducida, manos con menos precisión motriz o menor familiaridad con los patrones de navegación actuales, son decisiones que también mejoran la experiencia del resto de usuarios. La accesibilidad no es un nicho: es buen diseño.

Dicho esto, hay consideraciones específicas que cobran más importancia cuando el público objetivo incluye a personas mayores, y que en muchos proyectos se pasan por alto sin que nadie lo detecte hasta que alguien del grupo de usuarios objetivo intenta usar la web.

## Diseño claro, sin atajos de comprensión

El minimalismo está muy bien, pero puede volverse en contra cuando se lleva demasiado lejos. Los iconos sin etiquetas que un diseñador de 30 años identifica de forma intuitiva pueden no resultar tan evidentes para alguien que usa internet con menos frecuencia. El icono de la "hamburguesa" para el menú, el símbolo del corazón para guardar, la lupa sin texto para buscar: todos son convenciones que se aprenden con la exposición. Quien tiene menos exposición necesita más pistas contextuales.

Los botones y zonas interactivas deben ser lo suficientemente grandes para que puedan pulsarse sin precisión milimétrica. Un objetivo táctil de al menos 44×44 píxeles es el estándar recomendado, pero más grande suele ser mejor en interfaces para este público. El espacio entre elementos interactivos también importa: botones muy juntos generan errores de pulsación que frustran.

Los colores tienen que ofrecer contraste suficiente. No solo por razones estéticas: la agudeza visual disminuye con la edad y textos grises sobre fondos claros, que en pantallas de calidad pueden leerse bien, se vuelven ilegibles en condiciones de luz variable o con pantallas de menor calidad.

## Texto que no cansa

El tamaño de la fuente importa más de lo que los diseñadores jóvenes suelen asumir. Un cuerpo de texto de 14px puede parecer razonable en la pantalla del diseñador; puede ser un esfuerzo en el teléfono de alguien con 70 años. 16px es el mínimo razonable para cuerpo de texto; 18px o 20px en interfaces pensadas específicamente para este público es una decisión que los usuarios agradecen.

El lenguaje también: sin jerga técnica, sin frases subordinadas largas, con párrafos cortos. No es cuestión de simplificar el mensaje, sino de no añadir fricción innecesaria entre el contenido y quien lo lee.

## Navegación predecible

Las personas que no usan internet de forma intensiva no tienen el mapa mental que los usuarios frecuentes dan por sentado. Saben dónde suele estar el menú principal, pero navegaciones complejas con múltiples niveles de submenús o estructuras de contenido poco convencionales los desorientan.

La regla aquí es la predictibilidad: que la web funcione como el usuario espera que funcione, sin sorpresas. Que el logo lleve a la portada, que el menú esté donde suele estar, que los enlaces parezcan enlaces. Las innovaciones de navegación que pueden ser atractivas para un público joven se convierten en obstáculos para quien usa internet con menos confianza.

## Animaciones y movimiento: menos es más

Las animaciones pueden mejorar la experiencia o arruinarla, dependiendo de cómo se usen. Para personas mayores, el movimiento en pantalla puede ser distractor, puede generar mareo en casos extremos, y puede dificultar la lectura si el contenido se mueve mientras intentan procesarlo.

Si se usan animaciones, que sean sutiles, que tengan un propósito funcional claro —indicar que algo ha ocurrido, guiar la atención hacia un elemento importante— y que haya forma de desactivarlas. La propiedad CSS `prefers-reduced-motion` permite respetar la configuración del sistema operativo cuando el usuario ha indicado que prefiere menos movimiento.

## Probar con usuarios reales

Hay un sesgo inevitable en el diseño: diseñamos desde nuestra propia perspectiva de uso. La única forma de saber si una web funciona bien para personas mayores es observar a personas mayores usándola. No encuestas, no suposiciones: sesiones de prueba reales donde se vea dónde se pierden, dónde vacilan, qué no encuentran.

Es el paso que más se saltea y el que más información útil genera.

---

El envejecimiento de la población hace que este tema sea cada vez más relevante. Diseñar webs que funcionen bien para personas mayores no es un ejercicio de altruismo ni una obligación legal —aunque en muchos contextos también lo sea—: es asegurarse de que ningún usuario potencial quede excluido por algo que se podría haber resuelto en el diseño.
