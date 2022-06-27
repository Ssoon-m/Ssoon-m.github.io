import React from "react"
import styled from "@emotion/styled"

const PROFILE_IMAGE_LINK =
  "https://thumbnail7.coupangcdn.com/thumbnails/remote/292x292ex/image/rs_quotation_api/dbbmlmae/a99b2ae4c2a34dad95980bb7c29d54e0.jpg"

const ProfileImageWrapper = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`

const ProfileImage: React.FC = function () {
  return <ProfileImageWrapper src={PROFILE_IMAGE_LINK} alt="Profile Image" />
}

export default ProfileImage
