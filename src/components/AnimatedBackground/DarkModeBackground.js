import React, { useState, useEffect } from "react"
import styled, { keyframes, css } from "styled-components"
import PropTypes from "prop-types"

// Animaciones (MUCHO MÁS LENTAS)
const shootingStar = keyframes`
  0% {
    transform: translate(0, 0) rotate(45deg);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    transform: translate(-400px, 400px) rotate(45deg);
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
    transform: translateY(-15px) rotate(180deg);
  }
`

const twinkle = keyframes`
  0%, 100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
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
  background: linear-gradient(180deg, #000000 0%, #0a0a14 50%, #1a1a2e 100%);
`

// Estrella fugaz
const ShootingStar = styled.div`
  position: absolute;
  width: ${props => props.$length}px;
  height: 3px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%);
  filter: blur(0.5px);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.5);
  animation: ${shootingStar} ${props => props.$duration}s ease-in forwards;
  top: ${props => props.$top}%;
  left: ${props => props.$left}%;
  will-change: transform, opacity;
  ${props => props.$enableAnimations && css`
    animation-play-state: running;
  `}
`

// Galaxia espiral (más realista)
const Galaxy = styled.div`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border-radius: 50%;
  background: radial-gradient(
    ellipse at center,
    rgba(200, 160, 255, ${props => props.$opacity}) 0%,
    rgba(138, 43, 226, ${props => props.$opacity * 0.7}) 20%,
    rgba(75, 0, 130, ${props => props.$opacity * 0.4}) 50%,
    transparent 80%
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

// Planeta del sistema solar
const Planet = styled.div`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border-radius: 50%;
  background: radial-gradient(
    circle at ${props => props.$lightAngle || "35% 35%"},
    ${props => props.$color1} 0%,
    ${props => props.$color2} 40%,
    ${props => props.$color3} 80%,
    ${props => props.$color4 || props.$color3} 100%
  );
  box-shadow:
    inset -15px -15px 40px rgba(0, 0, 0, ${props => props.$shadowIntensity || 0.6}),
    0 0 ${props => props.$glowSize || 25}px rgba(${props => props.$glowColor}, ${props => props.$glowIntensity || 0.3});
  opacity: ${props => props.$opacity};
  animation: ${floatPlanet} ${props => props.$duration}s ease-in-out infinite;
  animation-delay: ${props => props.$delay || 0}s;
  top: ${props => props.$top}%;
  left: ${props => props.$left}%;
  will-change: transform;
  ${props => !props.$enableAnimations && css`
    animation: none;
  `}

  /* Anillos de Saturno */
  ${props => props.$hasRing && css`
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotateX(75deg);
      width: ${props.$size * 2.2}px;
      height: ${props.$size * 0.5}px;
      border-radius: 50%;
      background: radial-gradient(
        ellipse at center,
        transparent 30%,
        rgba(${props.$ringColor || "218, 165, 32"}, 0.4) 40%,
        rgba(${props.$ringColor || "218, 165, 32"}, 0.6) 50%,
        rgba(${props.$ringColor || "218, 165, 32"}, 0.3) 60%,
        transparent 80%
      );
      box-shadow: 0 0 20px rgba(${props.$ringColor || "218, 165, 32"}, 0.3);
    }
  `}

  /* Atmósfera terrestre */
  ${props => props.$hasAtmosphere && css`
    &::after {
      content: '';
      position: absolute;
      top: -5%;
      left: -5%;
      width: 110%;
      height: 110%;
      border-radius: 50%;
      background: radial-gradient(
        circle at center,
        transparent 60%,
        rgba(100, 149, 237, 0.3) 80%,
        transparent 100%
      );
    }
  `}
