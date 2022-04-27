module.exports = {
  siteMetadata: {
    siteUrl: "https://mgotow.dev",
    title: "mgotow.dev",
    description: "mgotoの個人サイトです",
    twitterUsername: "mgotow"
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: 'blog',
        path: `${__dirname}/content/blog`,
      }
    },
    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
  ],
};
