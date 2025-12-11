import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "À Propos - AMED",
  description: "En savoir plus sur l'Association Marocaine de l'Environnement et la Digitalisation",
}

export default function About() {
  const team = [
    { id: 1, name: "Mohammed Bennani", role: "Président", bio: "Fondateur et leader visionnaire" },
    { id: 2, name: "Fatima Al-Zahra", role: "Vice-Présidente", bio: "Responsable des projets environnementaux" },
    { id: 3, name: "Ahmed Safi", role: "Directeur Digital", bio: "Expert en transformation numérique" },
  ]

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">À Propos de AMED</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
            L'Association Marocaine de l'Environnement et la Digitalisation est une organisation à but non lucratif
            dédiée à la promotion de la durabilité environnementale et de la transformation digitale au Maroc.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Notre Vision</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Créer un Maroc où la protection de l'environnement et l'innovation digitale coexistent harmonieusement
                pour le bien-être de tous.
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3">✓</span>
                  <span>Durabilité environnementale</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3">✓</span>
                  <span>Innovation technologique</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-3">✓</span>
                  <span>Engagement communautaire</span>
                </li>
              </ul>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/interconnected-visions.png"
                alt="Vision AMED"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Notre Équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.id} className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={`/team-.jpg?height=96&width=96&query=team-${member.id}`}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover"
                    sizes="96px"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
