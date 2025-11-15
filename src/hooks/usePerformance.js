import { useState, useEffect } from "react"

/**
 * Hook para detectar capacidades del dispositivo y ajustar animaciones
 * @returns {Object} - Configuración de performance
 */
const usePerformance = () => {
  const [performanceLevel, setPerformanceLevel] = useState("high")
  const [deviceType, setDeviceType] = useState("desktop")

  useEffect(() => {
    if (typeof window === "undefined") return

    const detectPerformance = () => {
      // Detectar tipo de dispositivo
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      const isTablet =
        /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(
          navigator.userAgent
        )

      if (isMobile && !isTablet) {
        setDeviceType("mobile")
      } else if (isTablet) {
        setDeviceType("tablet")
      } else {
        setDeviceType("desktop")
      }

      // Detectar capacidades de hardware
      const hardwareConcurrency = navigator.hardwareConcurrency || 2
      const deviceMemory = navigator.deviceMemory || 4 // GB

      // Calcular nivel de performance
      if (isMobile) {
        // Móviles: moderado (permitir animaciones en la mayoría de dispositivos)
        if (hardwareConcurrency <= 2 && deviceMemory <= 1) {
          setPerformanceLevel("low")
        } else if (hardwareConcurrency <= 4 && deviceMemory <= 3) {
          setPerformanceLevel("medium")
        } else {
          setPerformanceLevel("high")
        }
      } else if (isTablet) {
        // Tablets: moderado
        if (hardwareConcurrency <= 2 || deviceMemory <= 2) {
          setPerformanceLevel("medium")
        } else {
          setPerformanceLevel("high")
        }
      } else {
        // Desktop: menos restrictivo
        if (hardwareConcurrency <= 2 || deviceMemory <= 2) {
          setPerformanceLevel("low")
        } else if (hardwareConcurrency <= 4 || deviceMemory <= 4) {
          setPerformanceLevel("medium")
        } else {
          setPerformanceLevel("high")
        }
      }
    }

    detectPerformance()
  }, [])

  // Configuraciones por nivel de performance
  const config = {
    low: {
      enableAnimations: false,
      maxElements: 0,
      enableParallax: false,
      enableBlur: false,
    },
    medium: {
      enableAnimations: true,
      maxElements: deviceType === "mobile" ? 3 : 5,
      enableParallax: false,
      enableBlur: true,
      reducedComplexity: true,
    },
    high: {
      enableAnimations: true,
      maxElements: deviceType === "mobile" ? 5 : deviceType === "tablet" ? 8 : 12,
      enableParallax: deviceType === "desktop",
      enableBlur: true,
      reducedComplexity: false,
    },
  }

  return {
    performanceLevel,
    deviceType,
    ...config[performanceLevel],
  }
}

export default usePerformance
