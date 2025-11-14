import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { ThemeContext } from "../context/ThemeContext"

const FloatingButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: ${props => (props.isDarkMode ? "#ffd700" : "#24248a")};
  color: ${props => (props.isDarkMode ? "#2c2c2c" : "#fff")};
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  opacity: ${props => (props.visible ? "1" : "0")};
  visibility: ${props => (props.visible ? "visible" : "hidden")};
  z-index: 1000;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
    font-size: 20px;
  }
`

const BackToTop = () => {
  const [visible, setVisible] = useState(false)
  const { isDarkMode } = useContext(ThemeContext)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <FloatingButton
      onClick={scrollToTop}
      visible={visible}
      isDarkMode={isDarkMode}
      aria-label="Back to top"
    >
      ↑
    </FloatingButton>
  )
}

export default BackToTop
