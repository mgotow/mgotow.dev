import * as React from "react"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { kebabCase } from "lodash"
import Layout from "../../components/layout"
import ProfileCard from "../../components/profile-card"
import { tagList, tagItem, tagLink, posted } from "./blog-post.module.css"

const BlogPost = ({ data }) => {
    const image = getImage(data.mdx.frontmatter.hero_image)
    return (
        <Layout
            pageTitle={data.mdx.frontmatter.title}
            pageImage={image ? image?.images?.fallback?.src : ""}
        >
            <ul className={tagList}>
                {data.mdx.frontmatter.tags ?
                    data.mdx.frontmatter.tags.map(t =>
                        <li key={t} className={tagItem}>
                            <Link to={`/blog/tag/${kebabCase(t)}`}
                                className={tagLink}>
                                #{t}
                            </Link>
                        </li>
                    ) : ""}
            </ul>
            <p className={posted}>Posted: {data.mdx.frontmatter.date}</p>
            <GatsbyImage
                image={image}
                alt={data.mdx.frontmatter.hero_image_alt}
            />
            <MDXRenderer>
                {data.mdx.body}
            </MDXRenderer>
            <div style={{
                marginTop: "4rem",
                marginBottom: "2rem"
            }}>
                <p style={{ fontWeight: "bold" }}>書いた人</p>
                <ProfileCard />
            </div>
        </Layout>
    )
}

export const query = graphql`
    query ($id: String) {
        mdx (id: {eq: $id}) {
            slug
            body
            frontmatter {
                title
                date(formatString: "YYYY/MM/DD")
                tags
                hero_image_alt
                hero_image_credit_link
                hero_image_credit_text
                hero_image {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
        }
    }
`

export default BlogPost