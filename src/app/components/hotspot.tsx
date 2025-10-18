"use client"

import { useState } from "react"
import { Html } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import React from "react"

interface HotspotProps {
  hotspot: {
    position: [number, number, number]
    label: string
    icon?: React.ElementType
    popupMessage?: string
  }
}

export default function Hotspot({ hotspot }: HotspotProps) {
  const [showPopup, setShowPopup] = useState(false)
  const Icon = hotspot.icon

  return (
    <group position={hotspot.position}>
      <Html center>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-blue-500/70 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-xs backdrop-blur-md flex items-center gap-1"
          type="button"
          onClick={() => setShowPopup(true)}
        >
          {Icon && <span>{React.createElement(Icon)}</span>}
          <span>{hotspot.label}</span>
        </motion.button>
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 8 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.22 }}
              className="absolute left-1/2 top-12 -translate-x-1/2 z-50"
            >
              <div className="bg-white/95 rounded-xl px-6 py-5 shadow-xl border-2 border-blue-500 max-w-xs min-w-[190px]">
                <div className="flex items-center gap-2 mb-2 text-xl font-semibold text-blue-700">
                  {Icon && <span>{React.createElement(Icon)}</span>}
                  <span>{hotspot.label}</span>
                </div>
                <div className="text-gray-900 text-sm mb-4">
                  {hotspot.popupMessage || "Informação do hotspot não disponível."}
                </div>
                <button
                  className="px-4 py-1 rounded bg-blue-700 text-white hover:bg-blue-800 font-medium mt-1"
                  onClick={() => setShowPopup(false)}
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Html>
    </group>
  )
}
