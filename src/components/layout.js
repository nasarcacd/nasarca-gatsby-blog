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
import { ThemeContext } from "../context/ThemeContext"
import "./layout.css"

const MainContainer = styled.div`
  margin: 0 auto;
  width: 80%;
  max-width: 1400px;
  padding: 0 1.0875rem 1.45rem;
  min-height: 100vh;
  background: ${props => (props.isDarkMode ? "#1a1a1a" : "#ffffff")};
  color: ${props => (props.isDarkMode ? "#e0e0e0" : "#333")};
  transition: background 0.3s ease, color 0.3s ease;

  @media (max-width: 768px) {
    width: 95%;
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
      <Header siteTitle={data.site.siteMetadata.title} />
      <MainContainer isDarkMode={isDarkMode}>
        <main>{children}</main>
      </MainContainer>
      <BackToTop />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
