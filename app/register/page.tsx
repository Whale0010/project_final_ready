"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error)
      } else {
        setSuccess(true)
        setTimeout(() => router.push("/login"), 2000)
      }
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Join AMED</CardTitle>
          <CardDescription>Create your account to become a member</CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              Registration successful! Redirecting to login...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone (Moroccan)</label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+212 6XX XXX XXX"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-primary-600 hover:underline">
                  Login here
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
