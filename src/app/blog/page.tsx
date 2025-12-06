import type { Metadata } from 'next';
import { allBlogs } from 'contentlayer2/generated';
import BlogListItem from '../../components/blog-list-item';
import Pagination from '../../components/pagination';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'mgotow\'s blog posts'
};

export default async function BlogPage() {
  const totalPage = Math.ceil(allBlogs.length / 10);
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Blog posts</h1>
      <ul className="flex flex-col gap-6">
        {allBlogs
          .sort((a, b) => {
            if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
              return -1;
            }
            return 1;
          }).slice(0, 10).map((post) => (
          <BlogListItem post={post} key={post.slug} />
        ))}
      </ul>
      <Pagination linkPath="/blog/page" totalPage={totalPage} currentPage={1} />
    </section>
  )
}