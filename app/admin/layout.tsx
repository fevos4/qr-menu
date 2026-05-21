"use client"
import {
  LayoutDashboard,
  UtensilsCrossed,
  Folder,
  Settings,
} from "lucide-react"
import { usePathname } from "next/navigation"
import LogoutButton from "@/components/LogoutButton"

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
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">

      {/* Sidebar — fixed height, never scrolls */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 shrink-0">

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100">
          <UtensilsCrossed className="text-amber-600" size={26} />
          <h1 className="text-2xl font-bold text-stone-800">QuickMenu</h1>
        </div>

        {/* Navigation — takes all remaining space */}
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
                    ? "bg-amber-100 text-amber-800"
                    : "text-gray-600 hover:bg-amber-50 hover:text-amber-700"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </a>
            )
          })}
        </nav>

        {/* Logout — always pinned to bottom */}
        <div className="p-4 border-t border-gray-100 shrink-0">
          <LogoutButton />
        </div>

      </aside>

      {/* Main Content — only this scrolls */}
      <main className="flex-1 overflow-y-auto p-8 bg-[#fafafa]">
        {children}
      </main>

    </div>
  )
}