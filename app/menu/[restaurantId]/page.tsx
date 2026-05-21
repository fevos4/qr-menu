import { getRestaurant, getCategories, getMenuItems } from "@/lib/data"
import CategoryTabs from "@/components/Category"

export default async function MenuPage({
  params,
}: {
  params: Promise<{ restaurantId: string }>
}) {
  const { restaurantId } = await params

  const restaurant = await getRestaurant(restaurantId)
  const categories = await getCategories(restaurantId)
  const menuItems = await getMenuItems(restaurantId)

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-stone-100 to-stone-200">
        <div className="bg-white px-8 py-6 rounded-3xl shadow-xl border border-stone-200">
          <p className="text-stone-700 text-lg font-semibold">
            Restaurant not found
          </p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-[#f8f6f2] via-stone-50 to-stone-100">

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-stone-900">

        {/* Background Glow */}
        <div className="absolute inset-0 bg-linear-to-r from-amber-900/30 via-transparent to-orange-900/20" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-16 flex justify-between items-center">

          {/* Left — Restaurant Info */}
          <div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white">
              {restaurant.name}
            </h1>
            <p className="text-stone-300 text-lg mt-4 max-w-2xl leading-relaxed">
              {restaurant.slogan}
            </p>
            <div className="w-24 h-1 bg-amber-500 rounded-full mt-6" />
          </div>

          {/* Right — Sign In Button */}
          <a
            href="/auth/login"
            className="bg-amber-700 hover:bg-amber-600 text-white px-6 py-3 rounded-xl transition font-bold text-sm shrink-0"
          >
            Sign In
          </a>

        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-4xl shadow-xl border border-stone-200 overflow-hidden transition-all duration-500 hover:shadow-2xl">
          <CategoryTabs
            categories={categories}
            menuItems={menuItems}
          />
        </div>
      </div>

    </main>
  )
}