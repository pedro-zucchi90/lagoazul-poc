"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import TourScene from "./components/tourScene"
import LoadingSpinner from "./components/loadingSpinner"

export default function Page() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  // Ensures TourScene is a valid React element and not a function/component reference
  const renderTourScene = () => <TourScene />

  return (
    <main
      className="flex flex-col min-h-screen text-white relative"
      style={{ background: "#111827" }}
    >
      {/* HERO: ocupa grande parte da tela */}
      <section className="relative w-full flex flex-col justify-center items-center flex-1 min-h-[70vh] max-h-[92vh] p-0 m-0">
        <h1 className="absolute top-10 left-0 right-0 text-4xl font-bold text-center drop-shadow-lg z-20 pointer-events-none">
          Tour Virtual
        </h1>

        {loading ? (
          <div className="flex items-center justify-center w-full h-full min-h-[400px] z-10">
            <LoadingSpinner />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="
              relative
              flex
              justify-center
              items-center
              w-full
              h-[60vh]
              sm:h-[70vh]
              md:h-[78vh]
              xl:h-[80vh]
              mx-auto
              rounded-none
              overflow-hidden
              shadow-2xl
              bg-black
              mt-20
            "
            style={{
              maxWidth: "100vw",
              background: "#111827"
            }}
          >
            {renderTourScene()}
          </motion.div>
        )}
      </section>
      <footer className="w-full py-8 text-center text-sm text-gray-400 z-10">
        © 2025 Prova de Conceito - PoC
      </footer>
    </main>
  )
}
