import type { Metadata } from 'next';
import { allNotes } from 'contentlayer/generated';
import Pagination from '../../components/pagination';
import NoteItem from '../../components/note-item';

export const metadata: Metadata = {
  title: 'Note',
  description: 'mgotow\'s note posts'
};

export default async function NotePage() {
  const totalPage = Math.ceil(allNotes.length / 10);
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Note posts</h1>
      <ul className="flex flex-col gap-4">
        {allNotes
          .sort((a, b) => {
            if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
              return -1;
            }
            return 1;
          }).slice(0, 10).map((post) => (
            <NoteItem post={post} key={post.slug} />
          ))
        }
      </ul>
      <Pagination linkPath="/note/page" totalPage={totalPage} currentPage={1} />
    </section>
  )
}