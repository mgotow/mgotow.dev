import React from "react"
import ProfileCard from "./profile-card"

const Profile = () => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column"
    }}>
      <ProfileCard />
      <div style={{
        marginTop: "8px"
      }}>
        <p style={{
          marginBlock: "0em"
        }}>社内SE的なことして生活している</p>
        <p style={{
          marginBlock: "0em"
        }}>趣味はゲーム、登山</p>
      </div>
    </div>
  )
}

export default Profile