export default function Contact() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="mt-4">Contactez-nous via email ou formulaire.</p>
    </main>
  )
}
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Contact() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold font-heading mb-8 bg-gradient-to-r from-cyan-500 to-green-500 bg-clip-text text-transparent text-center">
        Nous Contacter
      </h1>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div>
            <label className="block text-sm font-medium mb-2">Nom</label>
            <Input type="text" placeholder="Votre nom" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input type="email" placeholder="votre@email.com" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              rows={5}
              placeholder="Votre message..."
              required
            ></textarea>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white"
          >
            {loading ? "Envoi..." : "Envoyer"}
          </Button>
        </form>
      </div>
    </div>
  )
}
