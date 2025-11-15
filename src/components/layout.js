/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useContext } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Header from "./header"
import BackToTop from "./BackToTop"
import CreatorInfo from "./CreatorInfo"
import AnimatedBackground from "./AnimatedBackground"
import { ThemeContext } from "../context/ThemeContext"
import "./layout.css"

const MainContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 100%;
  padding: 0 1rem 1.45rem;
  min-height: 100vh;
  background: transparent;
  color: ${props => (props.isDarkMode ? "#e0e0e0" : "#333")};
  transition: color 0.3s ease;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0 0.75rem 1.45rem;
  }
`

const Layout = ({ children }) => {
  const { isDarkMode } = useContext(ThemeContext)
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <AnimatedBackground />
      <Header siteTitle={data.site.siteMetadata.title} />
      <MainContainer isDarkMode={isDarkMode}>
        <main>{children}</main>
      </MainContainer>
      <CreatorInfo />
      <BackToTop />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
