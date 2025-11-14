import React, { useContext } from "react"
import styled from "styled-components"
import { ThemeContext } from "../context/ThemeContext"

const SidebarContainer = styled.div`
  background: ${props => (props.isDarkMode ? "#2c2c2c" : "#f5f5f5")};
  color: ${props => (props.isDarkMode ? "#e0e0e0" : "#333")};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`

const CreatorName = styled.h3`
  margin: 0 0 10px 0;
  color: ${props => (props.isDarkMode ? "#ffd700" : "#24248a")};
`

const CreatorTitle = styled.p`
  margin: 0 0 15px 0;
  font-style: italic;
  font-size: 14px;
`

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
`

const SocialLink = styled.a`
  color: ${props => (props.isDarkMode ? "#4da6ff" : "#24248a")};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => (props.isDarkMode ? "#80bfff" : "#60635c")};
  }
`

const Copyright = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid ${props => (props.isDarkMode ? "#444" : "#ddd")};
  font-size: 12px;
  text-align: center;
  color: ${props => (props.isDarkMode ? "#999" : "#666")};
`

const CreatorInfo = () => {
  const { isDarkMode } = useContext(ThemeContext)

  return (
    <SidebarContainer isDarkMode={isDarkMode}>
      <CreatorName isDarkMode={isDarkMode}>Nayib Scanferla</CreatorName>
      <CreatorTitle>Software Engineer</CreatorTitle>

      <SocialLinks>
        <SocialLink
          href="https://github.com/nasarcacd"
          target="_blank"
          rel="noopener noreferrer"
          isDarkMode={isDarkMode}
        >
          <span>🐙</span> GitHub
        </SocialLink>
        <SocialLink
          href="https://www.linkedin.com/in/nayibsc/"
          target="_blank"
          rel="noopener noreferrer"
          isDarkMode={isDarkMode}
        >
          <span>💼</span> LinkedIn
        </SocialLink>
        <SocialLink
          href="mailto:nayibsc@gmail.com"
          isDarkMode={isDarkMode}
        >
          <span>✉️</span> nayibsc@gmail.com
        </SocialLink>
      </SocialLinks>

      <Copyright isDarkMode={isDarkMode}>
        © {new Date().getFullYear()} Nayib Scanferla
        <br />
        All rights reserved
      </Copyright>
    </SidebarContainer>
  )
}

export default CreatorInfo
