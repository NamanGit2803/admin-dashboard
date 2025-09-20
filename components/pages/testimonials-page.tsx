"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TestimonialForm } from "@/components/forms/testimonial-form"
import { TestimonialTable } from "@/components/tables/testimonial-table"
import { TestimonialGrid } from "@/components/testimonial-grid"
import { Plus, Search, Grid, List } from "lucide-react"

// Mock data for demonstration
const mockTestimonials = [
  {
    id: 1,
    clientName: "Sarah Mitchell",
    clientEmail: "sarah@example.com",
    rating: 5,
    title: "Exceptional Kitchen Renovation",
    content:
      "The marble countertops installed by this team transformed our kitchen completely. The attention to detail and craftsmanship is outstanding. Highly recommend their services!",
    project: "Kitchen Renovation",
    date: "2024-01-15",
    status: "approved",
    featured: true,
    clientImage: "/diverse-woman-portrait.png",
  },
  {
    id: 2,
    clientName: "David Chen",
    clientEmail: "david@example.com",
    rating: 4,
    title: "Beautiful Bathroom Design",
    content:
      "Professional service from start to finish. The marble shower installation exceeded our expectations. The team was punctual and clean.",
    project: "Bathroom Remodel",
    date: "2024-01-12",
    status: "pending",
    featured: false,
    clientImage: "/thoughtful-man.png",
  },
  {
    id: 3,
    clientName: "Emily Rodriguez",
    clientEmail: "emily@example.com",
    rating: 5,
    title: "Outstanding Maintenance Service",
    content:
      "Regular maintenance service has kept our marble floors looking brand new. The team is knowledgeable and always provides excellent service.",
    project: "Maintenance Service",
    date: "2024-01-10",
    status: "approved",
    featured: false,
    clientImage: "/professional-woman.png",
  },
]

export function TestimonialsPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid")

  const handleEdit = (testimonial: any) => {
    setEditingTestimonial(testimonial)
    setShowForm(true)
  }

  const handleDelete = (testimonialId: number) => {
    console.log("Delete testimonial:", testimonialId)
  }

  const handleStatusChange = (testimonialId: number, newStatus: string) => {
    console.log("Update status:", testimonialId, newStatus)
  }

  const handleFeaturedToggle = (testimonialId: number) => {
    console.log("Toggle featured:", testimonialId)
  }

  const filteredTestimonials = mockTestimonials.filter((testimonial) => {
    const matchesSearch =
      testimonial.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.project.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || testimonial.status === statusFilter
    const matchesRating = ratingFilter === "all" || testimonial.rating.toString() === ratingFilter
    return matchesSearch && matchesStatus && matchesRating
  })

  if (showForm) {
    return (
      <TestimonialForm
        testimonial={editingTestimonial}
        onClose={() => {
          setShowForm(false)
          setEditingTestimonial(null)
        }}
        onSave={(testimonialData) => {
          console.log("Save testimonial:", testimonialData)
          setShowForm(false)
          setEditingTestimonial(null)
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
              placeholder="Search testimonials..."
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
              variant={statusFilter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("pending")}
            >
              Pending
            </Button>
            <Button
              variant={statusFilter === "approved" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("approved")}
            >
              Approved
            </Button>
            <Button
              variant={ratingFilter === "5" ? "default" : "outline"}
              size="sm"
              onClick={() => setRatingFilter(ratingFilter === "5" ? "all" : "5")}
            >
              5 Stars
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex border border-border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Testimonial
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">42</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">34</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">4.8</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Featured</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">6</div>
          </CardContent>
        </Card>
      </div>

      {/* Content */}
      {viewMode === "grid" ? (
        <TestimonialGrid
          testimonials={filteredTestimonials}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          onFeaturedToggle={handleFeaturedToggle}
        />
      ) : (
        <TestimonialTable
          testimonials={filteredTestimonials}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          onFeaturedToggle={handleFeaturedToggle}
        />
      )}
    </div>
  )
}
