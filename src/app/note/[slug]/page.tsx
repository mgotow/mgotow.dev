import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mdx } from 'src/components/mdx';
import { allNotes } from 'contentlayer/generated';
import { formatDate } from 'src/lib/format';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const post = allNotes.find((post) => post.slug === params.slug);
  if (!post) {
    notFound();
  }
  const {
    title,
    publishedAt: publishedTime,
    slug,
  } = post;
  const ogImage = `https://mgotow.dev/og?title=${title}`;
  return {
    title,
    openGraph: {
      title,
      type: 'article',
      publishedTime,
      url: `https://mgotow.dev/note/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      images: [ogImage],
    },
  };
}

export default async function Note({ params }) {
  const post = allNotes.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.structuredData),
        }}
      ></script>
      <h1 className="font-bold text-2xl tracking-tighter">
        {post.title}
      </h1>
      <div className="flex justify-start items-center mt-2 mb-4 gap-2 text-sm max-w-[650px]">
        <p className="text-sm text-gray">
          {formatDate(post.publishedAt)}
        </p>
      </div>
      <Mdx code={post.body.code} />
    </section>
  );
}