"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Protéger Notre Environnement",
    description: "Initiatives durables pour préserver notre écosystème marocain",
  },
  {
    id: 2,
    title: "Accélérer la Transformation Digitale",
    description: "Solutions technologiques innovantes pour un Maroc connecté",
  },
  {
    id: 3,
    title: "Développement Durable",
    description: "Créer un avenir meilleur pour les générations futures",
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-gradient-to-r from-cyan-500 to-green-500">
      {/* Content */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-6">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl text-white/90 mb-8">{slides[currentSlide].description}</p>
            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-cyan-600 rounded-full hover:bg-cyan-700 transition-colors">
                Découvrir nos projets
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
              <button className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-transparent border-2 border-white rounded-full hover:bg-white/10 transition-colors">
                Nous rejoindre
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
