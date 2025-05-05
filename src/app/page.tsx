import Link from "next/link"
import Image from "next/image"
import { GithubIcon } from "src/components/github-icon"
import { BlueskyIcon } from "src/components/bluesky-icon"
import { SizumeIcon } from "src/components/sizume-icon"

export default function Home() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">About me</h1>
      <div className="flex gap-4 items-center">
        <Image
          src="/icon.png"
          width={72}
          height={72}
          alt="icon"
          className="rounded-full"
        />
        <div className="flex flex-col">
          <p className="text-lg font-bold">mgotow</p>
          <p>よわエンジニア 鳥取在住 ゲーム好き 個人開発したい人</p>
          <div className="mt-2 mb-2 flex gap-1">
            <Link href="https://github.com/mgotow" target="_blank">
              <GithubIcon width={24} height={24} />
            </Link>
            <Link href="https://bsky.app/profile/mgotow.bsky.social" target="_blank">
              <BlueskyIcon width={24} height={24} />
            </Link>
            <Link href="https://sizu.me/mgotow" target="_blank">
              <SizumeIcon width={24} height={24} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
