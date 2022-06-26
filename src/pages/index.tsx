import React from "react"
import styled from "@emotion/styled"
import GlobalStyle from "../components/Common/GlobalStyle"
import Introduction from "../components/Main/Introduction"
import Footer from "../components/Common/Footer"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const IndexPage: React.FC = function () {
  return (
    <Container>
      <GlobalStyle />
      <Introduction />
      <Footer />
    </Container>
  )
}

export default IndexPage
