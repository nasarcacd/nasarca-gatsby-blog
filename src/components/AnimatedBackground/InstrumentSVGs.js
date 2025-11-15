import React from "react"

/**
 * Componentes SVG realistas de instrumentos musicales
 * Guitarra acústica y violonchelo con detalles mejorados
 */

export const AcousticGuitar = ({ color = "#8B4513", opacity = 0.08 }) => (
  <svg
    viewBox="0 0 200 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%", opacity }}
  >
    {/* Cuerpo principal de la guitarra */}
    <path
      d="M 100 140
         Q 70 145, 65 165
         Q 60 185, 65 205
         Q 70 225, 85 235
         Q 100 245, 115 235
         Q 130 225, 135 205
         Q 140 185, 135 165
         Q 130 145, 100 140 Z"
      fill={color}
      stroke={color}
      strokeWidth="1"
    />

    {/* Cuerpo inferior (más ancho) */}
    <ellipse cx="100" cy="210" rx="38" ry="45" fill={color} />

    {/* Cuerpo superior */}
    <ellipse cx="100" cy="160" rx="30" ry="35" fill={color} />

    {/* Agujero de resonancia (roseta) */}
    <circle cx="100" cy="185" r="18" fill="#3E2723" opacity="0.9" />
    <circle cx="100" cy="185" r="15" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
    <circle cx="100" cy="185" r="12" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />

    {/* Detalles de la roseta */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
      const rad = (angle * Math.PI) / 180
      const x = 100 + Math.cos(rad) * 13
      const y = 185 + Math.sin(rad) * 13
      return <circle key={i} cx={x} cy={y} r="1.5" fill={color} opacity="0.5" />
    })}

    {/* Mástil */}
    <rect x="94" y="20" width="12" height="125" fill={color} rx="2" />

    {/* Trastes (líneas en el mástil) */}
    {[35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 133].map((y, i) => (
      <line key={i} x1="94" y1={y} x2="106" y2={y} stroke="#E0E0E0" strokeWidth="0.8" opacity="0.4" />
    ))}

    {/* Clavijero */}
    <path
      d="M 94 10 L 94 25 L 106 25 L 106 10 Q 100 8, 94 10 Z"
      fill={color}
    />

    {/* Clavijas */}
    <circle cx="96" cy="13" r="2" fill="#666" />
    <circle cx="96" cy="18" r="2" fill="#666" />
    <circle cx="96" cy="23" r="2" fill="#666" />
    <circle cx="104" cy="13" r="2" fill="#666" />
    <circle cx="104" cy="18" r="2" fill="#666" />
    <circle cx="104" cy="23" r="2" fill="#666" />

    {/* Puente */}
    <rect x="88" y="242" width="24" height="4" rx="1" fill="#3E2723" opacity="0.8" />

    {/* Cuerdas */}
    {[92, 95, 98, 101, 104, 107].map((x, i) => (
      <line
        key={i}
        x1={x}
        y1="25"
        x2={x + (i - 2.5) * 0.5}
        y2="242"
        stroke="#C0C0C0"
        strokeWidth="0.4"
        opacity="0.7"
      />
    ))}

    {/* Golpeador (pickguard) */}
    <path
      d="M 108 170 Q 120 180, 122 200 Q 120 220, 110 230 L 105 225 Q 113 215, 115 200 Q 113 185, 106 175 Z"
      fill="#000"
      opacity="0.15"
    />
  </svg>
)

