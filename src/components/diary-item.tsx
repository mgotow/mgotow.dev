import Link from 'next/link';
import { formatDate } from "src/lib/format";
import { Mdx } from 'src/components/mdx';

export default function DiaryItem({ post }) {
  return (
    <li className="flex flex-col border border-gray rounded-lg p-4">
      <p className="text-sm text-gray">{formatDate(post.publishedAt)}</p>
      <Link href={`/diary/${post.slug}`}>
        <h2 className="font-bold mt-0 mb-2">{post.title}</h2>
      </Link>
      <Mdx code={post.body.code} />
    </li>
  )
}