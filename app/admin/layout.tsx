"use client"
import {
  LayoutDashboard,
  UtensilsCrossed,
  Folder,
  Settings,
  QrCode,
} from "lucide-react"
import { usePathname } from "next/navigation"
import LogoutButton from "@/components/LogoutButton"
import ThemeToggle from "@/components/ThemeToggle"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/menu", label: "Menu Items", icon: UtensilsCrossed },
    { href: "/admin/categories", label: "Categories", icon: Folder },
    { href: "/admin/settings", label: "Settings", icon: Settings },
    { href: "/admin/qrcode", label: "QR Code", icon: QrCode },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-stone-50 dark:bg-stone-950 transition-colors duration-300">

      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-stone-900 border-r border-stone-100 dark:border-stone-800 flex flex-col h-screen sticky top-0 shrink-0">

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-stone-100 dark:border-stone-800">
          <UtensilsCrossed className="text-amber-600" size={26} />
          <h1 className="text-2xl font-bold text-stone-800 dark:text-white">QuickMenu</h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 p-4 flex-1 overflow-y-auto">
          {links.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400"
                    : "text-stone-600 dark:text-stone-400 hover:bg-amber-50 dark:hover:bg-stone-800 hover:text-amber-700 dark:hover:text-amber-400"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </a>
            )
          })}
        </nav>

        {/* Bottom — Logout + Theme Toggle */}
        <div className="p-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <LogoutButton />
          <ThemeToggle />
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
        {children}
      </main>

    </div>
  )
}