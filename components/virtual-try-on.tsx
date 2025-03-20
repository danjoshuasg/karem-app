"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useCart } from "@/components/cart-provider"
import { Upload, X, Camera, Check, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

interface VirtualTryOnProps {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VirtualTryOn({ product, open, onOpenChange }: VirtualTryOnProps) {
  const { addItem } = useCart()
  const [userImage, setUserImage] = useState<string | null>(null)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const jewelryRef = useRef<HTMLDivElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUserImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddToCart = () => {
    addItem(product)
    onOpenChange(false)
  }

  const clearImage = () => {
    setUserImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (jewelryRef.current) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging && jewelryRef.current) {
        const newX = Math.max(0, Math.min(100, e.clientX - dragStart.x))
        const newY = Math.max(0, Math.min(100, e.clientY - dragStart.y))
        setPosition({ x: newX, y: newY })
      }
    },
    [isDragging, dragStart],
  )

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] glass-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair text-primary">Probador Virtual</DialogTitle>
          <DialogDescription>Visualiza cómo luciría {product.name} en tu foto</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 glass-effect">
            <TabsTrigger value="upload">Subir Foto</TabsTrigger>
            <TabsTrigger value="preview">Visualizar</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4 py-4">
            <Card className="glass-effect">
              <CardContent className="flex flex-col items-center justify-center p-6 h-[300px]">
                <Sparkles className="h-12 w-12 text-secondary mb-4" />
                <p className="text-center text-muted-foreground mb-4">
                  Sube una foto para probar cómo se vería{" "}
                  {product.material === "oro" ? "esta joya dorada" : "esta joya plateada"}
                </p>
                <div className="flex gap-4">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Upload className="mr-2 h-4 w-4" /> Seleccionar imagen
                  </Button>
                  <Button variant="outline">
                    <Camera className="mr-2 h-4 w-4" /> Usar cámara
                  </Button>
                </div>
                <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                onClick={() => document.querySelector('[data-value="preview"]')?.dispatchEvent(new MouseEvent("click"))}
                disabled={!userImage}
              >
                Continuar
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4 py-4">
            {userImage ? (
              <>
                <div
                  className="relative aspect-square w-full overflow-hidden rounded-lg border border-border/30 glass-effect"
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <Image src={userImage || "/placeholder.svg"} alt="Tu imagen" fill className="object-cover" />

                  <div
                    ref={jewelryRef}
                    className={`absolute cursor-move`}
                    style={{
                      left: `${position.x}%`,
                      top: `${position.y}%`,
                      transform: `translate(-50%, -50%) scale(${scale})`,
                      width: getJewelrySize(product.type),
                    }}
                    onMouseDown={handleMouseDown}
                  >
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={150}
                      height={150}
                      className="object-contain"
                    />
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-2 right-2 bg-background/80"
                    onClick={clearImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="scale">Tamaño</Label>
                      <span className="text-muted-foreground text-sm">{Math.round(scale * 100)}%</span>
                    </div>
                    <Slider
                      id="scale"
                      min={0.5}
                      max={2}
                      step={0.1}
                      value={[scale]}
                      onValueChange={(value) => setScale(value[0])}
                    />
                  </div>

                  <p className="text-sm text-muted-foreground italic">
                    Arrastra la joya para posicionarla donde desees
                  </p>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() =>
                      document.querySelector('[data-value="upload"]')?.dispatchEvent(new MouseEvent("click"))
                    }
                  >
                    Volver
                  </Button>
                  <Button
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    onClick={handleAddToCart}
                  >
                    <Check className="mr-2 h-4 w-4" /> Agregar al carrito
                  </Button>
                </DialogFooter>
              </>
            ) : (
              <div className="text-center py-12">
                <p>Por favor, sube una imagen primero.</p>
                <Button
                  className="mt-4"
                  onClick={() =>
                    document.querySelector('[data-value="upload"]')?.dispatchEvent(new MouseEvent("click"))
                  }
                >
                  Subir imagen
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

// Función para determinar el tamaño de la joya según su tipo
function getJewelrySize(type: string): string {
  switch (type) {
    case "anillo":
      return "25%"
    case "collar":
      return "40%"
    case "aretes":
      return "20%"
    case "pulsera":
      return "35%"
    case "tobillera":
      return "30%"
    default:
      return "30%"
  }
}

