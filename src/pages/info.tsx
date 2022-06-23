import React from "react"
import { graphql } from "gatsby"
import Text from "../components/text"
import { Link } from "gatsby"

type InfoPageProps = {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: string
      }
    }
  }
}

const InfoPage: React.FC<InfoPageProps> = ({
  data: {
    site: {
      siteMetadata: { title, description, author },
    },
  },
}) => {
  return (
    <div>
      <Text text={title}></Text>
      <Text text={description}></Text>
      <Text text={author}></Text>
      <Link to="/">To main</Link>
    </div>
  )
}

export default InfoPage

export const metadataQuery = graphql`
  {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
