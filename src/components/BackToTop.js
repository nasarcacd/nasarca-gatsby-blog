import React, { useState, useEffect, useContext, useCallback } from "react"
import styled from "styled-components"
import { ThemeContext } from "../context/ThemeContext"

const FloatingButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: ${props => (props.isDarkMode ? "#ffd700" : "#24248a")};
  color: ${props => (props.isDarkMode ? "#2c2c2c" : "#fff")};
  border: none;
  border-radius: 25px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  opacity: ${props => (props.visible ? "1" : "0")};
  visibility: ${props => (props.visible ? "visible" : "hidden")};
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateY(-2px);
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

  @media (max-width: 480px) {
    bottom: 20px;
    right: 20px;
    padding: 10px 16px;
    font-size: 13px;
  }
`

const ArrowIcon = styled.span`
  font-size: 18px;
  line-height: 1;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`

// Throttle helper function
const throttle = (func, delay) => {
  let timeoutId = null
  let lastRan = 0

  return function throttled(...args) {
    const now = Date.now()

    if (now - lastRan >= delay) {
      func.apply(this, args)
      lastRan = now
    } else {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(
        () => {
          func.apply(this, args)
          lastRan = Date.now()
        },
        delay - (now - lastRan)
      )
    }
  }
}

const BackToTop = () => {
  const [visible, setVisible] = useState(false)
  const { isDarkMode } = useContext(ThemeContext)

  const toggleVisibility = useCallback(() => {
    if (typeof window === "undefined") return
    setVisible(window.pageYOffset > 300)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    // Throttle scroll event to improve performance
    const throttledToggleVisibility = throttle(toggleVisibility, 100)

    window.addEventListener("scroll", throttledToggleVisibility, {
      passive: true,
    })

    // Check initial scroll position
    toggleVisibility()

    return () => window.removeEventListener("scroll", throttledToggleVisibility)
  }, [toggleVisibility])

  const scrollToTop = useCallback(() => {
    if (typeof window === "undefined") return

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  return (
    <FloatingButton
      onClick={scrollToTop}
      visible={visible}
      isDarkMode={isDarkMode}
      aria-label="Scroll back to top"
      type="button"
    >
      <ArrowIcon aria-hidden="true">↑</ArrowIcon>
      <span>Back to Top</span>
    </FloatingButton>
  )
}

export default BackToTop
