import { useState, useEffect } from "react"

/**
 * Hook para detectar y respetar la preferencia de reducción de movimiento
 * @returns {boolean} - True si el usuario prefiere reducir el movimiento
 */
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Detectar preferencia del sistema
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    setPrefersReducedMotion(mediaQuery.matches)

    // Listener para cambios en la preferencia
    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches)
    }

    // Soporte para navegadores modernos y legacy
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange)
    } else {
      mediaQuery.addListener(handleChange)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange)
      } else {
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [])

  return prefersReducedMotion
}

export default useReducedMotion
