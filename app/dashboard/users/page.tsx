"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2, Shield } from "lucide-react"

export default function UsersManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users")
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error("Failed to fetch users:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Manage Users</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-white">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user._id} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="p-4">{user.name}</td>
                <td className="p-4 text-gray-400">{user.email}</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-primary-900 text-primary-200">
                    <Shield className="w-3 h-3" />
                    {user.role}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
