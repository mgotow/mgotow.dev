import React from "react"
import { Link } from "gatsby"

const BlogFotter = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "end"
            }}>
                <Link to="/blog/tags">All Tags</Link>
        </div>
    )
}

export default BlogFotter;