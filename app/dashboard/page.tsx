import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import Project from '@/models/Project'
import Event from '@/models/Event'
import BlogPost from '@/models/BlogPost'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  await dbConnect()

  const [users, projects, events, posts] = await Promise.all([
    User.countDocuments(),
    Project.countDocuments(),
    Event.countDocuments(),
    BlogPost.countDocuments(),
  ])

  const stats = [
    { title: 'Total Users', value: users },
    { title: 'Projects', value: projects },
    { title: 'Events', value: events },
    { title: 'Blog Posts', value: posts },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {session?.user?.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-white">
            <CardHeader>
              <CardTitle className="text-gray-700">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
