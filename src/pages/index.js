import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import { kebabCase } from "lodash"
import {
  postList,
  postItem,
  postDate,
  postHeader,
  tagList,
  tagItem,
  tagLink,
  excerpt
} from "../components/blog-list.module.css"

const IndexPage = ({ data }) => {
  const posts = data.allMdx.edges
  return (
    <Layout pageTitle="Home">
      <StaticImage
        src="../images/nagi.jpg"
        alt="那岐山"
        placeholder="blurred"
      />
      <h3>Recent Blog Posts</h3>
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
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx (
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 10
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

export default IndexPage
