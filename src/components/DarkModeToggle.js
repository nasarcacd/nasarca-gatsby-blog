import React, { useContext } from "react"
import styled from "styled-components"
import { ThemeContext } from "../context/ThemeContext"

const ToggleButton = styled.button`
  background: ${props => (props.isDarkMode ? "#ffd700" : "#2c2c2c")};
  border: none;
  color: ${props => (props.isDarkMode ? "#2c2c2c" : "#ffd700")};
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  transition: all 0.3s ease;
  width: 50px;
  height: 50px;

  &:hover {
    transform: scale(1.1);
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

const MoonWithStars = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 24px;

  .moon {
    font-size: 24px;
  }

  .stars {
    position: absolute;
    top: -2px;
    right: -6px;
    font-size: 10px;
    display: flex;
    gap: 1px;
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
      {isDarkMode ? (
        <span aria-hidden="true">🌞</span>
      ) : (
        <MoonWithStars aria-hidden="true">
          <span className="moon">🌙</span>
          <span className="stars">⭐⭐</span>
        </MoonWithStars>
      )}
    </ToggleButton>
  )
}

export default DarkModeToggle
