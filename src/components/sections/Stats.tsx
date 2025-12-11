"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Leaf, Cpu, Users, Trophy } from "lucide-react"

const stats = [
  { icon: Leaf, value: 50, label: "Projets Environnementaux", suffix: "+" },
  { icon: Cpu, value: 30, label: "Initiatives Digitales", suffix: "+" },
  { icon: Users, value: 500, label: "Membres Actifs", suffix: "+" },
  { icon: Trophy, value: 15, label: "Prix & Reconnaissances", suffix: "+" },
]

export default function Stats() {
  const [counted, setCounted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCounted(true)
        }
      },
      { threshold: 0.5 },
    )

    const element = document.getElementById("stats-section")
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats-section" className="py-16 bg-gradient-environment">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Notre Impact en Chiffres</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            AMED en quelques statistiques clés de notre engagement
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-white/20 rounded-full">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {counted ? `${stat.value}${stat.suffix}` : `0${stat.suffix}`}
              </div>
              <div className="text-white/90">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
