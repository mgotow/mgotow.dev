'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Itim } from 'next/font/google';

const itim = Itim({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  preload: false,
});

export default function MainMenu() {
  let pathname = usePathname() || '/';
  if (pathname.includes('/blog/')) {
    pathname = '/blog';
  }

  return (
    <aside className="p-8">
      <div className="flex flex-col sm:flex-row justify-between lg:sticky lg:top-20">
        <Link
          href="/"
          className={clsx(
            "text-3xl no-underline",
            itim.className,
          )}
        >
          mgotow
        </Link>
        <nav
          className="flex relative"
          id="nav"
        >
          <div className="flex space-x-0 w-full gap-4">
            <Link
              href="/"
            >
              <span className={clsx(
                "relative",
                {
                  'font-bold': pathname === '/'
                }
              )}>
                Home
              </span>
            </Link>
            <Link
              href="/blog"
            >
              <span className={clsx(
                "relative",
                {
                  'font-bold': pathname === '/blog'
                }
              )}>
                Blog
              </span>
            </Link>
            <Link
              href="/diary"
            >
              <span className={clsx(
                "relative",
                {
                  'font-bold': pathname === '/diary'
                }
              )}>
                Diary
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
}