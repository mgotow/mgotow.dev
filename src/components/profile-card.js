import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons"
import ProfileIcon from "./profile-icon"
import ogp from "../images/ogp.png"
import { Link } from "gatsby"

const ProfileCard = () => {

  return (
    <div style={{
      display: "flex",
      gap: "0px 12px"
    }}>
      <div style={{
        display: "flex"
      }}>
        <ProfileIcon image={ogp} />
      </div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "8px 0px"
      }}>
        <p style={{
          marginBlockStart: '0em',
          marginBlockEnd: '0em'
        }}>
          mgotow
        </p>
        <div style={{
          display: "flex",
          gap: "0px 8px",
        }}>
          <Link to="https://twitter.com/mgotow">
            <FontAwesomeIcon icon={faTwitter} />
          </Link>
          <Link to="https://github.com/mgotow">
            <FontAwesomeIcon icon={faGithub} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard