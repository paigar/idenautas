# Idenautas — Web Factory

Sitio web corporativo de [Idenautas](https://www.idenautas.com), construido con [Lume 3](https://lume.land/) sobre [Deno](https://deno.com/) y plantillas [Vento](https://vento.js.org/).

Originalmente estaba desarrollado en Eleventy; la migración está contada en el artículo [«Cambiar de herramienta sin cambiar de filosofía: de Eleventy a Lume 3»](https://www.idenautas.com/blog/cambiar-de-herramienta-sin-cambiar-de-filosofia-de-eleventy-a-lume-3/).

## Requisitos

- [Deno](https://deno.com/) 2.0 o superior

No hay `package.json` ni `node_modules`: Lume y sus dependencias se resuelven por URL desde `deno.json`. La primera vez que ejecutes una tarea, Deno descargará y cacheará todo automáticamente.

## Desarrollo

```bash
deno task serve
```

Levanta el servidor local con recarga automática.

## Build

```bash
deno task build
```

Genera el sitio estático en `_site/`. El hook `beforeBuild` regenera los placeholders de imagen (LQIP) descargándolos del CDN solo para imágenes nuevas; los builds siguientes son casi instantáneos.

## Tareas disponibles

| Tarea                  | Qué hace                                                                                  |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| `deno task build`      | Construye el sitio en `_site/`.                                                            |
| `deno task serve`      | Servidor de desarrollo con live reload.                                                    |
| `deno task lqip`       | Regenera manualmente el caché de LQIP (`src/_data/lqip.json`).                             |
| `deno task publicar`   | Commit + push + build + subida a Bunny Storage + purga del pull zone en Bunny CDN.         |

## Despliegue

El despliegue a [Bunny CDN](https://bunny.net/) se hace manualmente ejecutando `deno task publicar`. El script pide un mensaje de commit, genera el build, sube cada archivo de `_site/` a Bunny Storage con su MIME type correcto y purga el pull zone al terminar.

Las credenciales se leen de `.env`:

```dotenv
BUNNY_STORAGE_HOSTNAME=storage.bunnycdn.com
BUNNY_STORAGE_ZONE_NAME=...
BUNNY_STORAGE_PASSWORD=...
BUNNY_PULL_ZONE_ID=...
BUNNY_API_KEY=...
```

## Estructura del proyecto

```
├── _config.ts            # Configuración de Lume (filtros, shortcodes, hooks)
├── deno.json             # Dependencias y tareas
├── scripts/
│   ├── lqip.ts           # Generación de placeholders (CLI y módulo)
│   ├── publicar.ts       # Script de publicación a Bunny
│   └── njk-to-vto.ts     # Conversor de plantillas Nunjucks → Vento (histórico)
└── src/
    ├── _data/            # Datos globales (site.json, etiquetas.json, lqip.json…)
    ├── _includes/
    │   ├── layouts/      # base.vto, page.vto, post.vto, etiqueta.vto
    │   ├── partials/     # Componentes reutilizables
    │   └── svg/          # Iconos SVG embebidos
    ├── assets/
    │   ├── fonts/        # Tipografías (Outfit, Space Grotesk)
    │   ├── img/          # Imágenes locales (favicon, logos, iconos)
    │   └── js/           # Scripts (main, cookie consent) — minificados con Terser
    ├── blog/
    │   ├── *.md          # Artículos
    │   ├── index.vto     # Listado del blog
    │   └── etiquetas.page.ts   # Generador de páginas por etiqueta
    ├── legales/          # Aviso legal, privacidad, cookies
    ├── servicios/        # Páginas de servicios
    ├── nosotros/         # Páginas de «nosotros» y artículos especializados
    ├── utils/
    │   ├── feed.vto      # RSS
    │   ├── sitemap.vto   # Sitemap XML
    │   ├── llms.vto      # llms.txt / llms-full.txt
    │   ├── robots.vto    # robots.txt
    │   ├── 404.vto       # Página de error
    │   └── redirects.page.ts   # Generador de redirecciones 301
    ├── index.vto
    └── contacto.vto
```

## Imágenes

Las imágenes de contenido se sirven desde un CDN propio de Bunny. Los shortcodes registrados en [`_config.ts`](./_config.ts) las generan como `<picture>` responsive con tres formatos (AVIF, WebP, JPG), varios anchos y un placeholder de baja calidad (LQIP) en base64 embebido como fondo:

```vento
{{ img("idenautas-web/nosotros_01.png", "Texto alternativo", "hero", "eager") }}
{{ cardPicture(heroImage, alt, wide, eager) }}
```

El caché de LQIP vive en `src/_data/lqip.json` y se regenera automáticamente antes de cada build.

## CSS y JS

- El CSS vive en `src/_includes/css/` (`style.css`, `cookieconsent.css`, `syntax.css`), se minifica con `lightningcss` al cargar `_config.ts` y se inyecta **inline** en `<head>` vía el data global `inlineCSS`. No hay CSS externo en la primera renderización.
- El JavaScript vive en `src/assets/js/` y se minifica con el plugin `terser` de Lume.
- Las fuentes se precargan desde `<head>` y se sirven locales en `src/assets/fonts/`.
