import React from "react"
import styled from "@emotion/styled"
import GlobalStyle from "../components/Common/GlobalStyle"
import Introduction from "../components/Main/Introduction"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const IndexPage: React.FC = function () {
  return (
    <Container>
      <GlobalStyle />
      <Introduction />
    </Container>
  )
}

export default IndexPage