"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { CheckCircle, CreditCard, Truck, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  if (items.length === 0 && !isSuccess) {
    router.push("/catalogo")
    return null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 1500))

    clearCart()
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className="container py-16 max-w-md mx-auto text-center">
        <Card className="glass-card">
          <CardHeader>
            <CheckCircle className="h-16 w-16 mx-auto text-primary mb-4" />
            <CardTitle className="text-3xl font-playfair">¡Pedido Confirmado!</CardTitle>
            <CardDescription>Tu pedido ha sido procesado con éxito</CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground pb-6">
            Gracias por tu compra. Hemos recibido tu pedido y te enviaremos un correo electrónico con los detalles de
            seguimiento.
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <a href="/">Volver al inicio</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 font-playfair text-primary">Finalizar Compra</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Card className="glass-card mb-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl font-playfair">Información de Envío</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input id="name" required className="border-primary/20 focus:ring-primary/20" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" required className="border-primary/20 focus:ring-primary/20" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input id="address" required className="border-primary/20 focus:ring-primary/20" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input id="city" required className="border-primary/20 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postal">Código postal</Label>
                    <Input id="postal" required className="border-primary/20 focus:ring-primary/20" />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl font-playfair">Información de Pago</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card">Número de tarjeta</Label>
                  <Input
                    id="card"
                    placeholder="1234 5678 9012 3456"
                    className="border-primary/20 focus:ring-primary/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Fecha de expiración</Label>
                    <Input id="expiry" placeholder="MM/AA" className="border-primary/20 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" className="border-primary/20 focus:ring-primary/20" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 mt-2"
                disabled={isSubmitting}
                form="checkout-form"
              >
                {isSubmitting ? "Procesando..." : `Pagar $${total.toLocaleString()}`}
              </Button>
            </CardFooter>
          </Card>
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

              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>Pago seguro garantizado</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Envío gratuito en compras superiores a $2000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

