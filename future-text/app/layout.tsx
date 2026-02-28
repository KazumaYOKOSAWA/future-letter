import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "./provider"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const _jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })

export const metadata: Metadata = {
  title: "Chronopost - Messages to Your Future Self",
  description:
    "Send messages through time to your future self. Write today, receive tomorrow.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#0a0b14",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${_inter.variable} ${_jetbrains.variable} font-sans antialiased`}
      >
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}