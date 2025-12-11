import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Blog - AMED",
  description: "Lisez nos articles sur l'environnement et la digitalisation",
}

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "L'Impact du Changement Climatique au Maroc",
      excerpt: "Analyse des défis climatiques et des solutions durables pour notre pays",
      date: "1 Décembre 2024",
      author: "Dr. Ahmed Safi",
      category: "Environnement",
    },
    {
      id: 2,
      title: "Transformez Votre Entreprise Numériquement",
      excerpt: "Guide complet pour la digitalisation des PME marocaines",
      date: "28 Novembre 2024",
      author: "Fatima Bennani",
      category: "Digital",
    },
    {
      id: 3,
      title: "Les Villes Vertes du Futur",
      excerpt: "Comment concevoir des espaces urbains durables et respectueux de l'environnement",
      date: "25 Novembre 2024",
      author: "Mohammed Alaoui",
      category: "Urbanisme",
    },
  ]

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Articles et ressources sur l'environnement et la digitalisation
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.id} className="card overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={`/blog-.jpg?height=200&width=400&query=blog-${post.id}`}
                    alt={post.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-full mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{post.author}</p>
                      <p className="text-xs text-gray-400">{post.date}</p>
                    </div>
                    <button className="text-primary-600 dark:text-primary-400 hover:underline">Lire →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
