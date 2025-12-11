export default function Blog() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold font-heading mb-8 bg-gradient-to-r from-cyan-500 to-green-500 bg-clip-text text-transparent">
        Blog
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <article
            key={i}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-40 bg-gradient-to-br from-cyan-400/20 to-green-400/20"></div>
            <div className="p-6">
              <h2 className="text-xl font-bold font-heading mb-2">Article {i + 1}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Découvrez nos derniers articles sur l'environnement et la digitalisation.
              </p>
              <a href="#" className="text-cyan-500 hover:text-cyan-600 font-semibold">
                Lire plus →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
