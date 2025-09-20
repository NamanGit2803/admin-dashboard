"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

interface TestimonialTableProps {
  testimonials: Testimonial[]
  onEdit: (testimonial: Testimonial) => void
  onDelete: (testimonialId: number) => void
  onStatusChange: (testimonialId: number, newStatus: string) => void
  onFeaturedToggle: (testimonialId: number) => void
}

export function TestimonialTable({
  testimonials,
  onEdit,
  onDelete,
  onStatusChange,
  onFeaturedToggle,
}: TestimonialTableProps) {
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
      <Star key={i} className={`h-3 w-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="bg-muted/50">
                <th className="text-left p-4 font-medium text-muted-foreground">Client</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Review</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Project</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Rating</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id} className="border-b border-border hover:bg-muted/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={testimonial.clientImage || "/placeholder.svg"} alt={testimonial.clientName} />
                        <AvatarFallback>{testimonial.clientName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-card-foreground flex items-center gap-2">
                          {testimonial.clientName}
                          {testimonial.featured && <Award className="h-3 w-3 text-primary" />}
                        </div>
                        <div className="text-sm text-muted-foreground">{testimonial.clientEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-card-foreground">{testimonial.title}</div>
                      <div className="text-sm text-muted-foreground mt-1 line-clamp-2 max-w-xs">
                        {testimonial.content}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{testimonial.project}</Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">{renderStars(testimonial.rating)}</div>
                  </td>
                  <td className="p-4">
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
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {testimonial.date}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant={testimonial.featured ? "default" : "outline"}
                        size="sm"
                        onClick={() => onFeaturedToggle(testimonial.id)}
                        className="h-8 px-2 gap-1"
                      >
                        <Award className="h-3 w-3" />
                      </Button>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
