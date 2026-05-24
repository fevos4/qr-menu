import { getRestaurantByOwner, getMenuItems, getCategories } from "@/lib/data"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export default async function AdminPage() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        }
      }
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const restaurant = await getRestaurantByOwner(user.id)

  if (!restaurant) return (
    <div className="p-8 text-center">
      <p className="text-stone-600 dark:text-stone-400">No restaurant found. Please register your restaurant first.</p>
    </div>
  )

  const menuItems = await getMenuItems(restaurant.id)
  const categories = await getCategories(restaurant.id)
  const recentItems = [...menuItems].reverse().slice(0, 5)

  return (
    <div>
      <h1 className="text-3xl font-bold text-stone-800 dark:text-white mb-2">Dashboard</h1>
      <p className="mb-8 text-gray-400 dark:text-stone-500">Welcome back, {restaurant.name}!</p>

      {/* Stats */}
      <div className="flex gap-4 mb-8">
        <div className="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl p-6 flex-1">
          <p className="text-stone-500 dark:text-stone-400">Total Menu Items</p>
          <p className="text-4xl font-bold text-stone-800 dark:text-white">{menuItems.length}</p>
        </div>
        <div className="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl p-6 flex-1">
          <p className="text-stone-500 dark:text-stone-400">Total Categories</p>
          <p className="text-4xl font-bold text-stone-800 dark:text-white">{categories.length}</p>
        </div>
        <div className="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl p-6 flex-1">
          <p className="text-stone-500 dark:text-stone-400">Available Items</p>
          <p className="text-4xl font-bold text-stone-800 dark:text-white">
            {menuItems.filter(item => item.is_available).length}
          </p>
        </div>
      </div>

      {/* Recent Items */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100 dark:border-stone-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recently Added Items</h2>
        </div>
        {recentItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 px-6 py-4 border-b border-stone-100 dark:border-stone-800 last:border-b-0">
            {item.image_url && (
              <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
            )}
            <div className="flex-1">
              <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
              <p className="text-gray-500 dark:text-stone-400 text-sm">${item.price.toFixed(2)}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              item.is_available
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
            }`}>
              {item.is_available ? "Available" : "Out of Stock"}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}