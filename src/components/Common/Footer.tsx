import React from 'react'
import styled from '@emotion/styled'

const FooterWrapper = styled.footer`
  display: grid;
  place-items: center;
  margin-top: auto;
  padding: 50px 0;
  font-size: 15px;
  text-align: center;
  line-height: 1.5;
  @media (max-width: 768px) {
    font-size: 13px;
  }
`

const getCurrentYear = (): number => {
  return new Date().getFullYear()
}

const Footer: React.FC = function () {
  return (
    <FooterWrapper>
      Thank You for Visiting My Blog, Have a Good Day 😆
      <br />© {getCurrentYear()} Developer Soon, Powered By Gatsby.
    </FooterWrapper>
  )
}

export default Footer
