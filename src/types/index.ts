export interface Project {
  id: number
  title: string
  description: string
  image: string
  category: string
}

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: Date
  image: string
}

export interface Event {
  id: number
  title: string
  description: string
  date: Date
  location: string
  image: string
}

export interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  image: string
}
