import Link from "next/link"
import { GithubIcon } from "src/components/github-icon"
import { ThreadsIcon } from "src/components/threads-icon"
import { SizumeIcon } from "src/components/sizume-icon"

export default function Home() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">About me</h1>
      <p>Programmer living in Tottori, Japan.</p>
      <div className="mt-2 flex gap-1">
        <Link href="https://github.com/mgotow" target="_blank">
          <GithubIcon width={24} height={24} />
        </Link>
        <Link href="https://www.threads.net/@mgotow" target="_blank">
          <ThreadsIcon width={24} height={24} />
        </Link>
        <Link href="https://sizu.me/mgotow" target="_blank">
          <SizumeIcon width={24} height={24} />
        </Link>
      </div>
    </section>
  )
}
