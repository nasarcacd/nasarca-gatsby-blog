import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { ThemeContext } from "../../context/ThemeContext"
import usePerformance from "../../hooks/usePerformance"
import useReducedMotion from "../../hooks/useReducedMotion"
import DarkModeBackground from "./DarkModeBackground"
import LightModeBackground from "./LightModeBackground"

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: opacity 0.5s ease;
  opacity: ${props => (props.$visible ? 1 : 0)};
`

const AnimatedBackground = () => {
  const { isDarkMode } = useContext(ThemeContext)
  const {
    performanceLevel,
    deviceType,
    enableAnimations: perfEnableAnimations,
    maxElements,
    enableBlur,
    enableParallax,
  } = usePerformance()
  const prefersReducedMotion = useReducedMotion()

  // Estado para toggle manual de animaciones
  const [manualToggle, setManualToggle] = useState(null)
  const [isPageVisible, setIsPageVisible] = useState(true)
  const [isHomepage, setIsHomepage] = useState(true)

  // Detectar si estamos en la homepage
  useEffect(() => {
    if (typeof window === "undefined") return

    const checkHomepage = () => {
      const pathname = window.location.pathname
      setIsHomepage(pathname === "/" || pathname === "")
    }

    checkHomepage()

    // Listener para cambios de ruta (para SPAs)
    window.addEventListener("popstate", checkHomepage)

    return () => {
      window.removeEventListener("popstate", checkHomepage)
    }
  }, [])

  // Cargar preferencia de animaciones desde localStorage
  useEffect(() => {
    if (typeof window === "undefined") return

    const saved = localStorage.getItem("animatedBackgroundEnabled")
    if (saved !== null) {
      setManualToggle(saved === "true")
    }
  }, [])

  // Guardar preferencia cuando cambia
  useEffect(() => {
    if (typeof window === "undefined" || manualToggle === null) return

    localStorage.setItem("animatedBackgroundEnabled", manualToggle.toString())

    // Disparar evento personalizado para que el toggle button se actualice
    window.dispatchEvent(
      new CustomEvent("animationToggleChange", { detail: manualToggle })
    )
  }, [manualToggle])

  // Page Visibility API - Pausar animaciones cuando la pestaña no está visible
  useEffect(() => {
    if (typeof document === "undefined") return

    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden)
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  // Escuchar cambios desde el toggle button
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleToggle = (event) => {
      setManualToggle(event.detail)
    }

    window.addEventListener("toggleAnimatedBackground", handleToggle)

    return () => {
      window.removeEventListener("toggleAnimatedBackground", handleToggle)
    }
  }, [])

  // Determinar si las animaciones deben estar activas
  const shouldAnimate = () => {
    // Prioridad 0: Solo mostrar en homepage
    if (!isHomepage) return false

    // Prioridad 1: Si el usuario prefiere reducir movimiento, desactivar
    if (prefersReducedMotion) return false

    // Prioridad 2: Si hay toggle manual, respetarlo
    if (manualToggle !== null) return manualToggle

    // Prioridad 3: Si la página no está visible, desactivar
    if (!isPageVisible) return false

    // Prioridad 4: Usar detección de performance
    return perfEnableAnimations
  }

  const enableAnimations = shouldAnimate()

  // No renderizar nada si no estamos en la homepage
  if (!isHomepage) {
    return null
  }

  return (
    <Container $visible={isPageVisible}>
      {isDarkMode ? (
        <DarkModeBackground
          enableAnimations={enableAnimations}
          maxElements={maxElements}
          enableBlur={enableBlur}
          enableParallax={enableParallax}
        />
      ) : (
        <LightModeBackground
          enableAnimations={enableAnimations}
          maxElements={maxElements}
          deviceType={deviceType}
        />
      )}
    </Container>
  )
}

export default AnimatedBackground
