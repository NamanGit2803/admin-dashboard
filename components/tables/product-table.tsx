"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

interface ProductTableProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (productId: number) => void
  onStatusChange: (productId: number, newStatus: string) => void
}

export function ProductTable({ products, onEdit, onDelete, onStatusChange }: ProductTableProps) {
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
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="bg-muted/50">
                <th className="text-left p-4 font-medium text-muted-foreground">Product</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Category</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Price</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Stock</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Supplier</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-muted/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images[0] || "/placeholder.svg?height=40&width=40&query=marble"}
                        alt={product.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <div className="font-medium text-card-foreground">{product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {product.dimensions} • {product.finish}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <Badge variant="outline">{product.category}</Badge>
                      <div className="text-sm text-muted-foreground mt-1">{product.type}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-card-foreground">
                        ${product.price.toFixed(2)}/{product.unit}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getStockIcon(product)}
                      <div>
                        <div className="font-medium text-card-foreground">
                          {product.stock} {product.unit}
                        </div>
                        <div className="text-sm text-muted-foreground">Min: {product.minStock}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Select value={product.status} onValueChange={(value) => onStatusChange(product.id, value)}>
                      <SelectTrigger className="w-36">
                        <Badge className={getStatusColor(product.status)}>{product.status.replace("_", " ")}</Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="low_stock">Low Stock</SelectItem>
                        <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                        <SelectItem value="discontinued">Discontinued</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-4">
                    <div className="text-card-foreground">{product.supplier}</div>
                    <div className="text-sm text-muted-foreground">{product.origin}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
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
