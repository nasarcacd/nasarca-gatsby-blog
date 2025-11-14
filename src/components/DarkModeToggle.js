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

  &:focus {
    outline: 2px solid ${props => (props.isDarkMode ? "#ffd700" : "#fff")};
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${props => (props.isDarkMode ? "#ffd700" : "#fff")};
    outline-offset: 2px;
  }
`

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext)

  return (
    <ToggleButton
      onClick={toggleTheme}
      isDarkMode={isDarkMode}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      aria-pressed={isDarkMode}
      type="button"
    >
      <span aria-hidden="true">{isDarkMode ? "☀️ Light" : "🌙 Dark"}</span>
    </ToggleButton>
  )
}

export default DarkModeToggle
