import * as React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allBlogs } from 'contentlayer2/generated';
import BlogListItem from 'src/components/blog-list-item';

export async function generateMetadata(
  { params }: { params: Promise<{ tag: string }> }
): Promise<Metadata | undefined> {
  const { tag } = await params;
  return {
    title: 'tag: "' + tag + '"',
    description: 'mgotow\'s blog posts for the tag: \"' + tag + "\""
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const posts = allBlogs
    .filter(blog => blog.tags.includes(tag))
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
      <h1 className="text-2xl font-bold mb-4">Blog posts tag: &quot;{tag}&quot;</h1>
      <ul className="flex flex-col gap-6">
        {posts.map((post) => (
          <BlogListItem post={post} key={post.slug} />
        ))}
      </ul>
    </section>
  )
}