import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "AMED - Association Marocaine de l'Environnement et la Digitalisation",
  description: "Promouvoir la protection environnementale et la transformation digitale au Maroc",
  keywords: "environnement, digitalisation, Maroc, développement durable, écologie, technologie",
  authors: [{ name: "AMED" }],
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "https://www.amed.ma",
    title: "AMED - Association Marocaine",
    description: "Promouvoir la protection environnementale et la transformation digitale",
    images: ["/assets/images/logo/LOGOAmed.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AMED",
    description: "Association Marocaine de l'Environnement et la Digitalisation",
    images: ["/assets/images/logo/LOGOAmed.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  themeColor: "#0ea5e9",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/assets/images/logo/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white antialiased">
        <Header />
        <main className="flex-grow min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
