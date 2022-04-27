import React from "react"
import kebabCase from "lodash/kebabCase"
import { Link } from "gatsby"
import Layout from "./layout"

const TagList = ({ data }) => {
    const group = data.allMdx.group
    
    return (
        <Layout pageTitle="Tag List">
            <ul>
                {group.map(tag => (
                    <li key={tag.fieldValue}>
                        <Link to={`/blog/tag/${kebabCase(tag.fieldValue)}/`}>
                            {tag.fieldValue} ({tag.totalCount})
                        </Link>
                    </li>
                ))}
            </ul>
        </Layout>
    )
}

export default TagList