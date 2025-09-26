"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ProductForm } from "@/components/forms/product-form"
import { ProductTable } from "@/components/tables/product-table"
import { ProductGrid } from "@/components/product-grid"
import { Plus, Search, Grid, List } from "lucide-react"

// Mock data for demonstration
const mockProducts = [
  {
    id: 1,
    name: "Carrara White Marble",
    category: "Natural Stone",
    type: "Slab",
    price: 89.99,
    unit: "sq ft",
    stock: 245,
    minStock: 50,
    description: "Premium Italian Carrara white marble with distinctive veining patterns",
    dimensions: "120x60x2cm",
    finish: "Polished",
    origin: "India",
    status: "active",
    images: ["/marble-carrara.jpg"],
    supplier: "Italian Stone Co.",
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    name: "Calacatta Gold Marble",
    category: "Natural Stone",
    type: "Slab",
    price: 125.5,
    unit: "sq ft",
    stock: 18,
    minStock: 25,
    description: "Luxurious Calacatta marble with bold gold veining",
    dimensions: "120x60x3cm",
    finish: "Honed",
    origin: "India",
    status: "low_stock",
    images: ["/marble-calacatta.jpg"],
    supplier: "Premium Marble Ltd.",
    lastUpdated: "2024-01-12",
  },
  {
    id: 3,
    name: "Nero Marquina Black",
    category: "Natural Stone",
    type: "Tile",
    price: 45.75,
    unit: "sq ft",
    stock: 0,
    minStock: 30,
    description: "Elegant black marble with white veining from Spain",
    dimensions: "30x30x1cm",
    finish: "Polished",
    origin: "India",
    status: "out_of_stock",
    images: ["/marble-nero.jpg"],
    supplier: "Spanish Stone Works",
    lastUpdated: "2024-01-10",
  },
]

export function ProductsPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid")

  const handleEdit = (product: any) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDelete = (productId: number) => {
    console.log("Delete product:", productId)
  }

  const handleStatusChange = (productId: number, newStatus: string) => {
    console.log("Update status:", productId, newStatus)
  }

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  if (showForm) {
    return (
      <ProductForm
        product={editingProduct}
        onClose={() => {
          setShowForm(false)
          setEditingProduct(null)
        }}
        onSave={(productData) => {
          console.log("Save product:", productData)
          setShowForm(false)
          setEditingProduct(null)
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
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={categoryFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter("all")}
            >
              All
            </Button>
            <Button
              variant={categoryFilter === "Natural Stone" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter("Natural Stone")}
            >
              Natural Stone
            </Button>
            <Button
              variant={statusFilter === "low_stock" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(statusFilter === "low_stock" ? "all" : "low_stock")}
            >
              Low Stock
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
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">156</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">142</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">6</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">$2.4M</div>
          </CardContent>
        </Card>
      </div>

      {/* Content */}
      {viewMode === "grid" ? (
        <ProductGrid
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      ) : (
        <ProductTable
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  )
}
