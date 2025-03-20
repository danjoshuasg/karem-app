"use client"

import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center max-w-md mx-auto">
        <Card className="glass-card">
          <CardHeader>
            <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <CardTitle className="text-2xl font-playfair">Tu Carrito está Vacío</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground pb-6">
            Parece que aún no has agregado ninguna joya a tu carrito. Explora nuestra colección para encontrar piezas
            únicas.
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link href="/catalogo">
                <ArrowLeft className="mr-2 h-4 w-4" /> Explorar Colección
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 font-playfair text-primary">Tu Carrito</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => {
            const textColorClass = item.material === "oro" ? "text-secondary" : "text-primary"

            return (
              <Card key={item.id} className="overflow-hidden glass-card hover:shadow-md transition-all">
                <div className="flex">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 relative flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className={`text-lg font-bold font-playfair ${textColorClass}`}>{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.material === "oro" ? "Oro" : "Plata"}</p>
                    <p className={`font-bold ${textColorClass}`}>${item.price.toLocaleString()}</p>
                  </div>
                  <div className="p-4 flex flex-col items-center justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-primary/20"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="mx-2 w-6 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-primary/20"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div>
          <Card className="glass-card sticky top-24">
            <CardHeader>
              <CardTitle className="text-xl font-playfair">Resumen del pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x{item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-primary">${total.toLocaleString()}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Link href="/checkout">Proceder al pago</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

