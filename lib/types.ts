export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  type: "anillo" | "collar" | "aretes" | "pulsera" | "tobillera"
  material: "oro" | "plata"
}

