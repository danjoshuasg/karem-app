import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "@/components/providers"
import Header from "@/components/header"
import { Footer } from "@/components/footer"
import { playfairDisplay, notoSansDisplay } from "@/lib/fonts"

export const metadata: Metadata = {
  title: "La Vitrine | Joyería Exclusiva",
  description: "Joyería personalizada de oro y plata – Elegancia con un toque de distinción",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${playfairDisplay.variable} ${notoSansDisplay.variable}`}>
      <body className={notoSansDisplay.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}



import './globals.css'