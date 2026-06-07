import { getCollection } from "astro:content";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET({ site }: { site: URL }) {
  const entries = (await getCollection("journal", ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf())
    .slice(0, 20);

  const items = entries
    .map((entry) => {
      const url = new URL(`/journal/${entry.id}/`, site).toString();
      return `
    <item>
      <title>${escapeXml(entry.data.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${entry.data.publishedAt.toUTCString()}</pubDate>
      <description>${escapeXml(entry.data.summary)}</description>
      <category>${escapeXml(entry.data.format)}</category>
      ${entry.data.themes.map((theme) => `<category>${escapeXml(theme)}</category>`).join("")}
    </item>`;
    })
    .join("");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Jonathan Lyon Journal</title>
    <link>${new URL("/", site)}</link>
    <description>Essays, field notes, photographs, fragments and moments from Jonathan Lyon.</description>
    <language>en-nz</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
