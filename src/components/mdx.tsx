import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMDXComponent } from 'next-contentlayer/hooks';

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

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" unoptimized={true} {...props} />;
}

const components = {
  Image: RoundedImage,
  a: CustomLink,
};

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <article>
      <Component components={components} />
    </article>
  );
}