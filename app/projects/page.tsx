export default function Projects() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-8">Nos Projets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Projet {i + 1}</h3>
            <p className="text-gray-700">Description courte du projet.</p>
          </div>
        ))}
      </div>
    </div>
  )
}
