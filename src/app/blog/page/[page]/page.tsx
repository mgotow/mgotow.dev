import * as React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allBlogs } from 'contentlayer2/generated';
import BlogListItem from 'src/components/blog-list-item';
import Pagination from 'src/components/pagination';

export async function generateMetadata(
  { params }: { params: Promise<{ page: string }> }
): Promise<Metadata | undefined> {
  const { page } = await params;
  return {
    title: "page: " + page + "\"",
    description: 'mgotow\'s blog posts page: ' + page
  };
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page: pageStr } = await params;
  const page = parseInt(pageStr, 10);
  const totalPage = Math.ceil(allBlogs.length / 10);
  const num = page - 1;
  const posts = allBlogs
    .sort((a, b) => {
      if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
        return -1;
      }
      return 1;
    }).slice(10 * num, 10 * num + 10);

  if (!posts) {
    notFound();
  }

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Blog posts page: {page}</h1>
      <ul className="flex flex-col gap-6">
        {posts.map((post) => (
          <BlogListItem post={post} key={post.slug} />
        ))}
      </ul>
      <Pagination linkPath="/blog/page" totalPage={totalPage} currentPage={page} />
    </section>
  )
}