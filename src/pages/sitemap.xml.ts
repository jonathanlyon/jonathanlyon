import { getCollection } from "astro:content";

export async function GET({ site }: { site: URL }) {
  const entries = (await getCollection("journal", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );

  const staticPages = [
    { url: new URL("/", site), lastmod: new Date().toISOString(), priority: "1.0" },
    { url: new URL("/journal/", site), lastmod: new Date().toISOString(), priority: "0.8" },
  ];

  const journalPages = entries.map((entry) => ({
    url: new URL(`/journal/${entry.id}/`, site),
    lastmod: entry.data.publishedAt.toISOString(),
    priority: "0.7",
  }));

  const items = [...staticPages, ...journalPages]
    .map(
      ({ url, lastmod, priority }) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`,
    )
    .join("");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}
</urlset>`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
