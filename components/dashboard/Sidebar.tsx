"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FolderOpen, Calendar, Users, FileText, BarChart3, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/dashboard/projects", icon: FolderOpen },
  { label: "Events", href: "/dashboard/events", icon: Calendar },
  { label: "Users", href: "/dashboard/users", icon: Users },
  { label: "Blog", href: "/dashboard/blog", icon: FileText },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700 p-6 flex flex-col">
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white">AMED Admin</h2>
        <p className="text-sm text-gray-400">Dashboard</p>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-primary-600 text-white" : "text-gray-400 hover:bg-gray-700"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <button
        onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-700 w-full transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </aside>
  )
}
