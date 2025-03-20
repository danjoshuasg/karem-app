import { Playfair_Display, Noto_Sans_Display } from "next/font/google"

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
})

export const notoSansDisplay = Noto_Sans_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans",
  weight: ["300", "400", "500", "600"],
})

