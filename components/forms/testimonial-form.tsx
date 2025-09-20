"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, Star } from "lucide-react"

interface TestimonialFormProps {
  testimonial?: any
  onClose: () => void
  onSave: (testimonialData: any) => void
}

export function TestimonialForm({ testimonial, onClose, onSave }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    clientName: testimonial?.clientName || "",
    clientEmail: testimonial?.clientEmail || "",
    clientImage: testimonial?.clientImage || "",
    title: testimonial?.title || "",
    content: testimonial?.content || "",
    rating: testimonial?.rating || 5,
    project: testimonial?.project || "",
    status: testimonial?.status || "pending",
    featured: testimonial?.featured || false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const renderStars = (rating: number, onRatingChange: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => onRatingChange(i + 1)}
        className={`h-6 w-6 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} hover:text-yellow-400 transition-colors`}
      >
        <Star className="h-full w-full" />
      </button>
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onClose} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Testimonials
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-card-foreground">
              {testimonial ? "Edit Testimonial" : "Add New Testimonial"}
            </h2>
            <p className="text-muted-foreground">
              {testimonial ? "Update testimonial details" : "Add a new client testimonial"}
            </p>
          </div>
        </div>
        <Button onClick={handleSubmit} className="gap-2">
          <Save className="h-4 w-4" />
          {testimonial ? "Update Testimonial" : "Save Testimonial"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Information */}
        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => handleInputChange("clientName", e.target.value)}
                placeholder="Enter client's full name"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="clientEmail">Email Address</Label>
              <Input
                id="clientEmail"
                type="email"
                value={formData.clientEmail}
                onChange={(e) => handleInputChange("clientEmail", e.target.value)}
                placeholder="client@example.com"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="clientImage">Client Photo URL</Label>
              <Input
                id="clientImage"
                value={formData.clientImage}
                onChange={(e) => handleInputChange("clientImage", e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="project">Project Type</Label>
              <Select value={formData.project} onValueChange={(value) => handleInputChange("project", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kitchen Renovation">Kitchen Renovation</SelectItem>
                  <SelectItem value="Bathroom Remodel">Bathroom Remodel</SelectItem>
                  <SelectItem value="Installation">Installation</SelectItem>
                  <SelectItem value="Maintenance Service">Maintenance Service</SelectItem>
                  <SelectItem value="Design Consultation">Design Consultation</SelectItem>
                  <SelectItem value="Repair Service">Repair Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Testimonial Details */}
        <Card>
          <CardHeader>
            <CardTitle>Testimonial Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Review Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Brief title for the testimonial"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="content">Review Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                placeholder="Full testimonial content..."
                rows={6}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label>Rating</Label>
              <div className="flex items-center gap-1 mt-1">
                {renderStars(formData.rating, (rating) => handleInputChange("rating", rating))}
                <span className="ml-2 text-sm text-muted-foreground">({formData.rating} stars)</span>
              </div>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => handleInputChange("featured", checked)}
              />
              <Label
                htmlFor="featured"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Feature this testimonial
              </Label>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
