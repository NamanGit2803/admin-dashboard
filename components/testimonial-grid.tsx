"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Edit, Trash2, Star, Calendar, Award } from "lucide-react"

interface Testimonial {
  id: number
  clientName: string
  clientEmail: string
  rating: number
  title: string
  content: string
  project: string
  date: string
  status: string
  featured: boolean
  clientImage: string
}

interface TestimonialGridProps {
  testimonials: Testimonial[]
  onEdit: (testimonial: Testimonial) => void
  onDelete: (testimonialId: number) => void
  onStatusChange: (testimonialId: number, newStatus: string) => void
  onFeaturedToggle: (testimonialId: number) => void
}

export function TestimonialGrid({
  testimonials,
  onEdit,
  onDelete,
  onStatusChange,
  onFeaturedToggle,
}: TestimonialGridProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="relative">
          {testimonial.featured && (
            <div className="absolute -top-2 -right-2 z-10">
              <Badge className="bg-primary text-primary-foreground gap-1">
                <Award className="h-3 w-3" />
                Featured
              </Badge>
            </div>
          )}

          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={testimonial.clientImage || "/placeholder.svg"} alt={testimonial.clientName} />
                  <AvatarFallback>{testimonial.clientName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-card-foreground">{testimonial.clientName}</h3>
                  <div className="flex items-center gap-1 mt-1">{renderStars(testimonial.rating)}</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" onClick={() => onEdit(testimonial)} className="h-8 w-8 p-0">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(testimonial.id)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-card-foreground mb-2">{testimonial.title}</h4>
              <p className="text-sm text-muted-foreground line-clamp-4">{testimonial.content}</p>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {testimonial.date}
              </div>
              <Badge variant="outline">{testimonial.project}</Badge>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <Select value={testimonial.status} onValueChange={(value) => onStatusChange(testimonial.id, value)}>
                <SelectTrigger className="w-32">
                  <Badge className={getStatusColor(testimonial.status)}>{testimonial.status}</Badge>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant={testimonial.featured ? "default" : "outline"}
                size="sm"
                onClick={() => onFeaturedToggle(testimonial.id)}
                className="gap-1"
              >
                <Award className="h-3 w-3" />
                {testimonial.featured ? "Featured" : "Feature"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {testimonials.length === 0 && (
        <div className="col-span-full">
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-card-foreground mb-2">No testimonials found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters to see more testimonials.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
