import React from "react"
import { MDXProvider } from "@mdx-js/react"
import Pre from "./components/pre"

const components = {
    pre: Pre
}

export const wrapRootElement = ({
    element,
}) => <MDXProvider components={components}>{element}</MDXProvider>