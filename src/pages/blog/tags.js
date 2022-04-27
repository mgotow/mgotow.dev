import React from "react"
import { graphql } from "gatsby"
import TagList from "../../components/tag-list"

const TagListPage = ({ data }) => {
    return <TagList data={data} />
}

export default TagListPage

export const query = graphql`
    query {
        allMdx (limit: 2000) {
            group (field: frontmatter___tags) {
                fieldValue
                totalCount
            }
        }
    }
`