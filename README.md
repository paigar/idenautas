# Idenautas - Web Factory

Sitio web corporativo de [Idenautas](https://idenautas.com), construido con [Eleventy](https://www.11ty.dev/).

## Requisitos

- Node.js 20+

## Desarrollo

```bash
npm install
npm run dev
```

El sitio estará disponible en `http://localhost:8080`.

## Build

```bash
npm run build
```

Genera el sitio estático en `_site/`.

## Despliegue

El despliegue a Bunny CDN se realiza automáticamente mediante GitHub Actions al hacer push a la rama `master`.

## Estructura del proyecto

```
src/
├── _data/          # Datos globales (site.json, redirects.json)
├── _includes/
│   ├── layouts/    # Plantillas base, page, post
│   ├── partials/   # Componentes reutilizables
│   └── svg/        # Iconos SVG
├── assets/
│   ├── css/        # Estilos
│   ├── fonts/      # Tipografías (Outfit, Space Grotesk)
│   ├── img/        # Imágenes locales (favicon, logos, iconos)
│   └── js/         # Scripts (main, cookie consent)
├── blog/           # Artículos del blog (Markdown)
├── legales/        # Páginas legales
├── servicios/      # Páginas de servicios
├── utils/          # 404, feed, sitemap, robots, redirects
├── contacto.njk
├── index.njk
├── nosotros.njk
└── por-que-idenautas.njk
```

Las imágenes de contenido se sirven desde CDN propia mediante el shortcode `{% img %}`.
