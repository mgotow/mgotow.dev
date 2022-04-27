import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import {
    container,
    header,
    main,
    heading,
    nav,
    navLinks,
    navLinkItem,
    navLinkText,
    siteTitle,
} from "./layout.module.css"
import ogpImage from "../images/ogp.png"

const Layout = ({ pageTitle, pageImage, children }) => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                    siteUrl,
                    twitterUsername
                }
            }
        }
    `)
    const { pathname } = useLocation()
    const path = pathname === "/" ? "" : pathname
    const {
        title,
        siteUrl,
        description,
        twitterUsername
    } = data.site.siteMetadata
    const defaultImage = siteUrl + ogpImage;
    const image = pageImage ? siteUrl + pageImage : defaultImage
    const buildTitle = pageTitle ? `${pageTitle} | ${title}` : title
    const isNumber = path.split("/")[2] && /^\d*$/.test(path.split("/")[2])
    const ogArticle = path.split("/")[2] && path.split("/")[1] === "blog"
        && !isNumber ? { name: "og:type", content: "article" } :
            { name: "og:type", content: "website" }
    return (
        <div className={container}>
            <Helmet
                title={buildTitle}
                link={[{ rel: "canonical", href: `${siteUrl}${path}` }]}
                meta={[
                    { name: "charSet", content: "utf-8" },
                    { name: "description", content: description },
                    { name: "og:url", content: buildTitle },
                    ogArticle,
                    { name: "og:title", content: buildTitle },
                    { name: "og:description", content: description },
                    { name: "og:image", content: image },
                    { name: "twitter:card", content: "summary_large_image" },
                    { name: "twitter:creator", content: twitterUsername },
                    { name: "twitter:title", content: buildTitle },
                    { name: "twitter:description", content: description },
                    { name: "twitter:image", content: image }
                ]}
            >
            </Helmet>
            <header className={header}> 
                <div>
                    <Link to="/" className={siteTitle}>
                        {data.site.siteMetadata.title}
                    </Link>
                </div>
                <nav className={nav}>
                    <ul className={navLinks}>
                        <li className={navLinkItem}>
                            <Link to="/" className={navLinkText}>
                                Home
                            </Link>
                        </li>
                        <li className={navLinkItem}>
                            <Link to="/blog" className={navLinkText}>
                                Blog
                            </Link>
                        </li>
                        <li className={navLinkItem}>
                            <Link to="/about" className={navLinkText}>
                                About
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className={main}>
                <h1 className={heading}>{pageTitle}</h1>
                {children}
            </main>
        </div>
    )
}

export default Layout