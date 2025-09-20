"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AppointmentForm } from "@/components/forms/appointment-form"
import { AppointmentTable } from "@/components/tables/appointment-table"
import { AppointmentCalendar } from "@/components/appointment-calendar"
import { Plus, Search, Calendar, List } from "lucide-react"

// Mock data for demonstration
const mockAppointments = [
  {
    id: 1,
    clientName: "Alice Johnson",
    clientEmail: "alice@example.com",
    clientPhone: "+1 (555) 123-4567",
    service: "Kitchen Consultation",
    date: "2024-01-20",
    time: "10:00 AM",
    status: "confirmed",
    notes: "Interested in marble countertops for kitchen renovation",
    duration: 60,
  },
  {
    id: 2,
    clientName: "Bob Smith",
    clientEmail: "bob@example.com",
    clientPhone: "+1 (555) 987-6543",
    service: "Bathroom Design",
    date: "2024-01-22",
    time: "2:00 PM",
    status: "pending",
    notes: "Looking for marble shower installation",
    duration: 90,
  },
  {
    id: 3,
    clientName: "Carol Davis",
    clientEmail: "carol@example.com",
    clientPhone: "+1 (555) 456-7890",
    service: "Maintenance Check",
    date: "2024-01-18",
    time: "11:30 AM",
    status: "completed",
    notes: "Annual marble maintenance and polishing",
    duration: 45,
  },
]

export function AppointmentsPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table")

  const handleEdit = (appointment: any) => {
    setEditingAppointment(appointment)
    setShowForm(true)
  }

  const handleDelete = (appointmentId: number) => {
    console.log("Delete appointment:", appointmentId)
  }

  const handleStatusChange = (appointmentId: number, newStatus: string) => {
    console.log("Update status:", appointmentId, newStatus)
  }

  const filteredAppointments = mockAppointments.filter((appointment) => {
    const matchesSearch =
      appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (showForm) {
    return (
      <AppointmentForm
        appointment={editingAppointment}
        onClose={() => {
          setShowForm(false)
          setEditingAppointment(null)
        }}
        onSave={(appointmentData) => {
          console.log("Save appointment:", appointmentData)
          setShowForm(false)
          setEditingAppointment(null)
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
              placeholder="Search appointments..."
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
              variant={statusFilter === "confirmed" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("confirmed")}
            >
              Confirmed
            </Button>
            <Button
              variant={statusFilter === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("completed")}
            >
              Completed
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex border border-border rounded-md">
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className="rounded-r-none"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("calendar")}
              className="rounded-l-none"
            >
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">18</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">5</div>
          </CardContent>
        </Card>
      </div>

      {/* Content */}
      {viewMode === "table" ? (
        <AppointmentTable
          appointments={filteredAppointments}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      ) : (
        <AppointmentCalendar appointments={filteredAppointments} onEdit={handleEdit} />
      )}
    </div>
  )
}
