import {
  LayoutDashboard,
  UtensilsCrossed,
  Folder,
  Settings,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100">
          <UtensilsCrossed className="text-amber-700" size={26} />
          <h1 className="text-2xl font-bold text-stone-800">
            QuickMenu
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 p-4">

          <a
            href="/admin"
            className="flex items-center gap-3 text-gray-600 hover:bg-amber-50 hover:text-amber-700 hover:border-l-4 border-amber-700 px-4 py-3 rounded-r-xl font-semibold"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </a>

          {/* Normal Links */}
          <a
            href="/admin/menu"
            className="flex items-center gap-3 text-gray-600 hover:bg-amber-50 hover:text-amber-700 hover:border-l-4 border-amber-700 px-4 py-3 rounded-r-xl transition font-semibold"
          >
            <UtensilsCrossed size={20} />
            <span>Menu Items</span>
          </a>

          <a
            href="/admin/categories"
            className="flex items-center gap-3 text-gray-600 hover:bg-amber-50 hover:text-amber-700 hover:border-l-4 border-amber-700 px-4 py-3 rounded-r-xl transition font-semibold"
          >
            <Folder size={20} />
            <span>Categories</span>
          </a>

          <a
            href="/admin/settings"
            className="flex items-center gap-3 text-gray-600 hover:bg-amber-50 hover:text-amber-700 hover:border-l-4 border-amber-700 px-4 py-3 rounded-r-xl transition font-semibold"
          >
            <Settings size={20} />
            <span>Settings</span>
          </a>

        </nav>
        <div className="mt-auto text-sm text-gray-500">
          <p>John Doe</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-[#fafafa]">
        {children}
      </main>

    </div>
  );
}