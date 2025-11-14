import React, { useContext } from "react"
import styled from "styled-components"
import { ThemeContext } from "../context/ThemeContext"

const SidebarContainer = styled.div`
  background: ${props => (props.isDarkMode ? "#2c2c2c" : "#f5f5f5")};
  color: ${props => (props.isDarkMode ? "#e0e0e0" : "#333")};
  padding: 40px 60px;
  border-radius: 16px;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 0;
  width: 100%;
  max-width: 800px;
  text-align: center;
  border-top: 3px solid ${props => (props.isDarkMode ? "#ffd700" : "#24248a")};

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`

const CreatorName = styled.h3`
  margin: 0 0 10px 0;
  color: ${props => (props.isDarkMode ? "#ffd700" : "#24248a")};
  font-size: 1.8rem;
`

const CreatorTitle = styled.p`
  margin: 0 0 20px 0;
  font-style: italic;
  font-size: 16px;
  color: ${props => (props.isDarkMode ? "#ccc" : "#666")};
`

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`

const SocialLink = styled.a`
  color: ${props => (props.isDarkMode ? "#4da6ff" : "#24248a")};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  background: ${props => (props.isDarkMode ? "#3a3a3a" : "#e8e8e8")};
  transition: all 0.3s ease;

  &:hover {
    color: ${props => (props.isDarkMode ? "#80bfff" : "#60635c")};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
      <CreatorName isDarkMode={isDarkMode}>Nayib Sarmiento</CreatorName>
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
        © {new Date().getFullYear()} Nayib Sarmiento
        <br />
        All rights reserved
      </Copyright>
    </SidebarContainer>
  )
}

export default CreatorInfo
