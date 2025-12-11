"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects")
      const data = await response.json()
      setProjects(data.slice(0, 3))
    } catch (error) {
      console.error("Failed to fetch projects:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Nos Projets</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Découvrez les initiatives de l'AMED pour transformer le Maroc
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Chargement des projets...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => (
              <Card key={project._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <Badge variant={project.status === "active" ? "default" : "secondary"}>{project.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {project.description?.slice(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{project.category}</Badge>
                    <Link
                      href={`/projects/${project._id}`}
                      className="text-cyan-600 hover:text-cyan-700 flex items-center gap-1 text-sm font-medium"
                    >
                      Voir plus
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-cyan-600 to-green-600 rounded-full hover:shadow-lg transition-all"
          >
            Voir tous les projets
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
