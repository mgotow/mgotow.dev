import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allDiaries } from 'contentlayer2/generated';
import DiaryItem from 'src/components/diary-item';
import Pagination from 'src/components/pagination';

export async function generateMetadata(
  { params }: { params: { page: string } }
): Promise<Metadata | undefined> {
  const page = params.page;
  return {
    title: "page: " + page + "\"",
    description: 'mgotow\'s diary posts page: ' + page
  };
}

export default async function Page({ params }: { params: { page: string } }) {
  const page = parseInt(params.page, 10);
  const totalPage = Math.ceil(allDiaries.length / 10);
  const num = page - 1;
  const posts = allDiaries
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
      <h1 className="text-2xl font-bold mb-4">Diary posts page: {page}</h1>
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <DiaryItem post={post} key={post.slug} />
        ))}
      </ul>
      <Pagination linkPath="/diary/page" totalPage={totalPage} currentPage={page} />
    </section>
  )
}