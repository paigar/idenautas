---
title: "Core Web Vitals explicados sin tecnicismos"
heroImage: idenautas-web/blog/149.png
alt: Dashboard mostrando puntuaciones perfectas de rendimiento web en verde
date: 2025-09-18
description: "Google lleva años usando la velocidad como factor de posicionamiento. Los Core Web Vitals son las métricas concretas que mide — y entenderlas puede marcar la diferencia entre aparecer o no aparecer."
tags: ["desarrollo-tecnico"]
---

Google no solo evalúa si tu contenido es relevante. También evalúa si tu web ofrece una buena experiencia a quien la visita. Y para medir eso de forma objetiva, tiene un conjunto de métricas concretas: los Core Web Vitals. Suenan técnicos, pero la idea detrás de cada uno cabe en una frase.

## Las tres métricas que mide Google

**LCP — Largest Contentful Paint.** Mide cuánto tarda en aparecer el elemento más grande visible en pantalla: normalmente una imagen destacada o un bloque de texto principal. Es la métrica que mejor refleja la percepción de velocidad. Si el elemento principal tarda en llegar, el usuario siente que la página no carga aunque todo lo demás ya esté ahí. El objetivo es llegar por debajo de los 2,5 segundos.

**CLS — Cumulative Layout Shift.** Mide la estabilidad visual de la página. ¿Alguna vez has intentado hacer clic en algo y en el último momento se ha movido porque cargó una imagen o un anuncio justo encima? Eso es un cambio de diseño inesperado, y CLS los suma. El objetivo es mantenerse por debajo de 0,1. Los culpables habituales son imágenes sin dimensiones definidas y fuentes web que llegan tarde y desplazan el texto.

**INP — Interaction to Next Paint.** Es la métrica más reciente: en marzo de 2024 sustituyó a FID. Mientras que FID solo medía el retraso de la primera interacción, INP mide la respuesta de todas las interacciones durante toda la visita. Si pulsas un botón y la página tarda medio segundo en reaccionar, INP lo registra. El objetivo es estar por debajo de los 200 milisegundos.

## Por qué Google usa esto como factor de posicionamiento

Google empezó a utilizar los Core Web Vitals como señal de posicionamiento en 2021. El razonamiento es directo: si una web carga despacio, se mueve mientras la usas y tarda en responder a tus clics, la experiencia es mala. Y Google no quiere enviar a sus usuarios a sitios con mala experiencia.

No es el único factor, pero en nichos donde el contenido es similar entre competidores, la experiencia de usuario puede ser lo que decide quién aparece primero. Ignorar estas métricas significa entregar esa ventaja.

## Qué suele causar puntuaciones malas

Los problemas más frecuentes tienen causas reconocibles. Un LCP alto suele venir de imágenes sin optimizar — demasiado pesadas o en formatos anticuados —, de scripts que bloquean la carga o de servidores lentos que tardan en responder. Un CLS elevado aparece cuando las imágenes no tienen ancho y alto definidos, o cuando las fuentes web llegan tarde y empujan el texto. Un INP pobre casi siempre apunta a demasiado JavaScript ejecutándose a la vez: scripts de analítica, widgets de chat, herramientas de marketing que compiten por el procesador del navegador.

La buena noticia es que muchos de estos problemas tienen soluciones concretas: comprimir imágenes, usar formatos modernos como WebP, reservar espacio para los elementos que cargan de forma asíncrona, y revisar qué scripts de terceros son realmente necesarios.

## Jamstack y sitios estáticos: la ventaja de partida

Las webs construidas con arquitectura Jamstack — páginas generadas de antemano y servidas como archivos estáticos desde una CDN — parten con ventaja natural en todas estas métricas. No hay servidor ejecutando código en cada petición, no hay consultas a bases de datos, no hay frameworks pesados arrancando en el navegador. El HTML ya existe; solo hay que entregarlo.

Eso se traduce directamente en mejores tiempos de carga, menos JavaScript innecesario y menos riesgo de cambios de diseño imprevistos. No es magia: es la consecuencia lógica de una arquitectura más sencilla.

## Cómo medir el estado de tu web

Antes de optimizar, hay que saber dónde se está. Las dos herramientas más útiles son **Google Search Console** — que muestra qué páginas tienen problemas y de qué tipo, con datos de usuarios reales — y **PageSpeed Insights**, que analiza cualquier URL y combina datos reales con un diagnóstico detallado. Ambas son gratuitas y no requieren conocimientos técnicos para interpretar sus resultados básicos.

---

Entender los Core Web Vitals no requiere ser desarrollador. Saber qué miden y por qué importan es suficiente para hacer mejores preguntas cuando alguien construye o mantiene tu web — y para reconocer si las decisiones que se están tomando trabajan a tu favor o en tu contra.
