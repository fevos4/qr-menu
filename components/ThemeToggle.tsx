"use client"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-xl border 
      border-stone-200 dark:border-stone-700
      bg-white dark:bg-stone-900
      hover:bg-stone-100 dark:hover:bg-stone-800
      transition"
    >
      {theme === "dark"
        ? <Sun size={18} className="text-amber-400" />
        : <Moon size={18} className="text-stone-600" />
      }
    </button>
  )
}