import React, { useContext } from "react"
import styled from "styled-components"
import { ThemeContext } from "../context/ThemeContext"

const FooterContainer = styled.footer`
  background: ${props => (props.isDarkMode ? "transparent" : "#f5f5f5")};
  color: ${props => (props.isDarkMode ? "#e0e0e0" : "#333")};
  padding: 20px;
  margin-top: 3rem;
  text-align: center;
  border-top: 1px solid ${props => (props.isDarkMode ? "#444" : "#ddd")};
  position: relative;
  z-index: 10;
`

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
`

const SocialLink = styled.a`
  color: ${props => (props.isDarkMode ? "#e0e0e0" : "#333")};
  text-decoration: none;
  font-size: 24px;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => (props.isDarkMode ? "#ffd700" : "#24248a")};
    transform: scale(1.2);
  }
`

const Copyright = styled.div`
  font-size: 12px;
  color: ${props => (props.isDarkMode ? "#999" : "#666")};
`

const CreatorInfo = () => {
  const { isDarkMode } = useContext(ThemeContext)

  return (
    <FooterContainer isDarkMode={isDarkMode}>
      <SocialLinks>
        <SocialLink
          href="https://github.com/nasarcacd"
          target="_blank"
          rel="noopener noreferrer"
          isDarkMode={isDarkMode}
          aria-label="GitHub"
        >
          🐙
        </SocialLink>
        <SocialLink
          href="https://www.linkedin.com/in/nayibsc/"
          target="_blank"
          rel="noopener noreferrer"
          isDarkMode={isDarkMode}
          aria-label="LinkedIn"
        >
          💼
        </SocialLink>
        <SocialLink
          href="mailto:nayibsc@gmail.com"
          isDarkMode={isDarkMode}
          aria-label="Email"
        >
          ✉️
        </SocialLink>
      </SocialLinks>

      <Copyright isDarkMode={isDarkMode}>
        © {new Date().getFullYear()} Nayib Sarmiento. All rights reserved.
      </Copyright>
    </FooterContainer>
  )
}

export default CreatorInfo
