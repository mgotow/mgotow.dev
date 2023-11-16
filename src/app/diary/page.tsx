import type { Metadata } from 'next';
import { allDiaries } from 'contentlayer/generated';
import Pagination from '../../components/pagination';
import DiaryItem from '../../components/diary-item';

export const metadata: Metadata = {
  title: 'Diary',
  description: 'mgotow\'s diary posts'
};

export default async function DiaryPage() {
  const totalPage = Math.ceil(allDiaries.length / 10);
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Diary posts</h1>
      <ul className="flex flex-col gap-4">
        {allDiaries
          .sort((a, b) => {
            if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
              return -1;
            }
            return 1;
          }).slice(0, 10).map((post) => (
            <DiaryItem post={post} key={post.slug} />
          ))
        }
      </ul>
      <Pagination linkPath="/diary/page" totalPage={totalPage} currentPage={1} />
    </section>
  )
}