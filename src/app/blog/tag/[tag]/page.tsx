import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allBlogs } from 'contentlayer/generated';
import BlogListItem from 'src/components/blog-list-item';

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  return {
    title: 'tag: "' + params.tag + '"',
    description: 'mgotow\'s blog posts for the tag: \"' + params.tag + "\""
  };
}

export default async function TagPage({ params }) {
  const posts = allBlogs
    .filter(blog => blog.tags.includes(params.tag))
    .sort((a, b) => {
      if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
        return -1;
      }
      return 1;
    });

  if (!posts) {
    notFound();
  }

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Blog posts tag: &quot;{params.tag}&quot;</h1>
      <ul className="flex flex-col gap-6">
        {posts.map((post) => (
          <BlogListItem post={post} key={post.slug} />
        ))}
      </ul>
    </section>
  )
}