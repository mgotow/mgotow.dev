import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const computedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.split("/")[1],
  },
  structuredData: {
    type: 'object',
    resolve: (doc) => ({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: doc.title,
      datePublished: doc.publishedAt,
      dateModified: doc.publishedAt,
      description: doc.summary,
      image: doc.image
        ? `https://mgotow.dev/${doc.image}`
        : doc.title
        ? `https://mgotow.dev/og?title=${doc.title}`
        : `https://mgotow.dev/og?title=${doc._raw.flattenedPath.split("/")[1]}`,
      url: `https://mgotow.dev/${doc._raw.flattenedPath}`,
      author: {
        '@type': 'Person',
        name: 'mgotow',
      },
    }),
  },
};

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    publishedAt: {
      type: 'string',
      required: true,
    },
    summary: {
      type: 'string',
      required: true,
    },
    image: {
      type: 'string',
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
    },
  },
  computedFields,
}));

export const Diary = defineDocumentType(() => ({
  name: 'Diary',
  filePathPattern: 'diary/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    publishedAt: {
      type: 'string',
      required: true,
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Blog, Diary],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'one-dark-pro',
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('line--highlighted');
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word--highlighted'];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
});
