import React from "react"
import { graphql } from "gatsby"
import BlogList from "../components/blog-list"

const BlogListTemplate = ({ data, pageContext }) => {
    return <BlogList data={data} pageContext={pageContext} />
}

export const query = graphql`
    query ($skip: Int!, $limit: Int!) {
        allMdx (
            sort: { fields: [frontmatter___date], order: DESC }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    slug
                    excerpt(truncate: true)
                    frontmatter {
                        date(formatString: "YYYY/MM/DD")
                        title
                        tags
                    }
                }
            }
        }
    }
`

export default BlogListTemplate