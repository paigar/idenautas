interface Redirect {
  from: string;
  to: string;
}

interface Data {
  site: { url: string };
  redirects: Redirect[];
}

export default function* ({ site, redirects }: Data) {
  for (const r of redirects) {
    yield {
      url: r.from,
      layout: undefined,
      content:
        `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=${r.to}">
  <link rel="canonical" href="${site.url}${r.to}">
  <title>Redirigiendo…</title>
</head>
<body>
  <p>Esta página se ha movido a <a href="${r.to}">${r.to}</a>.</p>
</body>
</html>
`,
    };
  }
}
