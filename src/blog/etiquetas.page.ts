interface Tag {
  nombre: string;
  descripcion: string;
  heroImage: string;
}

interface Data {
  etiquetas: Record<string, Tag>;
}

export default function* ({ etiquetas }: Data) {
  for (const slug of Object.keys(etiquetas)) {
    const tag = etiquetas[slug];
    yield {
      url: `/blog/${slug}/`,
      layout: "layouts/etiqueta.vto",
      tagSlug: slug,
      title: tag.nombre,
      label: "Blog",
      subtitle: tag.descripcion,
      heroImage: tag.heroImage,
      description: tag.descripcion,
      content: "",
    };
  }
}
