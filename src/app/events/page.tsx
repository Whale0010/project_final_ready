import type { Metadata } from "next"
import { Calendar, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Événements - AMED",
  description: "Consulter nos événements et webinaires",
}

export default function Events() {
  const events = [
    {
      id: 1,
      title: "Conférence sur la Durabilité",
      date: "15 Décembre 2024",
      location: "Rabat",
      description: "Débat sur les enjeux environnementaux du Maroc",
    },
    {
      id: 2,
      title: "Atelier Digital & Green Tech",
      date: "22 Décembre 2024",
      location: "Casablanca",
      description: "Formation pratique aux technologies vertes",
    },
    {
      id: 3,
      title: "Webinaire Transformation Digitale",
      date: "29 Décembre 2024",
      location: "En ligne",
      description: "Accélérer votre transition digitale",
    },
  ]

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">Événements & Webinaires</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Rejoignez-nous pour des événements inspirants et éducatifs
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {events.map((event) => (
              <div key={event.id} className="card p-6 border-l-4 border-primary-600">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{event.description}</p>
                    <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary-600" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary-600" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                  <div className="md:text-right">
                    <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      S'inscrire
                    </button>
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
