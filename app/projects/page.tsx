export default function Projects() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Projets & Initiatives</h1>
      <p className="mt-4">Liste des projets futurs et en cours.</p>
    </main>
  )
}
export default function Projects() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold font-heading mb-8 bg-gradient-to-r from-cyan-500 to-green-500 bg-clip-text text-transparent">
        Nos Projets
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
            <h3 className="text-xl font-bold font-heading mb-3">Projet {i + 1}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Description du projet pour l'environnement et la digitalisation.
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
