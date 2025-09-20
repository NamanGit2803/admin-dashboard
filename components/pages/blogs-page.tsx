"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BlogForm } from "@/components/forms/blog-form"
import { BlogTable } from "@/components/tables/blog-table"
import { Plus, Search } from "lucide-react"

// Mock data for demonstration
const mockBlogs = [
  {
    id: 1,
    title: "Modern Marble Kitchen Designs",
    author: "John Smith",
    status: "published",
    category: "Kitchen Design",
    publishDate: "2024-01-15",
    views: 1250,
    excerpt: "Discover the latest trends in marble kitchen countertops and backsplashes...",
  },
  {
    id: 2,
    title: "Bathroom Marble Installation Guide",
    author: "Sarah Johnson",
    status: "draft",
    category: "Bathroom Design",
    publishDate: "2024-01-10",
    views: 890,
    excerpt: "Step-by-step guide for installing marble tiles in your bathroom...",
  },
  {
    id: 3,
    title: "Marble Maintenance Tips",
    author: "Mike Wilson",
    status: "published",
    category: "Maintenance",
    publishDate: "2024-01-08",
    views: 2100,
    excerpt: "Essential tips to keep your marble surfaces looking pristine...",
  },
]

export function BlogsPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const handleEdit = (blog: any) => {
    setEditingBlog(blog)
    setShowForm(true)
  }

  const handleDelete = (blogId: number) => {
    // Handle delete logic here
    console.log("Delete blog:", blogId)
  }

  const filteredBlogs = mockBlogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || blog.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (showForm) {
    return (
      <BlogForm
        blog={editingBlog}
        onClose={() => {
          setShowForm(false)
          setEditingBlog(null)
        }}
        onSave={(blogData) => {
          console.log("Save blog:", blogData)
          setShowForm(false)
          setEditingBlog(null)
        }}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
            >
              All
            </Button>
            <Button
              variant={statusFilter === "published" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("published")}
            >
              Published
            </Button>
            <Button
              variant={statusFilter === "draft" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("draft")}
            >
              Draft
            </Button>
          </div>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Blog Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">18</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">6</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">12.5K</div>
          </CardContent>
        </Card>
      </div>

      {/* Blog Table */}
      <BlogTable blogs={filteredBlogs} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}
