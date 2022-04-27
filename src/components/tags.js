import React from "react"
import { Link } from "gatsby"
import Layout from "./layout"
import {
    postList,
    postItem,
    excerpt
} from "./blog-list.module.css"

const Tags = ({ pageContext, data }) => {
    const { tag } = pageContext
    const { edges, totalCount } = data.allMdx
    const tagHeader = `${totalCount} post${
        totalCount === 1 ? "" : "s"
    } tagged with "${tag}"`

    return (
        <Layout pageTitle={tagHeader}>
            <ul className={postList}>
                {edges.map(({ node }) => {
                    const { title } = node.frontmatter
                    return (
                        <li key={node.slug}>
                            <div className={postItem}>
                                <Link to={`/blog/${node.slug}`}>
                                    <div>{title}</div>
                                </Link>
                                <span className={excerpt}>{node.excerpt}</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <Link to="/blog/tags">All tags</Link>
        </Layout>
    )
}

export default Tags