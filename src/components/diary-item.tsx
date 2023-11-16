import { formatDate } from "src/lib/format";
import { Mdx } from 'src/components/mdx';

export default function DiaryItem({ post }) {
  return (
    <li className="flex flex-col border border-gray rounded-lg p-4">
      <p className="text-sm text-gray">{formatDate(post.publishedAt)}</p>
      <h2 className="font-bold m-0">{post.title}</h2>
      <Mdx code={post.body.code} />
    </li>
  )
}