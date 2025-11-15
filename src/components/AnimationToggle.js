import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { ThemeContext } from "../context/ThemeContext"
import useReducedMotion from "../hooks/useReducedMotion"

const ToggleButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid ${props => (props.$isDarkMode ? "#ffd700" : "#6D4C41")};
  background: ${props => (props.$isDarkMode ? "rgba(26, 26, 26, 0.9)" : "rgba(255, 255, 255, 0.9)")};
  color: ${props => (props.$isDarkMode ? "#ffd700" : "#6D4C41")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 1000;
  opacity: ${props => (props.$disabled ? 0.5 : 1)};

  &:hover {
    transform: ${props => (props.$disabled ? "none" : "scale(1.1)")};
    box-shadow: ${props => (props.$disabled ? "0 4px 12px rgba(0, 0, 0, 0.2)" : "0 6px 16px rgba(0, 0, 0, 0.3)")};
  }

  &:active {
    transform: ${props => (props.$disabled ? "none" : "scale(0.95)")};
  }

  &:focus {
    outline: 2px solid ${props => (props.$isDarkMode ? "#ffd700" : "#6D4C41")};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    bottom: 70px;
    right: 15px;
    width: 45px;
    height: 45px;
    font-size: 1.3rem;
  }
`

const Tooltip = styled.div`
  position: absolute;
  bottom: 60px;
  right: 0;
  background: ${props => (props.$isDarkMode ? "rgba(26, 26, 26, 0.95)" : "rgba(255, 255, 255, 0.95)")};
  color: ${props => (props.$isDarkMode ? "#e0e0e0" : "#333")};
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.85rem;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  opacity: ${props => (props.$visible ? 1 : 0)};
  transform: translateY(${props => (props.$visible ? 0 : "10px")});
  transition: opacity 0.3s ease, transform 0.3s ease;
  border: 1px solid ${props => (props.$isDarkMode ? "#ffd700" : "#6D4C41")};

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 6px 10px;
  }
`

const AnimationToggle = () => {
  const { isDarkMode } = useContext(ThemeContext)
  const prefersReducedMotion = useReducedMotion()
  const [isEnabled, setIsEnabled] = useState(true)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Cargar estado inicial
    const saved = localStorage.getItem("animatedBackgroundEnabled")
    if (saved !== null) {
      setIsEnabled(saved === "true")
    } else {
      // Por defecto activado si no hay preferencia de reducir movimiento
      setIsEnabled(!prefersReducedMotion)
    }
  }, [prefersReducedMotion])

  // Escuchar cambios desde el componente AnimatedBackground
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleChange = (event) => {
      setIsEnabled(event.detail)
    }

    window.addEventListener("animationToggleChange", handleChange)

    return () => {
      window.removeEventListener("animationToggleChange", handleChange)
    }
  }, [])

  const handleToggle = () => {
    if (prefersReducedMotion) return // No permitir toggle si hay preferencia de reducir movimiento

    const newValue = !isEnabled
    setIsEnabled(newValue)
    localStorage.setItem("animatedBackgroundEnabled", newValue.toString())

    // Disparar evento para que AnimatedBackground se actualice
    window.dispatchEvent(
      new CustomEvent("toggleAnimatedBackground", { detail: newValue })
    )
  }

  const getTooltipText = () => {
    if (prefersReducedMotion) {
      return "Animaciones desactivadas (preferencia del sistema)"
    }
    return isEnabled ? "Desactivar animaciones" : "Activar animaciones"
  }

  const getIcon = () => {
    if (prefersReducedMotion) return "⚠️"
    return isEnabled ? (isDarkMode ? "🌌" : "🎵") : "⏸️"
  }

  return (
    <ToggleButton
      onClick={handleToggle}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      $isDarkMode={isDarkMode}
      $disabled={prefersReducedMotion}
      aria-label={getTooltipText()}
      title={getTooltipText()}
      disabled={prefersReducedMotion}
    >
      {getIcon()}
      <Tooltip $visible={showTooltip} $isDarkMode={isDarkMode}>
        {getTooltipText()}
      </Tooltip>
    </ToggleButton>
  )
}

export default AnimationToggle
