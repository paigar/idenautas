---
title: Abrazando el Jamstack en Idenautas
heroImage: idenautas-web/blog/006.png
alt: Imagen de un desarrollador trabajando en su ordenador y escribiendo código
date: 2023-01-25
description: Por qué adoptamos Jamstack y Eleventy en Idenautas para construir webs más rápidas, seguras y sostenibles, y qué ventajas tiene frente a los CMS tradicionales.
tags: ["desarrollo-tecnico"]
---

Durante años, la forma dominante de construir webs fue la misma: un servidor recibía cada petición, consultaba una base de datos, generaba el HTML al vuelo y lo enviaba al navegador. Funcionaba, pero arrastraba problemas de rendimiento, seguridad y escalabilidad que cada vez costaba más ignorar.

El Jamstack nació como respuesta a eso. El nombre es un acrónimo: **J**avaScript, **A**PIs y **M**arkup. La idea central es sencilla: separar la capa de presentación (el HTML estático que ve el usuario) de la lógica del negocio y los datos (que se gestionan a través de APIs externas). El resultado son sitios que se sirven directamente desde una CDN, sin servidores que procesar nada en tiempo real.

Esto tiene consecuencias prácticas muy visibles. Un sitio estático carga más rápido porque no hay tiempo de espera para generar la página: ya está generada. Es más seguro porque no hay base de datos ni servidor de aplicaciones expuesto a internet. Y escala sin esfuerzo, porque una CDN aguanta picos de tráfico que hundirían cualquier servidor convencional.

Hay un beneficio menos obvio pero igualmente importante: la sostenibilidad. Al procesar menos en el servidor y servir contenido pre-generado, el consumo energético se reduce. No es el argumento principal para adoptar Jamstack, pero en un sector donde la huella de carbono empieza a importar, no es un detalle menor.

## Por qué elegimos Eleventy para este sitio

Para construir idenautas.com elegimos [Eleventy](https://www.11ty.dev/), un generador de sitios estáticos open-source que encajaba bien con lo que necesitábamos: un proyecto con requisitos definidos, sin necesidad de un framework JavaScript pesado y con un resultado final ligero y rápido.

Eleventy tiene algunas características que lo hacen especialmente cómodo. Acepta múltiples lenguajes de plantillas —Markdown, Nunjucks, HTML puro— lo que da mucha libertad para estructurar el contenido sin atarse a convenciones rígidas. No impone ningún framework de JavaScript en el cliente, así que el output es HTML limpio por defecto. Y su curva de aprendizaje es razonable: no exige conocer un ecosistema complejo para empezar a ser productivo.

También ayuda mucho que tenga buena documentación y una comunidad activa. Cuando surge un problema concreto, casi siempre hay alguien que ya lo ha resuelto y lo ha documentado.

El resultado es este sitio: rápido, fácil de mantener y construido sin más complejidad de la necesaria. Que es, al final, la mejor razón para elegir cualquier herramienta.
