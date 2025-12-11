import type { Metadata } from "next"
import { Mail, Phone, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact - AMED",
  description: "Nous contacter pour toute demande d'information",
}

export default function Contact() {
  return (
    <>
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">Nous Contacter</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Nous aimerions entendre parler de vous. Contactez-nous dès aujourd'hui
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="card p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-full">
                  <Mail className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">contact@amed.ma</p>
            </div>

            <div className="card p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-full">
                  <Phone className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Téléphone</h3>
              <p className="text-gray-600 dark:text-gray-400">+212 5 37 XX XX XX</p>
            </div>

            <div className="card p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-full">
                  <MapPin className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Adresse</h3>
              <p className="text-gray-600 dark:text-gray-400">Rabat, Maroc</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto card p-8">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
              >
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
