import Link from 'next/link';

export type PageProps = {
  linkPath: string,
  totalPage: number,
  currentPage: number,
};

export default function Pagination({ linkPath, totalPage, currentPage}: PageProps) {

  const GoFirst = () => {
    if (Number(currentPage) > 1) {
      return (
        <li>
          <Link
            className="text-black p-2 rounded border border-black"
            href={linkPath + "/1"}>
            {"<<"}
          </Link>
        </li>
      );
    } else {
      return ""
    }
  }

  const GoPrev = () => {
    if (Number(currentPage) > 1) {
      return (
        <li>
          <Link
            className="text-black p-2 rounded border border-black"
            href={linkPath + "/" + (Number(currentPage) - 1)}>
            {"<"}
          </Link>
        </li>
      );
    } else {
      return "";
    }
  }

  const GoNext = () => {
    if (Number(currentPage) < Number(totalPage)) {
      return (
        <li>
          <Link
            className="text-black p-2 rounded border border-black"
            href={linkPath + "/" + (Number(currentPage) + 1)}>
            {">"}
          </Link>
        </li>
      );
    } else {
      return "";
    }
  }

  const GoLast = () => {
    if (currentPage < totalPage) {
      return (
        <li>
          <Link
            className="text-black p-2 rounded border border-black"
            href={linkPath + "/" + totalPage}>
            {">>"}
          </Link>
        </li>
      );
    } else {
      return "";
    }
  }

  return (
    <nav className="mb-6 mt-6">
      <ul className="flex items-center justify-center gap-4">
        <GoFirst />
        <GoPrev />
        <li>
          <p>{currentPage} / {totalPage}</p>
        </li>
        <GoNext />
        <GoLast />
      </ul>
    </nav>
  );
}