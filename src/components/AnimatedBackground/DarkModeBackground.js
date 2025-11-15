import React, { useState, useEffect } from "react"
import styled, { keyframes, css } from "styled-components"
import PropTypes from "prop-types"

// Animaciones
const shootingStar = keyframes`
  0% {
    transform: translate(0, 0) rotate(45deg);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translate(-300px, 300px) rotate(45deg);
    opacity: 0;
  }
`

const rotateGalaxy = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const floatPlanet = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
`

const twinkle = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`

// Contenedor principal
const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
  pointer-events: none;
  background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%);
`

// Estrella fugaz
const ShootingStar = styled.div`
  position: absolute;
  width: ${props => props.$length}px;
  height: 2px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.8) 0%, transparent 100%);
  filter: blur(1px);
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
  animation: ${shootingStar} ${props => props.$duration}s ease-in forwards;
  top: ${props => props.$top}%;
  left: ${props => props.$left}%;
  will-change: transform, opacity;
  ${props => props.$enableAnimations && css`
    animation-play-state: running;
  `}
`

// Galaxia espiral
const Galaxy = styled.div`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border-radius: 50%;
  background: radial-gradient(
    ellipse at center,
    rgba(138, 43, 226, ${props => props.$opacity}) 0%,
    rgba(75, 0, 130, ${props => props.$opacity * 0.5}) 30%,
    transparent 70%
  );
  filter: blur(${props => props.$blur}px);
  animation: ${rotateGalaxy} ${props => props.$duration}s linear infinite;
  top: ${props => props.$top}%;
  left: ${props => props.$left}%;
  will-change: transform;
  ${props => !props.$enableAnimations && css`
    animation: none;
  `}
`

// Planeta
const Planet = styled.div`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    ${props => props.$color1} 0%,
    ${props => props.$color2} 50%,
    ${props => props.$color3} 100%
  );
  box-shadow:
    inset -10px -10px 20px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(${props => props.$glowColor}, 0.3);
  opacity: ${props => props.$opacity};
  animation: ${floatPlanet} ${props => props.$duration}s ease-in-out infinite;
  top: ${props => props.$top}%;
  left: ${props => props.$left}%;
  will-change: transform;
  ${props => !props.$enableAnimations && css`
    animation: none;
  `}

  ${props => props.$hasRing && css`
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotateX(75deg);
      width: ${props.$size * 1.8}px;
      height: ${props.$size * 0.4}px;
      border-radius: 50%;
      border: 3px solid rgba(${props.$glowColor}, 0.3);
      border-top-color: transparent;
      border-bottom-color: transparent;
    }
  `}
`

// Estrellas estáticas con twinkle
const Star = styled.div`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 ${props => props.$size * 2}px rgba(255, 255, 255, 0.8);
  top: ${props => props.$top}%;
  left: ${props => props.$left}%;
  animation: ${twinkle} ${props => props.$duration}s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  ${props => !props.$enableAnimations && css`
    animation: none;
    opacity: 0.5;
  `}
