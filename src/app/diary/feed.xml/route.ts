import { allDiaries } from 'contentlayer2/generated';

const SITE_URL = 'https://mgotow.dev';

export async function GET() {
  const posts = allDiaries.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/diary/${post.slug}`;
      const pubDate = new Date(post.publishedAt).toUTCString();
      const title = post.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>mgotow - Diary</title>
    <link>${SITE_URL}/diary</link>
    <description>mgotow's diary posts</description>
    <language>ja</language>
    <atom:link href="${SITE_URL}/diary/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
