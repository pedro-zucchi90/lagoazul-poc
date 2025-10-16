"use client"

import { useState, useRef } from "react"
import { Canvas, useLoader } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { Suspense } from "react"
import Hotspot from "./hotspot"
import { LOCATIONS } from "../content/locals"
import { CameraControls } from "./cameraControls"

function HotspotWithPopup({
  hotspot,
  onClickHotspot
}: {
  hotspot: any,
  onClickHotspot: (hotspot: any) => void
}) {
  return (
    <group
      position={hotspot.position}
      onPointerDown={e => {
        e.stopPropagation()
        onClickHotspot(hotspot)
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer"
      }}
      onPointerOut={() => {
        document.body.style.cursor = ""
      }}
    >
      <Hotspot hotspot={hotspot} />
    </group>
  )
}

export default function TourScene() {
  const [currentLoc, setCurrentLoc] = useState(LOCATIONS[0].key)
  const [showHotspots, setShowHotspots] = useState(true)
  const [autoRotate, setAutoRotate] = useState(true)
  const [enablePan, setEnablePan] = useState(false)
  const [enableZoom, setEnableZoom] = useState(true)
  const [enableDamping, setEnableDamping] = useState(true)
  const [cameraState, setCameraState] = useState({ fov: 85 }) // FOV maior para mostrar mais área
  const [popupHotspot, setPopupHotspot] = useState<any>(null)
  const orbitRef = useRef<any>(null)
  const location = LOCATIONS.find(loc => loc.key === currentLoc)!

  function handleHotspotClick(hotspot: any) {
    if (hotspot.target) {
      setCurrentLoc(hotspot.target)
      setPopupHotspot(null)
      if (orbitRef.current) orbitRef.current.reset()
    } else {
      setPopupHotspot(hotspot)
    }
  }

  function SceneWrapper() {
    const texture = useLoader(THREE.TextureLoader, location.texture)
    return (
      <>
        {/* Aumenta o radius da esfera para garantir cobertura total do canvas */}
        <mesh scale={[1, 1, -1]}>
          <sphereGeometry args={[100, 64, 64]} />
          <meshBasicMaterial map={Array.isArray(texture) ? texture[0] : texture} side={THREE.BackSide} />
        </mesh>
        {showHotspots && location.hotspots.map((hotspot: any, idx: number) => (
          <HotspotWithPopup key={idx} hotspot={hotspot} onClickHotspot={handleHotspotClick} />
        ))}
      </>
    )
  }

  return (
    <section
      className="
        w-full
        max-w-full
        flex
        items-center
        justify-center
        overflow-hidden
        min-h-[70vh]
        md:min-h-[85vh]
        lg:min-h-[92vh]
        max-h-[100vh]
        py-0
        z-10
        relative
        bg-gray-900
      "
      style={{
        minHeight: "70vh",
        maxHeight: "100vh",
        width: "100%",
        position: "relative",
        padding: 0,
        background: "#111827" // fundo principal do site
      }}
    >
      <div
        className="
          w-full
          h-full
          absolute
          inset-0
          pointer-events-none
          z-0
        "
        aria-hidden
        style={{ background: "#111827" }}
      />
      <div
        className="
          relative
          w-full
          h-[65vh]
          md:h-[80vh]
          lg:h-[92vh]
          max-h-[1000px]
          flex
          flex-col
          items-stretch
        "
        style={{
          borderRadius: '1.5rem',
          margin: 0,
          padding: 0,
          position: "relative",
          overflow: "hidden",
          background: "#111827" // fundo igual ao fundo do site
        }}
      >
        {/* Alinhar nome da localização e botões de seleção juntos, um pouco mais para baixo */}
        <div
          className="z-20 pointer-events-auto flex items-center"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "6.5rem", // aumente este valor para mover todos mais para baixo
            paddingLeft: "2rem",
            paddingRight: "2rem",
            width: "100%",
            justifyContent: "space-between",
            gap: "2.5rem",
            pointerEvents: "auto",
          }}
        >
          {/* Nome da localização */}
          <div
            style={{
              background: "rgba(0,0,0,0.6)",
              padding: "0.5rem 1.2rem",
              borderRadius: "0.75rem",
              color: "white",
              fontWeight: 600,
              fontSize: "1.4rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "28vw"
            }}
          >
            {location.name}
          </div>
          {/* Botões seleção de local */}
          <div
            className="flex flex-wrap gap-3"
            style={{
              background: "rgba(17,24,39,0.8)",
              padding: "0.75rem 1.25rem",
              borderRadius: "1rem",
              overflowX: "auto",
              maxWidth: "38vw",
              minWidth: 0,
              display: "flex",
              alignItems: "center"
            }}
          >
            {LOCATIONS.map(loc => (
              <button
                key={loc.key}
                onClick={() => {
                  setCurrentLoc(loc.key)
                  setPopupHotspot(null)
                  if (orbitRef.current) orbitRef.current.reset()
                }}
                style={{
                  padding: "0.55rem 1.2rem",
                  borderRadius: "9999px",
                  fontSize: "1rem",
                  background: loc.key === currentLoc ? "#2563eb" : "#374151",
                  color: loc.key === currentLoc ? "#fff" : "#e5e7eb",
                  border: "none",
                  transition: "background 0.18s",
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                }}
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>
        {/* controles extras de painel - agora no canto inferior direito */}
        <div className="absolute right-4 bottom-16 md:right-8 md:bottom-24 z-20 bg-black/50 p-4 md:p-5 rounded-2xl flex flex-col gap-3 shadow-xl pointer-events-auto">
          <span className="text-sm text-white mb-3 font-semibold uppercase tracking-wide">Controles:</span>
          <label className="text-sm text-gray-200 flex gap-2 items-center">
            <input type="checkbox" checked={showHotspots} onChange={() => setShowHotspots(s => !s)} />
            Hotspots
          </label>
          <label className="text-sm text-gray-200 flex gap-2 items-center">
            <input type="checkbox" checked={autoRotate} onChange={() => setAutoRotate(s => !s)} />
            Rotação automática
          </label>
          <label className="text-sm text-gray-200 flex gap-2 items-center">
            <input type="checkbox" checked={enableZoom} onChange={() => setEnableZoom(s => !s)} />
            Zoom
          </label>
          <label className="text-sm text-gray-200 flex gap-2 items-center">
            <input type="checkbox" checked={enableDamping} onChange={() => setEnableDamping(s => !s)} />
            Inércia
          </label>
        </div>
        {/* controle de camera*/}
        <div className="absolute left-4 bottom-20 md:left-8 md:bottom-24 z-20 pointer-events-auto">
          <CameraControls cameraControl={orbitRef} setCameraState={setCameraState} cameraState={cameraState} />
        </div>
        {/* ---- Canvas ---- */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "1.5rem",
            overflow: "hidden",
            zIndex: 1,
            background: "#111827",
          }}
        >

          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: "1%",
              left: "2%",
              borderRadius: "1.5rem",
              overflow: "hidden",
              background: "transparent",
              boxShadow: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Canvas maior! */}
            <Canvas
              camera={{ position: [0, 0, 0.1], fov: cameraState.fov }}
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                borderRadius: "1.5rem",
                background: "transparent",
              }}
              className="!rounded-[1.5rem] !block"
            >
              <Suspense fallback={null}>
                <SceneWrapper />
                <OrbitControls
                  ref={orbitRef}
                  enableZoom={enableZoom}
                  enablePan={enablePan}
                  enableDamping={enableDamping}
                  autoRotate={autoRotate && !popupHotspot}
                  autoRotateSpeed={0.3}
                  maxPolarAngle={Math.PI}
                  minPolarAngle={0}
                />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  )
}
