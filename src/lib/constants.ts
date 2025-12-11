export const SITE_NAME = "AMED"
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.amed.ma"
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.amed.ma"
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ""

export const NAVIGATION = [
  { name: "Accueil", href: "/" },
  { name: "À Propos", href: "/about" },
  { name: "Projets", href: "/projects" },
  { name: "Événements", href: "/events" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export const SOCIAL_LINKS = [
  { name: "Facebook", url: "https://facebook.com/amed" },
  { name: "Twitter", url: "https://twitter.com/amed" },
  { name: "Instagram", url: "https://instagram.com/amed" },
  { name: "LinkedIn", url: "https://linkedin.com/company/amed" },
  { name: "YouTube", url: "https://youtube.com/amed" },
]
