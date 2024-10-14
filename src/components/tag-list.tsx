import Link from 'next/link';

export default function TagList({ tags }) {
  return (
    tags ? (
      <ul className="flex gap-2 list-none list-inside">
        {tags.map(t =>
          <li className="bg-gray text-white font-bold pl-2 pr-2 rounded text-sm" key={t}>
            <Link
              className="no-underline"
              href={`/blog/tag/${t}`}>
              {t}
            </Link>
          </li>
        )}
      </ul>
    ) : ""
  )
}