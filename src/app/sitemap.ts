import { allBlogs, allDiaries } from 'contentlayer/generated';

export default async function sitemap() {
  const blogs = allBlogs.map((post) => ({
    url: `https://mgotow.dev/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const diaries = allDiaries.map((diary) => ({
    url: `https://mgotow.dev/diary/${diary.slug}`,
    lastModified: diary.publishedAt,
  }));

  const routes = ['', '/blog', '/note'].map(
    (route) => ({
      url: `https://mgotow.dev${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    })
  );

  return [...routes, ...blogs, ...diaries];
}