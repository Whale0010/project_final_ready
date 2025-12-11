"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit2, Trash2 } from "lucide-react"

export default function ProjectsManagement() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects")
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error("Failed to fetch projects:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Projects</h1>
        <Button className="bg-primary-600 hover:bg-primary-700">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid gap-6">
        {projects.map((project: any) => (
          <Card key={project._id} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex justify-between items-center">
                <span>{project.title}</span>
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
              <p className="text-gray-400">{project.description}</p>
              <div className="mt-4 flex gap-4">
                <span className="text-sm text-gray-500">Category: {project.category}</span>
                <span className="text-sm text-gray-500">Status: {project.status}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
