import React, { createContext, useState, useEffect, useCallback } from "react"
import PropTypes from "prop-types"

// Create context with default values
export const ThemeContext = createContext({
  isDarkMode: true,
  toggleTheme: () => {},
})

export const ThemeProvider = ({ children }) => {
  // Initialize state with a function to check localStorage immediately
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // SSR safe: Check if window is defined
    if (typeof window === "undefined") return true

    // Check for saved theme preference or use dark mode as default
    const savedTheme = localStorage.getItem("theme")
    return savedTheme ? savedTheme === "dark" : true
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // SSR safe: Check if window is defined
    if (typeof window === "undefined") return

    // Save theme preference
    localStorage.setItem("theme", isDarkMode ? "dark" : "light")

    // Update body class for global styles
    document.body.classList.toggle("dark-mode", isDarkMode)
  }, [isDarkMode, mounted])

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev)
  }, [])

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
