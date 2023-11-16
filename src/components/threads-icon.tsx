import { SVGProps } from "react";

export function ThreadsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 7.5c-1.333-3-3.667-4.5-7-4.5c-5 0-8 2.5-8 9s3.5 9 8 9s7-3 7-5s-1-5-7-5c-2.5 0-3 1.25-3 2.5C9 15 10 16 11.5 16c2.5 0 3.5-1.5 3.5-5s-2-4-3-4s-1.833.333-2.5 1"></path>
    </svg>
  )
}