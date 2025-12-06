import Link from 'next/link';

export type PageProps = {
  linkPath: string,
  totalPage: number,
  currentPage: number,
};

const GoFirst = ({ currentPage, linkPath }: { currentPage: number, linkPath: string }) => {
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
  }
  return null;
};

const GoPrev = ({ currentPage, linkPath }: { currentPage: number, linkPath: string }) => {
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
  }
  return null;
};

const GoNext = ({ currentPage, totalPage, linkPath }: { currentPage: number, totalPage: number, linkPath: string }) => {
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
  }
  return null;
};

const GoLast = ({ currentPage, totalPage, linkPath }: { currentPage: number, totalPage: number, linkPath: string }) => {
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
  }
  return null;
};

export default function Pagination({ linkPath, totalPage, currentPage }: PageProps) {
  return (
    <nav className="mb-6 mt-6">
      <ul className="flex items-center justify-center gap-4 list-none list-inside">
        <GoFirst currentPage={currentPage} linkPath={linkPath} />
        <GoPrev currentPage={currentPage} linkPath={linkPath} />
        <li>
          <p>{currentPage} / {totalPage}</p>
        </li>
        <GoNext currentPage={currentPage} totalPage={totalPage} linkPath={linkPath} />
        <GoLast currentPage={currentPage} totalPage={totalPage} linkPath={linkPath} />
      </ul>
    </nav>
  );
}