export const Cello = ({ color = "#6D4C41", opacity = 0.08 }) => (
  <svg
    viewBox="0 0 200 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%", opacity }}
  >
    {/* Cuerpo superior del violonchelo */}
    <ellipse cx="100" cy="100" rx="42" ry="50" fill={color} />

    {/* Cintura (C-bouts) */}
    <path
      d="M 80 130 Q 92 140, 100 145 Q 108 140, 120 130"
      fill={color}
      stroke={color}
      strokeWidth="2"
    />
    <rect x="92" y="130" width="16" height="35" fill={color} />

    {/* Cuerpo inferior (más grande) */}
    <ellipse cx="100" cy="190" rx="50" ry="60" fill={color} />

    {/* Perfil lateral izquierdo */}
    <path
      d="M 58 100 Q 52 130, 50 190 Q 52 215, 58 220"
      fill="none"
      stroke={color}
      strokeWidth="3"
      opacity="0.6"
    />

    {/* Perfil lateral derecho */}
    <path
      d="M 142 100 Q 148 130, 150 190 Q 148 215, 142 220"
      fill="none"
      stroke={color}
      strokeWidth="3"
      opacity="0.6"
    />

    {/* Efes (f-holes) - característicos del violonchelo */}
    <path
      d="M 85 95 Q 83 105, 85 115 Q 83 125, 85 135 M 85 105 L 80 105 M 85 125 L 80 125"
      stroke={color}
      strokeWidth="3"
      fill="none"
      opacity="0.7"
      strokeLinecap="round"
    />
    <path
      d="M 115 95 Q 117 105, 115 115 Q 117 125, 115 135 M 115 105 L 120 105 M 115 125 L 120 125"
      stroke={color}
      strokeWidth="3"
      fill="none"
      opacity="0.7"
      strokeLinecap="round"
    />

    {/* Mástil (más corto y grueso que violín) */}
    <rect x="94" y="20" width="12" height="85" fill={color} rx="1" />

    {/* Diapasón (fingerboard) */}
    <rect x="96" y="22" width="8" height="83" fill="#2C1810" opacity="0.8" />

    {/* Clavijero (scroll) */}
    <ellipse cx="100" cy="18" rx="12" ry="6" fill={color} />
    <path
      d="M 88 18 Q 88 12, 94 10 Q 100 8, 106 10 Q 112 12, 112 18"
      fill="none"
      stroke={color}
      strokeWidth="2"
    />

    {/* Clavijas */}
    <line x1="90" y1="18" x2="85" y2="18" stroke="#3E2723" strokeWidth="2" />
    <line x1="110" y1="18" x2="115" y2="18" stroke="#3E2723" strokeWidth="2" />
    <line x1="92" y1="14" x2="87" y2="12" stroke="#3E2723" strokeWidth="2" />
    <line x1="108" y1="14" x2="113" y2="12" stroke="#3E2723" strokeWidth="2" />

    {/* Puente (bridge) - más alto que en violín */}
    <path
      d="M 88 155 L 90 165 L 98 163 L 100 158 L 102 163 L 110 165 L 112 155 Z"
      fill="#D2691E"
      stroke={color}
      strokeWidth="1"
    />

    {/* Cordal (tailpiece) */}
    <path
      d="M 90 240 L 92 250 L 108 250 L 110 240 Z"
      fill="#2C1810"
      opacity="0.8"
    />

    {/* Botón final (endpin button) */}
    <circle cx="100" cy="248" r="3" fill="#3E2723" />

    {/* Cuerdas (4 cuerdas gruesas) */}
    {[94, 97.5, 102.5, 106].map((x, i) => (
      <React.Fragment key={i}>
        <line
          x1={x}
          y1="20"
          x2={x}
          y2="155"
          stroke="#C0C0C0"
          strokeWidth="0.6"
          opacity="0.7"
        />
        <line
          x1={x}
          y1="165"
          x2={x + (i - 1.5) * 0.8}
          y2="240"
          stroke="#C0C0C0"
          strokeWidth="0.6"
          opacity="0.7"
        />
      </React.Fragment>
    ))}

    {/* Barbada (chinrest) - más pronunciada */}
    <path
      d="M 88 220 Q 100 228, 112 220 Q 108 232, 100 235 Q 92 232, 88 220 Z"
      fill="#2C1810"
      opacity="0.7"
    />

    {/* Sombra interna para profundidad */}
    <ellipse
      cx="100"
      cy="100"
      rx="35"
      ry="42"
      fill="none"
      stroke="#000"
      strokeWidth="2"
      opacity="0.1"
    />
    <ellipse
      cx="100"
      cy="190"
      rx="42"
      ry="50"
      fill="none"
      stroke="#000"
      strokeWidth="2"
      opacity="0.1"
    />

    {/* Píquer (endpin/spike) - sobresale del cuerpo */}
    <line
      x1="100"
      y1="250"
      x2="100"
      y2="280"
      stroke="#2C2C2C"
      strokeWidth="2.5"
      opacity="0.6"
    />
    <circle cx="100" cy="280" r="2" fill="#2C2C2C" opacity="0.6" />
  </svg>
)

