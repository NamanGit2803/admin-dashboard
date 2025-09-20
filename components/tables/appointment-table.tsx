"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Edit, Trash2, Phone, Mail, Clock, Calendar } from "lucide-react"

interface Appointment {
  id: number
  clientName: string
  clientEmail: string
  clientPhone: string
  service: string
  date: string
  time: string
  status: string
  notes: string
  duration: number
}

interface AppointmentTableProps {
  appointments: Appointment[]
  onEdit: (appointment: Appointment) => void
  onDelete: (appointmentId: number) => void
  onStatusChange: (appointmentId: number, newStatus: string) => void
}

export function AppointmentTable({ appointments, onEdit, onDelete, onStatusChange }: AppointmentTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "completed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="bg-muted/50">
                <th className="text-left p-4 font-medium text-muted-foreground">Client</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Service</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Date & Time</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Duration</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b border-border hover:bg-muted/30">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-card-foreground">{appointment.clientName}</div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {appointment.clientEmail}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {appointment.clientPhone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-card-foreground">{appointment.service}</div>
                    {appointment.notes && (
                      <div className="text-sm text-muted-foreground mt-1 line-clamp-2">{appointment.notes}</div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-card-foreground">
                      <Calendar className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{appointment.date}</div>
                        <div className="text-sm text-muted-foreground">{appointment.time}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Select value={appointment.status} onValueChange={(value) => onStatusChange(appointment.id, value)}>
                      <SelectTrigger className="w-32">
                        <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {appointment.duration} min
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => onEdit(appointment)} className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(appointment.id)}
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
