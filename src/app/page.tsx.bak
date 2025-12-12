import Hero from "@/components/sections/Hero"
import Stats from "@/components/sections/Stats"
import Projects from "@/components/sections/Projects"
import Image from "next/image"

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-primary-600 dark:text-primary-400">AMED</span> - Notre Mission
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  <strong>A</strong> - Association engagée pour la protection de l'environnement
                </p>
                <p>
                  <strong>M</strong> - Marocaine, fidèle aux valeurs nationales
                </p>
                <p>
                  <strong>E</strong> - Environnement durable pour les générations futures
                </p>
                <p>
                  <strong>D</strong> - Digitalisation pour l'accélération du progrès
                </p>
              </div>
            </div>
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700">
              <Image
                src="/amed-environmental-project.jpg"
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

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Partenaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {["Logo B", "Logo C", "Logo D", "Logo E", "Logo F", "Logo G"].map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm"
              >
                <div className="relative w-32 h-16">
                  <Image
                    src={`/partner-logo-.jpg?height=64&width=128&query=partner-logo-${index}`}
                    alt={`Partenaire ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="128px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
