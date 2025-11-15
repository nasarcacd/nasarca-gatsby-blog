import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import styled from "styled-components"
import DarkModeToggle from "./DarkModeToggle"
import Image from "./image"
import { ThemeContext } from "../context/ThemeContext"

const HeaderContainer = styled.header`
  background: ${props => (props.isDarkMode ? "linear-gradient(180deg, #000000 0%, #0a0a14 100%)" : "#60635c")};
  margin-bottom: ${props => (props.isDarkMode ? "0" : "1.45rem")};
  transition: background 0.3s ease;
  position: relative;
  z-index: 10;
`

const HeaderContent = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const ImageWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid white;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`

const Title = styled.h1`
  margin: 0;
  font-size: 1.7rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
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
        <TitleSection>
          <ImageWrapper>
            <Image />
          </ImageWrapper>
          <Title>
            <TitleLink to="/">{siteTitle}</TitleLink>
          </Title>
        </TitleSection>
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
