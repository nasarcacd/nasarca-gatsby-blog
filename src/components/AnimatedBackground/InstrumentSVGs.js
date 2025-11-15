import React from "react"

/**
 * Componentes SVG minimalistas de instrumentos musicales
 * Diseñados para ser ligeros y escalables
 */

export const AcousticGuitar = ({ color = "#6D4C41", opacity = 0.1 }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%", opacity }}
  >
    {/* Cuerpo de la guitarra */}
    <ellipse cx="100" cy="120" rx="45" ry="50" fill={color} />
    <ellipse cx="100" cy="120" rx="35" ry="40" fill="none" stroke={color} strokeWidth="2" />

    {/* Agujero de sonido */}
    <circle cx="100" cy="120" r="15" fill={color} opacity="0.5" />

    {/* Mástil */}
    <rect x="95" y="20" width="10" height="60" fill={color} />

    {/* Clavijero */}
    <rect x="90" y="10" width="20" height="15" rx="3" fill={color} />

    {/* Cuerdas */}
    {[88, 92, 96, 100, 104, 108].map((x, i) => (
      <line
        key={i}
        x1={x}
        y1="25"
        x2={x + (i - 2.5) * 2}
        y2="155"
        stroke={color}
        strokeWidth="0.5"
        opacity="0.6"
      />
    ))}
  </svg>
)

export const ElectricGuitar = ({ color = "#5D4037", opacity = 0.1 }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%", opacity }}
  >
    {/* Cuerpo asimétrico (estilo Stratocaster) */}
    <path
      d="M 80 60 Q 60 70, 60 100 Q 60 130, 80 145 L 120 145 Q 140 130, 140 100 Q 140 70, 120 60 Z"
      fill={color}
    />

    {/* Cutaway superior */}
    <path
      d="M 120 60 Q 130 65, 135 75 L 125 70 Z"
      fill={color}
      opacity="0.7"
    />

    {/* Mástil */}
    <rect x="95" y="15" width="10" height="50" fill={color} />

    {/* Clavijero */}
    <path
      d="M 85 5 L 95 15 L 105 15 L 115 5 L 105 10 L 95 10 Z"
      fill={color}
    />

    {/* Pastillas (pickups) */}
    <rect x="85" y="95" width="30" height="8" rx="2" fill={color} opacity="0.6" />
    <rect x="85" y="115" width="30" height="8" rx="2" fill={color} opacity="0.6" />

    {/* Puente */}
    <rect x="85" y="140" width="30" height="3" fill={color} />

    {/* Cuerdas */}
    {[88, 92, 96, 100, 104, 108].map((x, i) => (
      <line
        key={i}
        x1={x}
        y1="20"
        x2={x}
        y2="140"
        stroke={color}
        strokeWidth="0.5"
        opacity="0.5"
      />
    ))}
  </svg>
)

export const Violin = ({ color = "#8B4513", opacity = 0.1 }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%", opacity }}
  >
    {/* Cuerpo superior */}
    <ellipse cx="100" cy="80" rx="30" ry="25" fill={color} />

    {/* Cintura */}
    <rect x="92" y="95" width="16" height="20" fill={color} />

    {/* Cuerpo inferior */}
    <ellipse cx="100" cy="140" rx="35" ry="30" fill={color} />

    {/* Efes (agujeros en forma de f) */}
    <path
      d="M 90 75 Q 88 80, 90 85 Q 88 90, 90 95"
      stroke={color}
      strokeWidth="2"
      fill="none"
      opacity="0.6"
    />
    <path
      d="M 110 75 Q 112 80, 110 85 Q 112 90, 110 95"
      stroke={color}
      strokeWidth="2"
      fill="none"
      opacity="0.6"
    />

    {/* Mástil */}
    <rect x="96" y="30" width="8" height="55" fill={color} />

    {/* Clavijero */}
    <ellipse cx="100" cy="25" rx="10" ry="8" fill={color} />

    {/* Puente */}
    <rect x="95" y="125" width="10" height="8" rx="1" fill={color} opacity="0.7" />

    {/* Cuerdas */}
    {[94, 98, 102, 106].map((x, i) => (
      <line
        key={i}
        x1={x}
        y1="35"
        x2={x}
        y2="125"
        stroke={color}
        strokeWidth="0.5"
        opacity="0.5"
      />
    ))}

    {/* Barbada */}
    <path
      d="M 95 145 Q 100 150, 105 145"
      fill={color}
      opacity="0.6"
    />
  </svg>
)

export const Piano = ({ color = "#2C2C2C", opacity = 0.08 }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%", opacity }}
  >
    {/* Cuerpo del piano */}
    <rect x="40" y="80" width="120" height="80" rx="4" fill={color} />

    {/* Tapa */}
    <rect x="40" y="60" width="120" height="20" rx="2" fill={color} opacity="0.8" />

    {/* Teclas blancas */}
    {[45, 60, 75, 90, 105, 120, 135, 150].map((x, i) => (
      <rect
        key={i}
        x={x}
        y="100"
        width="12"
        height="40"
        fill="#fff"
        stroke={color}
        strokeWidth="1"
        opacity="0.3"
      />
    ))}

    {/* Teclas negras */}
    {[53, 68, 98, 113, 128].map((x, i) => (
      <rect
        key={i}
        x={x}
        y="100"
        width="8"
        height="25"
        fill={color}
        opacity="0.6"
      />
    ))}

    {/* Patas */}
    <rect x="50" y="160" width="8" height="30" fill={color} opacity="0.7" />
    <rect x="142" y="160" width="8" height="30" fill={color} opacity="0.7" />
  </svg>
)
