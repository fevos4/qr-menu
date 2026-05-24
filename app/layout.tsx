import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import ThemeProvider from "@/components/ThemeProvider"

const geist = Geist({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "QuickMenu",
  description: "Digitalize your restaurant menu",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geist.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}