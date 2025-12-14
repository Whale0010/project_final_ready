import React from 'react'
import '../styles/globals.css'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Projects from '@/components/sections/Projects'
import Events from '@/components/sections/Events'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Hero />

      <Stats />

      {/* About Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                <span className="bg-gradient-to-r from-cyan-500 to-green-500 bg-clip-text text-transparent">AMED</span>{' '}
                - Notre Mission
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  <strong>Protection Environnementale</strong> - Promouvoir des initiatives durables pour protéger notre
                  écosystème
                </p>
                <p>
                  <strong>Transformation Digitale</strong> - Accélérer l'adoption des technologies numériques
                </p>
                <p>
                  <strong>Sensibilisation</strong> - Éduquer et mobiliser les citoyens marocains
                </p>
                <p>
                  <strong>Innovation</strong> - Développer des solutions créatives et durables
                </p>
                <p>
                  <strong>Partenariats</strong> - Collaborer avec des acteurs publics et privés
                </p>
              </div>
            </div>
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-green-400/20"></div>
              <Image
                src="/environnement-durabilit--maroc.jpg"
                alt="Projet AMED"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <Projects />

      <Events />

      {/* Partners Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-heading text-center mb-12">Nos Partenaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-12 bg-gradient-to-br from-cyan-100 to-green-100 dark:from-cyan-900/30 dark:to-green-900/30 rounded flex items-center justify-center text-gray-400 dark:text-gray-600 text-sm font-medium">
                  Logo {i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
