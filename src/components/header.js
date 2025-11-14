import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import styled from "styled-components"
import DarkModeToggle from "./DarkModeToggle"
import { ThemeContext } from "../context/ThemeContext"

const HeaderContainer = styled.header`
  background: ${props => (props.isDarkMode ? "#2c2c2c" : "#60635c")};
  margin-bottom: 1.45rem;
  transition: background 0.3s ease;
`

const HeaderContent = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.h1`
  margin: 0;
`

const TitleLink = styled(Link)`
  color: white;
  text-decoration: none;
`

const Header = ({ siteTitle }) => {
  const { isDarkMode } = useContext(ThemeContext)

  return (
    <HeaderContainer isDarkMode={isDarkMode}>
      <HeaderContent>
        <Title>
          <TitleLink to="/">{siteTitle}</TitleLink>
        </Title>
        <DarkModeToggle />
      </HeaderContent>
    </HeaderContainer>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
