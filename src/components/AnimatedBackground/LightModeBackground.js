import React, { useState, useEffect } from "react"
import styled, { keyframes, css } from "styled-components"
import PropTypes from "prop-types"
import {
  AcousticGuitar,
  ElectricGuitar,
  Violin,
  Piano,
} from "./InstrumentSVGs"

// Animaciones
const floatUp = keyframes`
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.7;
  }
  90% {
    opacity: 0.7;
  }
  100% {
    transform: translateY(-100vh) translateX(var(--drift)) rotate(var(--rotation));
    opacity: 0;
  }
`

const sway = keyframes`
  0%, 100% {
    transform: rotate(var(--rotate-start));
  }
  50% {
    transform: rotate(var(--rotate-end));
  }
`

const pulseScale = keyframes`
  0%, 100% {
    transform: scale(1) rotate(var(--base-rotation));
  }
  50% {
    transform: scale(1.02) rotate(var(--base-rotation));
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
  background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);
`

// Nota musical flotante
const MusicNote = styled.div`
  position: absolute;
  font-size: ${props => props.$size}rem;
  color: ${props => props.$color};
  opacity: 0;
  bottom: -50px;
  left: ${props => props.$left}%;
  animation: ${floatUp} ${props => props.$duration}s ease-in-out forwards;
  animation-delay: ${props => props.$delay}s;
  will-change: transform, opacity;
  --drift: ${props => props.$drift}px;
  --rotation: ${props => props.$rotation}deg;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);

  ${props => props.$enableAnimations && css`
    animation-play-state: running;
  `}
`

// Contenedor de instrumento
const InstrumentContainer = styled.div`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  top: ${props => props.$top}%;
  left: ${props => props.$left}%;
  animation:
    ${sway} ${props => props.$swayDuration}s ease-in-out infinite,
    ${pulseScale} ${props => props.$pulseDuration}s ease-in-out infinite;
  --rotate-start: ${props => props.$rotateStart}deg;
  --rotate-end: ${props => props.$rotateEnd}deg;
  --base-rotation: ${props => props.$baseRotation}deg;
  will-change: transform;

  ${props => !props.$enableAnimations && css`
    animation: none;
  `}
`

const LightModeBackground = ({ enableAnimations, maxElements, deviceType }) => {
  const [musicNotes, setMusicNotes] = useState([])

  // Símbolos de notas musicales
  const noteSymbols = ["♪", "♫", "♬", "🎵", "🎶"]

  // Paleta de colores tierra/dorado
  const colors = [
    "#5D4037", // Marrón oscuro
    "#6D4C41",
    "#8B4513", // Madera
    "#A0522D",
    "#D4AF37", // Dorado
    "#DAA520",
    "#F57C00", // Ámbar
  ]

  useEffect(() => {
    if (!enableAnimations) return

    const createMusicNote = () => {
      const id = Date.now() + Math.random()
      const note = {
        id,
        symbol: noteSymbols[Math.floor(Math.random() * noteSymbols.length)],
        left: Math.random() * 100,
        size: 1 + Math.random() * 1, // 1-2rem
        duration: 8 + Math.random() * 7, // 8-15s
        delay: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        drift: (Math.random() - 0.5) * 100, // -50 a 50px
        rotation: (Math.random() - 0.5) * 30, // -15 a 15 grados
      }

      setMusicNotes(prev => {
        // Limitar cantidad de notas visibles
        const maxNotes = Math.min(8, maxElements)
        const filtered = prev.slice(-maxNotes + 1)
        return [...filtered, note]
      })

      // Remover después de la animación
      setTimeout(() => {
        setMusicNotes(prev => prev.filter(n => n.id !== id))
      }, note.duration * 1000)
    }

    // Crear nota cada 1.5-3 segundos
    const interval = setInterval(() => {
      createMusicNote()
    }, 1500 + Math.random() * 1500)

    // Crear algunas notas iniciales
    for (let i = 0; i < Math.min(3, maxElements); i++) {
      setTimeout(() => createMusicNote(), i * 500)
    }

    return () => clearInterval(interval)
  }, [enableAnimations, maxElements])

  // Configuración de instrumentos según tipo de dispositivo
  const getInstruments = () => {
    const baseInstruments = [
      {
        Component: Violin,
        top: 10,
        left: 5,
        size: deviceType === "mobile" ? 150 : 250,
        color: "#8B4513",
        opacity: 0.08,
        swayDuration: 5,
        pulseDuration: 4,
        rotateStart: -3,
        rotateEnd: 3,
        baseRotation: 15,
      },
      {
        Component: AcousticGuitar,
        top: 70,
        left: 80,
        size: deviceType === "mobile" ? 180 : 300,
        color: "#6D4C41",
        opacity: 0.1,
        swayDuration: 6,
        pulseDuration: 5,
        rotateStart: -5,
        rotateEnd: 5,
        baseRotation: -10,
      },
      {
        Component: ElectricGuitar,
        top: 40,
        left: 50,
        size: deviceType === "mobile" ? 200 : 350,
        color: "#5D4037",
        opacity: 0.06,
        swayDuration: 7,
        pulseDuration: 6,
        rotateStart: -4,
        rotateEnd: 4,
        baseRotation: 0,
      },
      {
        Component: Piano,
        top: 80,
        left: 20,
        size: deviceType === "mobile" ? 120 : 200,
        color: "#2C2C2C",
        opacity: 0.05,
        swayDuration: 8,
        pulseDuration: 7,
        rotateStart: -2,
        rotateEnd: 2,
        baseRotation: 5,
      },
    ]

    // Filtrar según tipo de dispositivo
    if (deviceType === "mobile") {
      return baseInstruments.slice(0, 0) // No mostrar instrumentos en móviles
    } else if (deviceType === "tablet") {
      return baseInstruments.slice(0, 2)
    } else {
      return baseInstruments.slice(0, Math.min(4, maxElements))
    }
  }

  const instruments = getInstruments()

  return (
    <BackgroundContainer>
      {/* Instrumentos decorativos */}
      {instruments.map((instrument, index) => (
        <InstrumentContainer
          key={index}
          $top={instrument.top}
          $left={instrument.left}
          $size={instrument.size}
          $swayDuration={instrument.swayDuration}
          $pulseDuration={instrument.pulseDuration}
          $rotateStart={instrument.rotateStart}
          $rotateEnd={instrument.rotateEnd}
          $baseRotation={instrument.baseRotation}
          $enableAnimations={enableAnimations}
        >
          <instrument.Component color={instrument.color} opacity={instrument.opacity} />
        </InstrumentContainer>
      ))}

      {/* Notas musicales flotantes */}
      {enableAnimations && musicNotes.map(note => (
        <MusicNote
          key={note.id}
          $left={note.left}
          $size={note.size}
          $duration={note.duration}
          $delay={note.delay}
          $color={note.color}
          $drift={note.drift}
          $rotation={note.rotation}
          $enableAnimations={enableAnimations}
        >
          {note.symbol}
        </MusicNote>
      ))}
    </BackgroundContainer>
  )
}

LightModeBackground.propTypes = {
  enableAnimations: PropTypes.bool,
  maxElements: PropTypes.number,
  deviceType: PropTypes.oneOf(["mobile", "tablet", "desktop"]),
}

LightModeBackground.defaultProps = {
  enableAnimations: true,
  maxElements: 12,
  deviceType: "desktop",
}

export default LightModeBackground
