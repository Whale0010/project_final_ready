import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Projets - AMED",
  description: "Découvrez nos projets environnementaux et digitaux",
}

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Reforestation Urbaine",
      description: "Programme de plantation d'arbres dans les zones urbaines du Maroc",
      category: "Environnement",
      status: "En cours",
    },
    {
      id: 2,
      title: "Plateforme Digitale Verte",
      description: "Solution numérique pour le suivi des émissions de carbone",
      category: "Digitalisation",
      status: "En cours",
    },
    {
      id: 3,
      title: "Formation Tech Écologique",
      description: "Formations gratuites en technologie verte pour les jeunes",
      category: "Formation",
      status: "Actif",
    },
    {
      id: 4,
      title: "Recyclage Électronique",
      description: "Collecte et recyclage responsable des déchets électroniques",
      category: "Environnement",
      status: "Lancé",
    },
  ]

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">Nos Projets</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Découvrez comment AMED œuvre pour transformer le Maroc
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="card p-6">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={`/.jpg?height=200&width=400&query=${project.title}`}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <span className="inline-block px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-full mb-2">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{project.status}</span>
                  <button className="text-primary-600 dark:text-primary-400 hover:underline">En savoir plus →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
