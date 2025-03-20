"use client"

import Image from "next/image"
import { useState } from "react"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { VirtualTryOn } from "@/components/virtual-try-on"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, ShoppingBag } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [tryOnOpen, setTryOnOpen] = useState(false)

  const textColorClass = product.material === "oro" ? "text-secondary" : "text-primary"
  const badgeVariant = product.material === "oro" ? "secondary" : "default"

  return (
    <>
      <Card className="group overflow-hidden glass-card hover:shadow-md transition-all duration-300">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Badge variant={badgeVariant} className="absolute top-3 right-3 opacity-90">
            {product.material === "oro" ? "Oro" : "Plata"}
          </Badge>
        </div>
        <CardContent className="p-6">
          <h3 className={`text-xl font-bold mb-2 font-playfair ${textColorClass}`}>{product.name}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{product.description}</p>
          <p className={`text-lg font-bold mb-2 ${textColorClass}`}>${product.price.toLocaleString()}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 gap-2">
          <Button
            variant="outline"
            className="flex-1 border-primary/20 hover:bg-primary/10 hover:text-primary"
            onClick={() => setTryOnOpen(true)}
          >
            <Eye className="mr-2 h-4 w-4" /> Probar
          </Button>
          <Button
            className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
            onClick={() => addItem(product)}
          >
            <ShoppingBag className="mr-2 h-4 w-4" /> Agregar
          </Button>
        </CardFooter>
      </Card>

      <VirtualTryOn product={product} open={tryOnOpen} onOpenChange={setTryOnOpen} />
    </>
  )
}

