"use client"
import { motion } from "framer-motion"

export default function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1 }}
      className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
    />
  )
}
