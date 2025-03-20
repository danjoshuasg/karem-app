"use client"

import { useState, useEffect } from "react"
import { products } from "@/lib/data"
import ProductCard from "@/components/product-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Diamond, Filter, X, Search, SlidersHorizontal } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function Catalogo() {
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [materialFilter, setMaterialFilter] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [sortOrder, setSortOrder] = useState("featured")
  const [mounted, setMounted] = useState(false)
  const [showOnlyGold, setShowOnlyGold] = useState(false)
  const [showOnlySilver, setShowOnlySilver] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const maxPrice = Math.max(...products.map((p) => p.price))

  const filteredProducts = products.filter((product) => {
    // Filtro por tipo
    if (typeFilter && typeFilter !== "all" && product.type !== typeFilter) return false

    // Filtro por material
    if (materialFilter && materialFilter !== "all" && product.material !== materialFilter) return false

    // Filtro por precio
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false

    // Filtro por búsqueda
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false

    // Filtros de checkbox
    if (showOnlyGold && product.material !== "oro") return false
    if (showOnlySilver && product.material !== "plata") return false

    return true
  })

  // Ordenar productos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "price-asc") return a.price - b.price
    if (sortOrder === "price-desc") return b.price - a.price
    if (sortOrder === "name-asc") return a.name.localeCompare(b.name)
    if (sortOrder === "name-desc") return b.name.localeCompare(a.name)
    return 0 // featured - mantener orden original
  })

  if (!mounted) return null

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <Diamond className="h-8 w-8 text-secondary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4 font-playfair text-primary">Nuestra Colección</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Descubre nuestras piezas únicas de joyería, donde la elegancia se encuentra con delicados detalles
          artesanales.
        </p>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Input
            placeholder="Buscar joyas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-secondary/20 focus:border-secondary focus:ring-secondary/20"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[180px] border-secondary/20 focus:ring-secondary/20">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent className="glass-card">
              <SelectItem value="featured">Destacados</SelectItem>
              <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
              <SelectItem value="name-asc">Nombre: A-Z</SelectItem>
              <SelectItem value="name-desc">Nombre: Z-A</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="border-secondary/20 hover:bg-secondary/10"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Panel de filtros avanzados */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card className="mb-8 glass-card border-secondary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-secondary" />
                    <h2 className="text-lg font-playfair">Filtros Avanzados</h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setTypeFilter(null)
                      setMaterialFilter(null)
                      setPriceRange([0, maxPrice])
                      setShowOnlyGold(false)
                      setShowOnlySilver(false)
                    }}
                    className="text-xs"
                  >
                    Limpiar filtros
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium mb-2">Categoría</h3>
                    <Select value={typeFilter || "all"} onValueChange={setTypeFilter}>
                      <SelectTrigger className="border-secondary/20 focus:ring-secondary/20">
                        <SelectValue placeholder="Todas las categorías" />
                      </SelectTrigger>
                      <SelectContent className="glass-card">
                        <SelectItem value="all">Todas las categorías</SelectItem>
                        <SelectItem value="anillo">Anillos</SelectItem>
                        <SelectItem value="collar">Collares</SelectItem>
                        <SelectItem value="aretes">Aretes</SelectItem>
                        <SelectItem value="pulsera">Pulseras</SelectItem>
                        <SelectItem value="tobillera">Tobilleras</SelectItem>
                      </SelectContent>
                    </Select>

                    <h3 className="text-sm font-medium mb-2">Material</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="gold"
                          checked={showOnlyGold}
                          onCheckedChange={(checked) => setShowOnlyGold(checked === true)}
                        />
                        <Label htmlFor="gold" className="text-sm">
                          Oro
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="silver"
                          checked={showOnlySilver}
                          onCheckedChange={(checked) => setShowOnlySilver(checked === true)}
                        />
                        <Label htmlFor="silver" className="text-sm">
                          Plata
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 md:col-span-2">
                    <h3 className="text-sm font-medium mb-2">Rango de Precio</h3>
                    <div className="px-2">
                      <Slider
                        min={0}
                        max={maxPrice}
                        step={50}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="my-6"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${priceRange[0].toLocaleString()}</span>
                      <span>${priceRange[1].toLocaleString()}</span>
                    </div>

                    <div className="pt-4">
                      <Separator className="my-4" />
                      <p className="text-xs text-muted-foreground italic">
                        Mostrando {sortedProducts.length} de {products.length} productos
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className="text-center py-12 border border-dashed border-secondary/20 rounded-lg mt-8 glass-effect">
          <p className="text-lg text-muted-foreground">No se encontraron productos con los filtros seleccionados.</p>
          <Button
            variant="outline"
            className="mt-4 border-secondary/20 hover:bg-secondary/10"
            onClick={() => {
              setTypeFilter(null)
              setMaterialFilter(null)
              setPriceRange([0, maxPrice])
              setSearchQuery("")
              setShowOnlyGold(false)
              setShowOnlySilver(false)
            }}
          >
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  )
}

