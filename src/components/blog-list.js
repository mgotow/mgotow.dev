import React from "react"
import { Link } from "gatsby"
import { kebabCase } from "lodash"
import Layout from "./layout"
import {
    pageList,
    pageItem,
    postList,
    postItem,
    postDate,
    postHeader,
    tagItem,
    tagList,
    tagLink,
    excerpt
} from "./blog-list.module.css"
import BlogFotter from "./blog-footer"

const BlogList = ({ data, pageContext }) => {
    const posts = data.allMdx.edges
    const { currentPage, numPages } = pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()
    return (
        <Layout pageTitle="Blog Posts">
            <ul className={postList}>
            {posts.map(({ node }) => {
                const title = node.frontmatter.title || node.slug
                return (
                    <li key={node.slug}>
                        <div className={postItem}>
                            <div className={postHeader}>
                                <span className={postDate}>{node.frontmatter.date}</span>
                                <ul className={tagList}>
                                    {node.frontmatter.tags ?
                                        node.frontmatter.tags.map(t =>
                                                <li key={t} className={tagItem}>
                                                    <Link to={`/blog/tag/${kebabCase(t)}`}
                                                        className={tagLink}>
                                                        #{t}
                                                    </Link>
                                                </li>
                                        ) : ""}
                                </ul>
                            </div>
                            <Link to={`/blog/${node.slug}`} key={node.slug}>
                                <div key={node.slug}>{title}</div>
                            </Link>
                            <span className={excerpt}>{node.excerpt}</span>
                        </div>
                    </li>
                )
            })}
            </ul>
            <ul className={pageList}>
                {!isFirst && (
                    <Link
                        to={`/blog/${prevPage === "/" ? '' : prevPage}`}
                        rel="prev"
                    >
                        {"< Prev"}
                    </Link>
                )}
                {Array.from({ length: numPages }, (_, i) => (
                    <li
                        key={`pagination-number${i + 1}`}
                        style={{
                            margin: 0,
                        }}
                    >
                        <Link
                            to={`/blog/${i === 0 ? '' : i + 1}`}
                            className={pageItem}
                        >
                            {i + 1}
                        </Link>
                    </li>
                ))}
                {!isLast && (
                    <Link
                        to={`/blog/${nextPage}`}
                        rel="next"
                        className={pageItem}
                    >
                        {"Next >"}
                    </Link>
                )}
            </ul>
            <BlogFotter/>
        </Layout>
    )
}

export default BlogList