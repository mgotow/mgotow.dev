import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allBlogs } from 'contentlayer/generated';
import BlogListItem from 'src/components/blog-list-item';
import Pagination from 'src/components/pagination';

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  return {
    title: "page: " + params.page + "\"",
    description: 'mgotow\'s blog posts page: ' + params.page
  };
}

export default async function Page({ params }) {
  const totalPage = Math.ceil(allBlogs.length / 10);
  const num = params.page - 1;
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
        <h1 className="text-2xl font-bold mb-4">Blog posts page: {params.page}</h1>
        <ul className="flex flex-col gap-6">
          {posts.map((post) => (
            <BlogListItem post={post} key={post.slug} />
          ))}
        </ul>
        <Pagination linkPath="/blog/page" totalPage={totalPage} currentPage={params.page} />
      </section>
    )
}