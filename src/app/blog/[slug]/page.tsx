import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mdx } from 'src/components/mdx';
import { allBlogs } from 'contentlayer/generated';
import TagList from 'src/components/tag-list';
import { formatDate } from 'src/lib/format';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const post = allBlogs.find((post) => post.slug === params.slug);
  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug,
  } = post;
  const ogImage = image
    ? `https://mgotow.dev/${image}`
    : `https://mgotow.dev/og?title=${title}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://mgotow.dev/blog/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }) {
  const post = allBlogs.find((post) => post.slug === params.slug);

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
        <TagList tags={post.tags} />
      </div>
      <Mdx code={post.body.code} />
    </section>
  );
}