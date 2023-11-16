import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allDiaries } from 'contentlayer/generated';
import DiaryItem from 'src/components/diary-item';
import Pagination from 'src/components/pagination';

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  return {
    title: "page: " + params.page + "\"",
    description: "mgotow's diary posts page: " + params.page
  };
}

export default async function Page({ params }) {
  const totalPage = Math.ceil(allDiaries.length / 10);
  const num = params.page - 1;
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
      <h1 className="text-2xl font-bold mb-4">Diary posts page: {params.page}</h1>
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <DiaryItem post={post} key={post.slug} />
        ))}
      </ul>
      <Pagination linkPath="/diary/page" totalPage={totalPage} currentPage={params.page} />
    </section>
  )
}