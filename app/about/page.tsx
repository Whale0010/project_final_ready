export default function About() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold font-heading mb-8 bg-gradient-to-r from-cyan-500 to-green-500 bg-clip-text text-transparent">
        À Propos d'AMED
      </h1>
      <div className="prose prose-invert max-w-4xl">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          L'Association Marocaine de l'Environnement et la Digitalisation (AMED) est une organisation dédiée à la
          promotion de la protection environnementale et de la transformation numérique au Maroc.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Notre mission est de créer un impact positif en sensibilisant les citoyens, en développant des projets
          innovants et en collaborant avec des partenaires clés.
        </p>
      </div>
    </div>
  )
}
