import { allBlogs, allNotes } from 'contentlayer/generated';

export default async function sitemap() {
  const blogs = allBlogs.map((post) => ({
    url: `https://mgotow.dev/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const notes = allNotes.map((note) => ({
    url: `https://mgotow.dev/note/${note.slug}`,
    lastModified: note.publishedAt,
  }));

  const routes = ['', '/blog', '/note'].map(
    (route) => ({
      url: `https://mgotow.dev${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    })
  );

  return [...routes, ...blogs, ...notes];
}