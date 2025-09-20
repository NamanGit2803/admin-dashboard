"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Upload } from "lucide-react"

interface ProductFormProps {
  product?: any
  onClose: () => void
  onSave: (productData: any) => void
}

export function ProductForm({ product, onClose, onSave }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "",
    type: product?.type || "",
    description: product?.description || "",
    price: product?.price || "",
    unit: product?.unit || "sq ft",
    stock: product?.stock || "",
    minStock: product?.minStock || "",
    dimensions: product?.dimensions || "",
    finish: product?.finish || "",
    origin: product?.origin || "",
    supplier: product?.supplier || "",
    status: product?.status || "active",
    images: product?.images || [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleInputChange = (field: string, value: string | number | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onClose} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-card-foreground">{product ? "Edit Product" : "Add New Product"}</h2>
            <p className="text-muted-foreground">
              {product ? "Update product information" : "Add a new marble product to your inventory"}
            </p>
          </div>
        </div>
        <Button onClick={handleSubmit} className="gap-2">
          <Save className="h-4 w-4" />
          {product ? "Update Product" : "Save Product"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter product name"
                  className="mt-1"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Natural Stone">Natural Stone</SelectItem>
                      <SelectItem value="Engineered Stone">Engineered Stone</SelectItem>
                      <SelectItem value="Granite">Granite</SelectItem>
                      <SelectItem value="Quartz">Quartz</SelectItem>
                      <SelectItem value="Travertine">Travertine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Slab">Slab</SelectItem>
                      <SelectItem value="Tile">Tile</SelectItem>
                      <SelectItem value="Countertop">Countertop</SelectItem>
                      <SelectItem value="Mosaic">Mosaic</SelectItem>
                      <SelectItem value="Block">Block</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Detailed product description..."
                  rows={4}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dimensions">Dimensions</Label>
                  <Input
                    id="dimensions"
                    value={formData.dimensions}
                    onChange={(e) => handleInputChange("dimensions", e.target.value)}
                    placeholder="e.g., 120x60x2cm"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="finish">Finish</Label>
                  <Select value={formData.finish} onValueChange={(value) => handleInputChange("finish", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select finish" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Polished">Polished</SelectItem>
                      <SelectItem value="Honed">Honed</SelectItem>
                      <SelectItem value="Brushed">Brushed</SelectItem>
                      <SelectItem value="Tumbled">Tumbled</SelectItem>
                      <SelectItem value="Sandblasted">Sandblasted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="origin">Origin</Label>
                  <Input
                    id="origin"
                    value={formData.origin}
                    onChange={(e) => handleInputChange("origin", e.target.value)}
                    placeholder="e.g., Italy, Spain, Turkey"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input
                    id="supplier"
                    value={formData.supplier}
                    onChange={(e) => handleInputChange("supplier", e.target.value)}
                    placeholder="Supplier name"
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing & Inventory */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", Number.parseFloat(e.target.value))}
                    placeholder="0.00"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sq ft">sq ft</SelectItem>
                      <SelectItem value="sq m">sq m</SelectItem>
                      <SelectItem value="piece">piece</SelectItem>
                      <SelectItem value="slab">slab</SelectItem>
                      <SelectItem value="ton">ton</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stock">Current Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleInputChange("stock", Number.parseInt(e.target.value))}
                    placeholder="0"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="minStock">Minimum Stock</Label>
                  <Input
                    id="minStock"
                    type="number"
                    value={formData.minStock}
                    onChange={(e) => handleInputChange("minStock", Number.parseInt(e.target.value))}
                    placeholder="0"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="low_stock">Low Stock</SelectItem>
                    <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                    <SelectItem value="discontinued">Discontinued</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <Upload className="h-4 w-4" />
                  Upload Images
                </Button>
                <p className="text-sm text-muted-foreground">
                  Upload high-quality images of your marble product. Recommended size: 800x600px
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
