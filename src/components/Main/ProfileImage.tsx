import React from 'react'
import styled from '@emotion/styled'
import { IGatsbyImageData, GatsbyImage } from 'gatsby-plugin-image'

type ProfileImageProps = {
  profileImage: IGatsbyImageData
}

const ProfileImageWrapper = styled(GatsbyImage)`
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
  border-radius: 50%;
  object-fit: cover;
  isolation: isolate;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`

const ProfileImage: React.FC<ProfileImageProps> = function ({ profileImage }) {
  return <ProfileImageWrapper image={profileImage} alt="Profile Image" />
}

export default ProfileImage
