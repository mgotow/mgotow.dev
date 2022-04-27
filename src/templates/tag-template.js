import React from "react"
import { graphql } from "gatsby"
import Tags from "../components/tags"

const TagsTemplate = ({ data, pageContext }) => {
    return <Tags data={data} pageContext={pageContext} />
}

export const query = graphql`
    query ($tag: String) {
        allMdx (
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
            totalCount
            edges {
                node {
                    slug
                    excerpt(truncate: true)
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
`

export default TagsTemplate