const path = require("path")
const _ = require("lodash")
const { createFilePath } = require("gatsby-source-filesystem")

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions

    const result = await graphql(
        `
            {
                allMdx (
                    sort: { fields: [frontmatter___date], order: DESC }
                    limit: 1000
                ) {
                    edges {
                        node {
                            slug
                            frontmatter {
                                tags
                            }
                        }
                    }
                }
                tagsGroup: allMdx(limit: 2000) {
                    group(field: frontmatter___tags) {
                        fieldValue
                    }
                }
            }
        `
    )

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }

    const posts = result.data.allMdx.edges
    const postsPerPage = 10
    const numPages = Math.ceil(posts.length / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
            path: i === 0 ? `/blog` : `/blog/${i + 1}`,
            component: path.resolve("./src/templates/blog-list-template.js"),
            context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages,
                currentPage: i + 1,
            },
        })
    })

    const tags = result.data.tagsGroup.group

    tags.forEach(tag => {
        createPage({
            path: `/blog/tag/${_.kebabCase(tag.fieldValue)}/`,
            component: path.resolve("./src/templates/tag-template.js"),
            context: {
                tag: tag.fieldValue,
            },
        })
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions
    if (node.internal.type === 'Mdx') {
        const value = createFilePath({ node, getNode })
        createNodeField({
            name: 'slug',
            node,
            value,
        })
    }
}