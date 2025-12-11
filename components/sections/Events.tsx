"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin } from "lucide-react"
import Link from "next/link"

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events")
      const data = await response.json()
      setEvents(data.slice(0, 3))
    } catch (error) {
      console.error("Failed to fetch events:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Événements à Venir</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Rejoignez-nous pour des événements enrichissants
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Chargement des événements...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event: any) => (
              <Card key={event._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{event.description?.slice(0, 80)}...</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.startDate).toLocaleDateString("fr-FR")}
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/events/${event._id}`}
                    className="inline-block text-cyan-600 hover:text-cyan-700 text-sm font-medium"
                  >
                    S'inscrire →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
