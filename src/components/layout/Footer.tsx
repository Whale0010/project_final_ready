import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  organisation: [
    { name: "À Propos", href: "/about" },
    { name: "Équipe", href: "/about#team" },
    { name: "Statuts", href: "/about#statutes" },
    { name: "Transparence", href: "/about#transparency" },
  ],
  activités: [
    { name: "Projets", href: "/projects" },
    { name: "Événements", href: "/events" },
    { name: "Formations", href: "/activities#training" },
    { name: "Recherche", href: "/activities#research" },
  ],
  ressources: [
    { name: "Blog", href: "/blog" },
    { name: "Publications", href: "/resources#publications" },
    { name: "Médiathèque", href: "/resources#media" },
    { name: "FAQ", href: "/resources#faq" },
  ],
  légal: [
    { name: "Mentions Légales", href: "/legal#terms" },
    { name: "Confidentialité", href: "/legal#privacy" },
    { name: "Cookies", href: "/legal#cookies" },
    { name: "Accessibilité", href: "/legal#accessibility" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/amed", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/amed", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/amed", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/amed", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/amed", label: "YouTube" },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-16 h-16">
                <Image src="/amed-logo-white.jpg" alt="AMED Logo" fill className="object-contain" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">AMED</h3>
                <p className="text-gray-400">Environnement & Digitalisation</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              L'Association Marocaine de l'Environnement et la Digitalisation œuvre pour un avenir durable à travers
              l'innovation technologique et la protection de nos ressources naturelles.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span className="text-gray-400">Rabat, Maroc</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <span className="text-gray-400">+212 5 37 XX XX XX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <span className="text-gray-400">contact@amed.ma</span>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold mb-4 capitalize">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-primary-400 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="text-xl font-semibold mb-2">Restez Informés</h4>
              <p className="text-gray-400">Inscrivez-vous à notre newsletter</p>
            </div>
            <form className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 flex-grow md:flex-grow-0 md:w-64 text-white"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">© {new Date().getFullYear()} AMED - Tous droits réservés</div>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
