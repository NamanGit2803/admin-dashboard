"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { BlogsPage } from "@/components/pages/blogs-page"
import { AppointmentsPage } from "@/components/pages/appointments-page"
import { TestimonialsPage } from "@/components/pages/testimonials-page"
import { ProductsPage } from "@/components/pages/products-page"
import { DashboardOverview } from "@/components/dashboard-overview"

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("overview")

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />
      case "blogs":
        return <BlogsPage />
      case "appointments":
        return <AppointmentsPage />
      case "testimonials":
        return <TestimonialsPage />
      case "products":
        return <ProductsPage />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader activeSection={activeSection} />
        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
