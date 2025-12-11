import type React from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Sidebar from "@/components/dashboard/Sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session || (session.user as any).role !== "admin") {
    redirect("/login")
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
