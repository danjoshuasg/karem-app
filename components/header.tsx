"use client"

import Link from "next/link"
import { ShoppingBag, Menu, X, Diamond } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

export default function Header() {
  const { items } = useCart()
  const itemCount = items.length
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="py-4 sticky top-0 z-50 glass-effect">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Diamond className="h-5 w-5 text-secondary" />
          <span className="text-2xl font-bold text-primary font-playfair">La Vitrine</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-foreground/80 hover:text-primary transition-colors">
            Inicio
          </Link>
          <Link href="/catalogo" className="text-foreground/80 hover:text-primary transition-colors">
            Catálogo
          </Link>
          <Link href="#" className="text-foreground/80 hover:text-primary transition-colors">
            Colecciones
          </Link>
          <Link href="#" className="text-foreground/80 hover:text-primary transition-colors">
            Sobre Nosotros
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/carrito" className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass-card">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <Diamond className="h-5 w-5 text-secondary" />
                    <span className="text-xl font-bold text-primary font-playfair">La Vitrine</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/"
                    className="text-foreground/80 hover:text-primary transition-colors py-2 border-b border-border/20"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Inicio
                  </Link>
                  <Link
                    href="/catalogo"
                    className="text-foreground/80 hover:text-primary transition-colors py-2 border-b border-border/20"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Catálogo
                  </Link>
                  <Link
                    href="#"
                    className="text-foreground/80 hover:text-primary transition-colors py-2 border-b border-border/20"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Colecciones
                  </Link>
                  <Link
                    href="#"
                    className="text-foreground/80 hover:text-primary transition-colors py-2 border-b border-border/20"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sobre Nosotros
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

