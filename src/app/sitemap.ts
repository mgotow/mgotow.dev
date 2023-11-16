import { allBlogs } from 'contentlayer/generated';

export default async function sitemap() {
  const blogs = allBlogs.map((post) => ({
    url: `https://mgotow.dev/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const routes = ['', '/blog', '/diary'].map(
    (route) => ({
      url: `https://mgotow.dev${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    })
  );

  return [...routes, ...blogs];
}