`

// Estrellas estáticas
const Star = styled.div`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 ${props => props.$size * 3}px rgba(255, 255, 255, ${props => props.$glow || 0.6});
  top: ${props => props.$top}%;
  left: ${props => props.$left}%;
  animation: ${twinkle} ${props => props.$duration}s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  ${props => !props.$enableAnimations && css`
    animation: none;
    opacity: 0.4;
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
        top: Math.random() * 30, // Solo en el tercio superior
        left: 60 + Math.random() * 40, // Desde la derecha
        duration: 3 + Math.random() * 3, // 3-6 segundos (MÁS LENTO)
        length: 150 + Math.random() * 150, // 150-300px (MÁS LARGO)
      }

      setShootingStars(prev => [...prev, star])

      setTimeout(() => {
        setShootingStars(prev => prev.filter(s => s.id !== id))
      }, star.duration * 1000)
    }

    // Crear estrella fugaz cada 8-15 segundos (MUCHO MÁS ESPACIADO)
    const interval = setInterval(() => {
      createShootingStar()
    }, 8000 + Math.random() * 7000)

    // Primera estrella después de 3 segundos
    const initialTimeout = setTimeout(createShootingStar, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(initialTimeout)
    }
  }, [enableAnimations])

  // Configuración de galaxias (MÁS LENTAS)
  const galaxies = [
    { top: 12, left: 18, size: 450, duration: 240, opacity: 0.12, blur: 60 },
    { top: 65, left: 75, size: 550, duration: 280, opacity: 0.10, blur: 70 },
    { top: 38, left: 50, size: 380, duration: 200, opacity: 0.08, blur: 50 },
  ].slice(0, Math.min(3, maxElements))

  // Sistema Solar - Planetas realistas (MÁS LENTOS)
  const planets = [
    // Sol (pequeño, en esquina)
    {
      name: "Sun",
      top: 5,
      left: 8,
      size: 40,
      duration: 0, // Sin animación de float
      delay: 0,
      opacity: 0.4,
      color1: "#FFF5E1",
      color2: "#FFD700",
      color3: "#FF8C00",
      color4: "#FF6347",
      glowColor: "255, 215, 0",
      glowSize: 40,
      glowIntensity: 0.6,
      shadowIntensity: 0.2,
      lightAngle: "50% 50%",
      hasRing: false,
      hasAtmosphere: false,
    },
    // Mercurio
    {
      name: "Mercury",
      top: 18,
      left: 20,
      size: 35,
      duration: 25,
      delay: 0,
      opacity: 0.3,
      color1: "#C0C0C0",
      color2: "#A9A9A9",
      color3: "#808080",
      color4: "#696969",
      glowColor: "169, 169, 169",
      glowSize: 8,
      glowIntensity: 0.2,
      shadowIntensity: 0.7,
      lightAngle: "30% 30%",
      hasRing: false,
      hasAtmosphere: false,
    },
    // Venus
    {
      name: "Venus",
      top: 30,
      left: 88,
      size: 55,
      duration: 30,
      delay: 2,
      opacity: 0.35,
      color1: "#FFF8DC",
      color2: "#EED5B7",
      color3: "#D2B48C",
      color4: "#BC987E",
      glowColor: "222, 184, 135",
      glowSize: 15,
      glowIntensity: 0.25,
      shadowIntensity: 0.5,
      lightAngle: "35% 35%",
      hasRing: false,
      hasAtmosphere: false,
    },
    // Tierra
    {
      name: "Earth",
      top: 55,
      left: 25,
      size: 60,
      duration: 35,
      delay: 1,
      opacity: 0.38,
      color1: "#87CEEB",
      color2: "#4682B4",
      color3: "#1E90FF",
      color4: "#00008B",
      glowColor: "70, 130, 180",
      glowSize: 20,
      glowIntensity: 0.3,
      shadowIntensity: 0.6,
      lightAngle: "35% 35%",
      hasRing: false,
      hasAtmosphere: true,
    },
    // Marte
    {
      name: "Mars",
      top: 75,
      left: 60,
      size: 45,
      duration: 28,
      delay: 3,
      opacity: 0.32,
      color1: "#FF6347",
      color2: "#CD5C5C",
      color3: "#8B4513",
      color4: "#A0522D",
      glowColor: "205, 92, 92",
      glowSize: 12,
      glowIntensity: 0.25,
      shadowIntensity: 0.65,
      lightAngle: "32% 32%",
      hasRing: false,
      hasAtmosphere: false,
    },
    // Júpiter
    {
      name: "Jupiter",
      top: 20,
      left: 55,
      size: 85,
      duration: 45,
      delay: 1.5,
      opacity: 0.35,
      color1: "#F4A460",
      color2: "#DAA520",
      color3: "#B8860B",
      color4: "#8B7355",
      glowColor: "218, 165, 32",
      glowSize: 25,
      glowIntensity: 0.3,
      shadowIntensity: 0.5,
      lightAngle: "38% 38%",
      hasRing: false,
      hasAtmosphere: false,
    },
    // Saturno (con anillos)
    {
      name: "Saturn",
      top: 65,
      left: 85,
      size: 75,
      duration: 40,
      delay: 2.5,
      opacity: 0.35,
      color1: "#F5DEB3",
      color2: "#DEB887",
      color3: "#D2B48C",
      color4: "#BC987E",
      glowColor: "222, 184, 135",
      glowSize: 22,
      glowIntensity: 0.28,
      shadowIntensity: 0.55,
      lightAngle: "35% 35%",
      hasRing: true,
      ringColor: "218, 165, 32",
      hasAtmosphere: false,
    },
    // Urano
    {
      name: "Uranus",
      top: 42,
      left: 12,
      size: 58,
      duration: 38,
      delay: 4,
      opacity: 0.28,
      color1: "#AFEEEE",
      color2: "#5F9EA0",
      color3: "#4682B4",
      color4: "#2F4F4F",
      glowColor: "95, 158, 160",
      glowSize: 18,
      glowIntensity: 0.25,
      shadowIntensity: 0.6,
      lightAngle: "33% 33%",
      hasRing: false,
      hasAtmosphere: false,
    },
    // Neptuno
    {
      name: "Neptune",
      top: 85,
      left: 35,
      size: 56,
      duration: 36,
      delay: 3.5,
      opacity: 0.30,
      color1: "#4169E1",
      color2: "#0000CD",
      color3: "#00008B",
      color4: "#191970",
      glowColor: "65, 105, 225",
      glowSize: 18,
      glowIntensity: 0.28,
      shadowIntensity: 0.62,
      lightAngle: "32% 32%",
      hasRing: false,
      hasAtmosphere: false,
    },
  ].slice(0, Math.min(9, maxElements + 2))

  // Estrellas estáticas (MÁS LENTAS)
  const stars = Array.from({ length: Math.min(80, maxElements * 6) }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 0.8 + Math.random() * 2.2,
    duration: 4 + Math.random() * 6, // 4-10 segundos (MÁS LENTO)
    delay: Math.random() * 8,
    glow: 0.3 + Math.random() * 0.5,
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
          $glow={star.glow}
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

      {/* Planetas del Sistema Solar */}
      {planets.map((planet, index) => (
        <Planet
          key={planet.name}
          $top={planet.top}
          $left={planet.left}
          $size={planet.size}
          $duration={planet.duration || 30}
          $delay={planet.delay}
          $opacity={planet.opacity}
          $color1={planet.color1}
          $color2={planet.color2}
          $color3={planet.color3}
          $color4={planet.color4}
          $glowColor={planet.glowColor}
          $glowSize={planet.glowSize}
          $glowIntensity={planet.glowIntensity}
          $shadowIntensity={planet.shadowIntensity}
          $lightAngle={planet.lightAngle}
          $hasRing={planet.hasRing}
          $ringColor={planet.ringColor}
          $hasAtmosphere={planet.hasAtmosphere}
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
