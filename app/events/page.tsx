export default function Events() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold font-heading mb-8 bg-gradient-to-r from-cyan-500 to-green-500 bg-clip-text text-transparent">
        Événements
      </h1>
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-cyan-500">
            <h3 className="text-2xl font-bold font-heading mb-2">Événement {i + 1}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Date: {new Date(Date.now() + i * 7 * 24 * 60 * 60 * 1000).toLocaleDateString("fr-FR")}
            </p>
            <p className="text-gray-600 dark:text-gray-300">Lieu: Casablanca, Maroc</p>
          </div>
        ))}
      </div>
    </div>
  )
}
