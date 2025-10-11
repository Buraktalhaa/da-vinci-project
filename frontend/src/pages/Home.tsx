import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, FileText } from "lucide-react"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-6 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">User & Post Management System</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A simple web application to manage users and posts with full CRUD operations.
          Data is fetched from my own backend built with NestJS for demonstration purposes.
        </p>
      </div>

      {/* Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Users Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              View, create, update, and delete users. Each user has an ID, name,
              username, and email address.
            </p>
            <Link to="/users">
              <Button className="w-full">Manage Users</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Posts Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              View, create, update, and delete posts. Posts are linked to users
              through userId relationships.
            </p>
            <Link to="/posts">
              <Button className="w-full">Manage Posts</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Alt Açıklama */}
      <Card className="bg-gray-100 dark:bg-gray-700 border-0">
        <CardHeader>
          <CardTitle className="text-lg">About This Application</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            This application demonstrates a complete CRUD (Create, Read, Update, Delete)
            interface built with React and TypeScript. It uses a custom backend developed 
            with NestJS for data fetching and includes proper error handling, loading states, 
            and responsive design.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
