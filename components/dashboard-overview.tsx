import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Calendar, MessageSquare, Package, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Blogs",
    value: "24",
    change: "+12%",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    title: "Appointments",
    value: "18",
    change: "+8%",
    icon: Calendar,
    color: "text-green-600",
  },
  {
    title: "Testimonials",
    value: "42",
    change: "+15%",
    icon: MessageSquare,
    color: "text-purple-600",
  },
  {
    title: "Products",
    value: "156",
    change: "+3%",
    icon: Package,
    color: "text-orange-600",
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change} from last month
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New blog post published</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Appointment scheduled</p>
                  <p className="text-xs text-muted-foreground">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New testimonial received</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors">
                <FileText className="h-6 w-6 text-primary mb-2" />
                <p className="text-sm font-medium">New Blog</p>
              </button>
              <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors">
                <Calendar className="h-6 w-6 text-green-600 mb-2" />
                <p className="text-sm font-medium">Schedule</p>
              </button>
              <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors">
                <Package className="h-6 w-6 text-orange-600 mb-2" />
                <p className="text-sm font-medium">Add Product</p>
              </button>
              <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors">
                <MessageSquare className="h-6 w-6 text-purple-600 mb-2" />
                <p className="text-sm font-medium">Reviews</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