// Mantener ElectricGuitar y Piano como alternativas
export const ElectricGuitar = ({ color = "#5D4037", opacity = 0.06 }) => (
  <svg
    viewBox="0 0 200 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%", opacity }}
  >
    {/* Cuerpo asimétrico estilo Stratocaster */}
    <path
      d="M 85 120
         Q 70 125, 65 145
         Q 60 165, 65 185
         Q 70 205, 85 215
         L 115 215
         Q 130 205, 135 185
         Q 140 165, 135 145
         Q 130 125, 115 120
         Z"
      fill={color}
    />

    {/* Cutaway superior */}
    <path
      d="M 115 120 Q 130 125, 138 138 L 125 130 Z"
      fill={color}
      opacity="0.7"
    />

    {/* Mástil */}
    <rect x="94" y="20" width="12" height="105" fill={color} rx="2" />

    {/* Trastes */}
    {[30, 40, 50, 60, 70, 80, 90, 100, 110].map((y, i) => (
      <line key={i} x1="94" y1={y} x2="106" y2={y} stroke="#CCC" strokeWidth="0.6" opacity="0.3" />
    ))}

    {/* Clavijero */}
    <path
      d="M 90 10 L 94 20 L 106 20 L 110 10 L 106 15 L 94 15 Z"
      fill={color}
    />

    {/* Pastillas (pickups) */}
    <rect x="82" y="155" width="36" height="10" rx="2" fill="#1a1a1a" opacity="0.7" />
    <rect x="82" y="180" width="36" height="10" rx="2" fill="#1a1a1a" opacity="0.7" />
    <rect x="82" y="195" width="36" height="6" rx="1" fill="#1a1a1a" opacity="0.7" />

    {/* Controles */}
    <circle cx="125" cy="160" r="4" fill="#1a1a1a" opacity="0.6" />
    <circle cx="125" cy="175" r="4" fill="#1a1a1a" opacity="0.6" />
    <circle cx="125" cy="190" r="3" fill="#1a1a1a" opacity="0.6" />

    {/* Puente (bridge) */}
    <rect x="85" y="210" width="30" height="4" fill="#3a3a3a" opacity="0.8" />

    {/* Cuerdas */}
    {[92, 95, 98, 101, 104, 107].map((x, i) => (
      <line
        key={i}
        x1={x}
        y1="22"
        x2={x}
        y2="210"
        stroke="#B0B0B0"
        strokeWidth="0.4"
        opacity="0.6"
      />
    ))}

    {/* Golpeador (pickguard) */}
    <path
      d="M 108 130 Q 125 140, 130 165 Q 128 190, 115 210 L 108 205 Q 118 185, 120 165 Q 118 145, 110 135 Z"
      fill="#000"
      opacity="0.12"
    />
  </svg>
)

export const Piano = ({ color = "#1a1a1a", opacity = 0.05 }) => (
  <svg
    viewBox="0 0 240 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%", opacity }}
  >
    {/* Cuerpo del piano de cola */}
    <path
      d="M 40 60 Q 30 80, 30 100 Q 30 120, 40 140 L 200 140 Q 220 120, 220 100 Q 220 80, 200 60 Z"
      fill={color}
    />

    {/* Tapa */}
    <path
      d="M 40 50 Q 30 55, 30 60 L 220 60 Q 220 55, 200 50 Z"
      fill={color}
      opacity="0.9"
    />

    {/* Patas */}
    <rect x="50" y="140" width="8" height="35" fill={color} opacity="0.8" rx="2" />
    <rect x="120" y="140" width="8" height="35" fill={color} opacity="0.8" rx="2" />
    <rect x="190" y="140" width="8" height="35" fill={color} opacity="0.8" rx="2" />

    {/* Teclado - teclas blancas */}
    {[50, 65, 80, 95, 110, 125, 140, 155, 170, 185, 200].map((x, i) => (
      <rect
        key={i}
        x={x}
        y="85"
        width="14"
        height="40"
        fill="#FAFAFA"
        stroke={color}
        strokeWidth="1"
        opacity="0.4"
        rx="1"
      />
    ))}

    {/* Teclado - teclas negras */}
    {[58, 73, 103, 118, 133, 163, 178, 193].map((x, i) => (
      <rect
        key={i}
        x={x}
        y="85"
        width="9"
        height="26"
        fill={color}
        opacity="0.7"
        rx="1"
      />
    ))}

    {/* Atril */}
    <rect x="110" y="35" width="40" height="3" fill={color} opacity="0.6" />
    <line x1="130" y1="38" x2="130" y2="50" stroke={color} strokeWidth="2" opacity="0.6" />
  </svg>
)
