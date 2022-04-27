import * as React from "react"
import Layout from "../components/layout"
import Profile from "../components/profile"

const AboutPage = () => {
    return (
        <Layout pageTitle="About">
            <h2>このサイトについて</h2>
            <p>個人開発ログ、技術メモ、趣味・生活ノートなどの雑多なブログにしたいと思っています</p>
            <h2>mgotowについて</h2>
            <Profile />
        </Layout>
    )
}

export default AboutPage