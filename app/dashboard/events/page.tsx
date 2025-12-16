"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit2, Trash2, Users } from "lucide-react"

type EventType = {
  _id: string
  title: string
  description?: string
  startDate?: string
  registrations?: Array<unknown>
  [key: string]: unknown
}

export default function EventsManagement() {
  const [events, setEvents] = useState<EventType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async (): Promise<EventType[]> => {
    try {
      const response = await fetch("/api/events")

      if (!response.ok) {
        console.error("Failed to fetch events: HTTP", response.status)
        setEvents([])
        return []
      }

      const data = await response.json().catch(() => null)

      // Defensive runtime validation
      // 1) If data is already an array -> use it
      if (Array.isArray(data)) {
        setEvents(data as EventType[])
        return data
      }

      // 2) If data is an object, try common array fields
      if (data && typeof data === "object") {
        const obj = data as Record<string, unknown>
        const eventsField = obj["events"]
        if (Array.isArray(eventsField)) {
          setEvents(eventsField as EventType[])
          return eventsField as EventType[]
        }
        const dataField = obj["data"]
        if (Array.isArray(dataField)) {
          setEvents(dataField as EventType[])
          return dataField as EventType[]
        }

        // If the object itself looks like a single event, wrap into array
        const maybeEvent = obj as unknown as EventType
        if (maybeEvent && (maybeEvent._id || maybeEvent.title)) {
          setEvents([maybeEvent])
          return [maybeEvent]
        }
      }

      // 3) Fallback: invalid shape -> empty array
      console.warn("fetchEvents: unexpected response shape, returning empty array", data)
      setEvents([])
      return []
    } catch (error) {
      console.error("Failed to fetch events:", error)
      setEvents([])
      return []
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Events</h1>
        <Button className="bg-primary-600 hover:bg-primary-700">
          <Plus className="w-4 h-4 mr-2" />
          New Event
        </Button>
      </div>

      <div className="grid gap-6">
        {events.map((event: any) => (
          <Card key={event._id} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex justify-between items-center">
                <span>{event.title}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">{event.description}</p>
              <div className="mt-4 flex gap-4">
                <span className="text-sm text-gray-500">
                  Start: {new Date(event.startDate).toLocaleDateString("fr-FR")}
                </span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {event.registrations?.length || 0} registrations
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
