"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    image: "/environmental-protection-morocco-nature.jpg",
    title: "Protéger Notre Environnement",
    description: "Ensemble pour un Maroc plus vert et durable",
  },
  {
    id: 2,
    image: "/digital-transformation-technology-innovation.jpg",
    title: "Accélérer la Transformation Digitale",
    description: "Technologie au service du développement",
  },
  {
    id: 3,
    image: "/sustainable-development-green-future.jpg",
    title: "Développement Durable",
    description: "Innovation pour un avenir meilleur",
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
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentSlide === index ? 1 : 0,
          }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/50 to-transparent z-10" />
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
        </motion.div>
      ))}

      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Association Marocaine de l'Environnement et la Digitalisation
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Promouvoir la protection environnementale et la transformation digitale pour un Maroc innovant et durable
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary-600 rounded-full hover:bg-primary-700 transition-colors">
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
