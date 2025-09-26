"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Edit, Trash2, Package, AlertTriangle, DollarSign } from "lucide-react"

interface Product {
  id: number
  name: string
  category: string
  type: string
  price: number
  unit: string
  stock: number
  minStock: number
  description: string
  dimensions: string
  finish: string
  origin: string
  status: string
  images: string[]
  supplier: string
  lastUpdated: string
}

interface ProductGridProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (productId: number) => void
  onStatusChange: (productId: number, newStatus: string) => void
}

export function ProductGrid({ products, onEdit, onDelete, onStatusChange }: ProductGridProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "low_stock":
        return "bg-yellow-100 text-yellow-800"
      case "out_of_stock":
        return "bg-red-100 text-red-800"
      case "discontinued":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStockIcon = (product: Product) => {
    if (product.stock === 0) {
      return <AlertTriangle className="h-4 w-4 text-red-500" />
    }
    if (product.stock <= product.minStock) {
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    }
    return <Package className="h-4 w-4 text-green-500" />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="aspect-video bg-muted relative">
            <img
              src={product.images[0] || "/placeholder.svg?height=200&width=300&query=marble texture"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <Badge className={getStatusColor(product.status)}>{product.status.replace("_", " ")}</Badge>
            </div>
          </div>

          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-card-foreground line-clamp-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" onClick={() => onEdit(product)} className="h-8 w-8 p-0">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(product.id)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-card-foreground">
                  ₹{product.price.toFixed(2)}/{product.unit}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {getStockIcon(product)}
                <span className="text-sm text-muted-foreground">
                  {product.stock} {product.unit}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Origin:</span>
                <span className="text-card-foreground">{product.origin}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Finish:</span>
                <span className="text-card-foreground">{product.finish}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Dimensions:</span>
                <span className="text-card-foreground">{product.dimensions}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <Select value={product.status} onValueChange={(value) => onStatusChange(product.id, value)}>
                <SelectTrigger className="w-32">
                  <Badge className={getStatusColor(product.status)}>{product.status.replace("_", " ")}</Badge>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="low_stock">Low Stock</SelectItem>
                  <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                  <SelectItem value="discontinued">Discontinued</SelectItem>
                </SelectContent>
              </Select>

              <div className="text-xs text-muted-foreground">
                Updated: {new Date(product.lastUpdated).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {products.length === 0 && (
        <div className="col-span-full">
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-card-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters to see more products.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
