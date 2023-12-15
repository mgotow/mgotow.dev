import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { Pre } from './pre';

interface MdxProps {
  code: string
}

const CustomLink = (props) => {
  const href = props.href;

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

function RoundedImageWithCaption(props) {
  return <figure className="mt-4 mb-4">
    <Image alt={props.alt} className="rounded-lg" {...props} />
    {props.caption ? <figcaption className="text-gray">{props.caption}</figcaption> : <></>}
  </figure>
}

const components = {
  Image: RoundedImageWithCaption,
  a: CustomLink,
  pre: Pre,
};

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <article>
      <Component components={components} />
    </article>
  );
}