"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User } from "lucide-react"

interface Appointment {
  id: number
  clientName: string
  service: string
  date: string
  time: string
  status: string
  duration: number
}

interface AppointmentCalendarProps {
  appointments: Appointment[]
  onEdit: (appointment: Appointment) => void
}

export function AppointmentCalendar({ appointments, onEdit }: AppointmentCalendarProps) {
  // Group appointments by date
  const appointmentsByDate = appointments.reduce(
    (acc, appointment) => {
      const date = appointment.date
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(appointment)
      return acc
    },
    {} as Record<string, Appointment[]>,
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {Object.entries(appointmentsByDate)
        .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
        .map(([date, dayAppointments]) => (
          <Card key={date}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                <Badge variant="outline" className="ml-auto">
                  {dayAppointments.length} appointment{dayAppointments.length !== 1 ? "s" : ""}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dayAppointments
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">{appointment.time}</span>
                          <span className="text-sm">({appointment.duration} min)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-card-foreground">{appointment.clientName}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{appointment.service}</div>
                        <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => onEdit(appointment)}>
                        Edit
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}

      {Object.keys(appointmentsByDate).length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-card-foreground mb-2">No appointments found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters to see more appointments.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
