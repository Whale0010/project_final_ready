import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "AMED - Association Marocaine de l'Environnement et la Digitalisation",
  description: "Promouvoir la protection environnementale et la transformation digitale au Maroc",
  keywords: "environnement, digitalisation, Maroc, développement durable, écologie",
  authors: [{ name: "AMED" }],
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "https://www.amed.ma",
    title: "AMED - Association Marocaine",
    description: "Promouvoir la protection environnementale et la transformation digitale",
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: "#0ea5e9",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