`

const DarkModeBackground = ({ enableAnimations, maxElements, enableBlur }) => {
  const [shootingStars, setShootingStars] = useState([])

  useEffect(() => {
    if (!enableAnimations) return

    const createShootingStar = () => {
      const id = Date.now() + Math.random()
      const star = {
        id,
        top: Math.random() * 40, // Solo en la parte superior
        left: 50 + Math.random() * 50, // Desde la mitad derecha
        duration: 1.5 + Math.random() * 1.5, // 1.5-3s
        length: 100 + Math.random() * 100, // 100-200px
      }

      setShootingStars(prev => [...prev, star])

      // Remover después de la animación
      setTimeout(() => {
        setShootingStars(prev => prev.filter(s => s.id !== id))
      }, star.duration * 1000)
    }

    // Crear estrella fugaz cada 3-5 segundos
    const interval = setInterval(() => {
      createShootingStar()
    }, 3000 + Math.random() * 2000)

    return () => clearInterval(interval)
  }, [enableAnimations])

  // Configuración de galaxias
  const galaxies = [
    { top: 15, left: 20, size: 400, duration: 100, opacity: 0.15, blur: 50 },
    { top: 60, left: 70, size: 500, duration: 120, opacity: 0.12, blur: 55 },
    { top: 40, left: 45, size: 350, duration: 90, opacity: 0.1, blur: 45 },
  ].slice(0, Math.min(3, maxElements))

  // Configuración de planetas
  const planets = [
    {
      top: 25,
      left: 75,
      size: 80,
      duration: 8,
      opacity: 0.25,
      color1: "#ff6b35",
      color2: "#f7931e",
      color3: "#c73e1d",
      glowColor: "247, 147, 30",
      hasRing: false,
    },
    {
      top: 65,
      left: 15,
      size: 120,
      duration: 10,
      opacity: 0.2,
      color1: "#4a90e2",
      color2: "#357abd",
      color3: "#2e5f8f",
      glowColor: "74, 144, 226",
      hasRing: true,
    },
    {
      top: 10,
      left: 40,
      size: 60,
      duration: 6,
      opacity: 0.18,
      color1: "#9b59b6",
      color2: "#8e44ad",
      color3: "#6c3483",
      glowColor: "155, 89, 182",
      hasRing: false,
    },
    {
      top: 80,
      left: 85,
      size: 100,
      duration: 9,
      opacity: 0.22,
      color1: "#1abc9c",
      color2: "#16a085",
      color3: "#117a65",
      glowColor: "26, 188, 156",
      hasRing: false,
    },
    {
      top: 45,
      left: 10,
      size: 70,
      duration: 7,
      opacity: 0.2,
      color1: "#e74c3c",
      color2: "#c0392b",
      color3: "#a93226",
      glowColor: "231, 76, 60",
      hasRing: false,
    },
  ].slice(0, Math.min(5, maxElements))

  // Configuración de estrellas estáticas
  const stars = Array.from({ length: Math.min(50, maxElements * 5) }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 1 + Math.random() * 2,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 5,
  }))

  return (
    <BackgroundContainer>
      {/* Estrellas estáticas */}
      {stars.map(star => (
        <Star
          key={star.id}
          $top={star.top}
          $left={star.left}
          $size={star.size}
          $duration={star.duration}
          $delay={star.delay}
          $enableAnimations={enableAnimations}
        />
      ))}

      {/* Galaxias */}
      {enableBlur && galaxies.map((galaxy, index) => (
        <Galaxy
          key={index}
          $top={galaxy.top}
          $left={galaxy.left}
          $size={galaxy.size}
          $duration={galaxy.duration}
          $opacity={galaxy.opacity}
          $blur={galaxy.blur}
          $enableAnimations={enableAnimations}
        />
      ))}

      {/* Planetas */}
      {planets.map((planet, index) => (
        <Planet
          key={index}
          $top={planet.top}
          $left={planet.left}
          $size={planet.size}
          $duration={planet.duration}
          $opacity={planet.opacity}
          $color1={planet.color1}
          $color2={planet.color2}
          $color3={planet.color3}
          $glowColor={planet.glowColor}
          $hasRing={planet.hasRing}
          $enableAnimations={enableAnimations}
        />
      ))}

      {/* Estrellas fugaces */}
      {enableAnimations && shootingStars.map(star => (
        <ShootingStar
          key={star.id}
          $top={star.top}
          $left={star.left}
          $duration={star.duration}
          $length={star.length}
          $enableAnimations={enableAnimations}
        />
      ))}
    </BackgroundContainer>
  )
}

DarkModeBackground.propTypes = {
  enableAnimations: PropTypes.bool,
  maxElements: PropTypes.number,
  enableBlur: PropTypes.bool,
}

DarkModeBackground.defaultProps = {
  enableAnimations: true,
  maxElements: 12,
  enableBlur: true,
}

export default DarkModeBackground
