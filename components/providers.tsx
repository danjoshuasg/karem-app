"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/components/cart-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  )
}

