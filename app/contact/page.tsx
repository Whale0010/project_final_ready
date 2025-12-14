"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Contact() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-8 text-center">Nous Contacter</h1>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow p-8">
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
            <textarea className="w-full p-3 border rounded-lg" rows={5} placeholder="Votre message..." required />
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-primary text-white">
            {loading ? 'Envoi...' : 'Envoyer'}
          </Button>
        </form>
      </div>
    </div>
  )
}
