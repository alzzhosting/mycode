"use client"

import { useState, useEffect } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { incrementVisitorCount } from "@/lib/firebase-config"
import { motion, AnimatePresence } from "framer-motion"

export default function VisitorCounter() {
  const [count, setCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Increment visitor count when component mounts
    incrementVisitorCount()

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(doc(db, "visitors", "total_visitors"), (doc) => {
      if (doc.exists()) {
        setCount(doc.data().count)
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="text-6xl font-bold text-rose-500 opacity-50">...</div>
        <div className="text-xl text-gray-400">Visitors</div>
      </div>
    )
  }

  const formattedCount = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(count)

  return (
    <div className="mb-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-6xl font-bold text-rose-500"
        >
          {formattedCount}
        </motion.div>
      </AnimatePresence>
      <div className="text-xl text-gray-400">Visitors</div>
    </div>
  )
}

