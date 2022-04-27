import React from "react"

const ProfileIcon = ({ image }) => {
  return (
    <div style={{
      position: "relative",
      overflow: "hidden",
      width: "64px",
      height: "64px",
      borderRadius: "50%"
    }}>
      {image ? 
        <img src={image}
          alt="profile icon"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            webkitTransform: "translate(-50%, -50%)",
            msTransform: "translate(-50%, -50%)",
            height: "100%"
          }}
      />
      : ""}
    </div>
  )
}

export default ProfileIcon