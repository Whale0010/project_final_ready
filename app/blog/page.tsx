export default function Blog() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <article key={i} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Article {i + 1}</h2>
            <p className="text-gray-700">Découvrir les actions et projets d'AMED.</p>
          </article>
        ))}
      </div>
    </div>
  )
}
