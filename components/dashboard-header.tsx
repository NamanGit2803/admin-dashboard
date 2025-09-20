import { Button } from "@/components/ui/button"
import { Bell, Settings, User } from "lucide-react"

interface DashboardHeaderProps {
  activeSection: string
}

const sectionTitles = {
  overview: "Dashboard Overview",
  blogs: "Blog Management",
  appointments: "Appointment Management",
  testimonials: "Testimonials Management",
  products: "Marble Products Management",
}

export function DashboardHeader({ activeSection }: DashboardHeaderProps) {
  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-card-foreground">
          {sectionTitles[activeSection as keyof typeof sectionTitles]}
        </h2>
        <p className="text-muted-foreground text-sm mt-1">Manage your marble design business content</p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
