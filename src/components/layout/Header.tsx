"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "À Propos", href: "/about" },
  { name: "Projets", href: "/projects" },
  { name: "Événements", href: "/events" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg" : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <Image src="/amed-logo.jpg" alt="AMED Logo" fill className="object-contain" priority />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">AMED</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">Environnement & Digital</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                  pathname === item.href ? "text-primary-600 dark:text-primary-400" : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-full hover:bg-primary-700 transition-colors">
              Nous Rejoindre
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 rounded-lg text-base font-medium ${
                    pathname === item.href
                      ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-3 border-t dark:border-gray-700">
                <button className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors">
                  Nous Rejoindre
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
