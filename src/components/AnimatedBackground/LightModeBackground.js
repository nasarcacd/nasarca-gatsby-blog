import React, { useState, useEffect } from "react"
import styled, { keyframes, css } from "styled-components"
import PropTypes from "prop-types"
import {
  AcousticGuitar,
  Cello,
  ElectricGuitar,
  Piano,
} from "./InstrumentSVGs"

// Animaciones (MUCHO MÁS LENTAS)
const floatUp = keyframes`
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0;
  }
  5% {
    opacity: 0.6;
  }
  95% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-110vh) translateX(var(--drift)) rotate(var(--rotation));
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
    transform: scale(1.01) rotate(var(--base-rotation));
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
  background: linear-gradient(180deg, #FEFEFE 0%, #F5F5F5 50%, #FFFFFF 100%);
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
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);

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

  // Paleta de colores tierra/dorado/madera
  const colors = [
    "#5D4037", // Marrón oscuro
    "#6D4C41", // Marrón medio
    "#8B4513", // Madera
    "#A0522D", // Sienna
    "#D4AF37", // Dorado
    "#C19A6B", // Camello
    "#CD853F", // Perú
  ]

  useEffect(() => {
    if (!enableAnimations) return

    const createMusicNote = () => {
      const id = Date.now() + Math.random()
      const note = {
        id,
        symbol: noteSymbols[Math.floor(Math.random() * noteSymbols.length)],
        left: 10 + Math.random() * 80, // Entre 10% y 90%
        size: 1.2 + Math.random() * 0.8, // 1.2-2rem
        duration: 18 + Math.random() * 12, // 18-30 segundos (MUCHO MÁS LENTO)
        delay: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        drift: (Math.random() - 0.5) * 80, // -40 a 40px (menos drift)
        rotation: (Math.random() - 0.5) * 25, // -12.5 a 12.5 grados
      }

      setMusicNotes(prev => {
        // Limitar cantidad de notas visibles
        const maxNotes = Math.min(6, maxElements)
        const filtered = prev.slice(-maxNotes + 1)
        return [...filtered, note]
      })

      // Remover después de la animación
      setTimeout(() => {
        setMusicNotes(prev => prev.filter(n => n.id !== id))
      }, note.duration * 1000)
    }

    // Crear nota cada 4-8 segundos (MUCHO MÁS ESPACIADO)
    const interval = setInterval(() => {
      createMusicNote()
    }, 4000 + Math.random() * 4000)

    // Crear algunas notas iniciales con delay
    for (let i = 0; i < Math.min(2, maxElements); i++) {
      setTimeout(() => createMusicNote(), i * 2000)
    }

    return () => clearInterval(interval)
  }, [enableAnimations, maxElements])

  // Configuración de instrumentos (MÁS LENTOS)
  const getInstruments = () => {
    const baseInstruments = [
      {
        Component: Cello,
        top: 8,
        left: 3,
        size: deviceType === "mobile" ? 180 : 280,
        color: "#6D4C41",
        opacity: 0.09,
        swayDuration: 12, // Más lento
        pulseDuration: 10, // Más lento
        rotateStart: -2,
        rotateEnd: 2,
        baseRotation: 12,
      },
      {
        Component: AcousticGuitar,
        top: 68,
        left: 78,
        size: deviceType === "mobile" ? 200 : 320,
        color: "#8B4513",
        opacity: 0.10,
        swayDuration: 14, // Más lento
        pulseDuration: 11, // Más lento
        rotateStart: -2.5,
        rotateEnd: 2.5,
        baseRotation: -8,
      },
      {
        Component: ElectricGuitar,
        top: 38,
        left: 48,
        size: deviceType === "mobile" ? 220 : 360,
        color: "#5D4037",
        opacity: 0.05,
        swayDuration: 16, // Más lento
        pulseDuration: 13, // Más lento
        rotateStart: -2,
        rotateEnd: 2,
        baseRotation: 0,
      },
      {
        Component: Piano,
        top: 82,
        left: 18,
        size: deviceType === "mobile" ? 140 : 220,
        color: "#1a1a1a",
        opacity: 0.04,
        swayDuration: 18, // Más lento
        pulseDuration: 15, // Más lento
        rotateStart: -1.5,
        rotateEnd: 1.5,
        baseRotation: 3,
      },
    ]

    // Filtrar según tipo de dispositivo
    if (deviceType === "mobile") {
      return baseInstruments.slice(0, 0) // No mostrar instrumentos en móviles
    } else if (deviceType === "tablet") {
      return baseInstruments.slice(0, 2)
    } else {
      return baseInstruments.slice(0, Math.min(3, maxElements))
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
