"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Reforestation Urbaine",
    description: "Programme de plantation d'arbres dans les zones urbaines du Maroc",
    image: "/tree-planting-urban-forest.jpg",
    category: "Environnement",
  },
  {
    id: 2,
    title: "Plateforme Digitale Verte",
    description: "Solution numérique pour le suivi des émissions de carbone",
    image: "/carbon-tracking-digital-platform.jpg",
    category: "Digitalisation",
  },
  {
    id: 3,
    title: "Formation Tech Écologique",
    description: "Formations gratuites en technologie verte pour les jeunes",
    image: "/tech-training-green-technology.jpg",
    category: "Formation",
  },
]

export default function Projects() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Projets Clés</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Découvrez les initiatives qui façonnent notre impact positif
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-full mb-3">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                <div className="flex items-center text-primary-600 dark:text-primary-400 hover:gap-2 transition-all">
                  Découvrir <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
