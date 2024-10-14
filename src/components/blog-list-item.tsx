import Link from 'next/link';
import TagList from './tag-list';
import { formatDate } from 'src/lib/format';

export default function BlogListItem({ post }) {
  return (
    <li
      className="flex items-center"
    >
      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <p className="text-sm text-gray">
            {formatDate(post.publishedAt)}
          </p>
          <TagList tags={post.tags} />
        </div>
        <Link href={`/blog/${post.slug}`}>
          {post.title}
        </Link>
      </div>
    </li>
  )
}