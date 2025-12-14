import Link from 'next/link'
export default function Navigation() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto p-4 flex gap-4">
        <Link href="/">AMED</Link>
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  )
}
