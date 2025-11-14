import React, { useContext } from "react"
import styled from "styled-components"
import { ThemeContext } from "../context/ThemeContext"

const ToggleButton = styled.button`
  background: ${props => (props.isDarkMode ? "#ffd700" : "#2c2c2c")};
  border: none;
  color: ${props => (props.isDarkMode ? "#2c2c2c" : "#ffd700")};
  padding: 10px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext)

  return (
    <ToggleButton onClick={toggleTheme} isDarkMode={isDarkMode}>
      {isDarkMode ? "☀️ Light" : "🌙 Dark"}
    </ToggleButton>
  )
}

export default DarkModeToggle
