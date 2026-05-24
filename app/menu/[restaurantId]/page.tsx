import { getRestaurant, getCategories, getMenuItems } from "@/lib/data"
import CategoryTabs from "@/components/Category"
import AuthButton from "@/components/AuthButton"
import ThemeToggle from "@/components/ThemeToggle"

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
      <div className="min-h-screen flex items-center justify-center bg-stone-100 dark:bg-stone-950">
        <div className="bg-white dark:bg-stone-900 px-8 py-6 rounded-3xl shadow-xl border border-stone-200 dark:border-stone-800">
          <p className="text-stone-700 dark:text-stone-300 text-lg font-semibold">
            Restaurant not found
          </p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300">

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-stone-900 dark:bg-stone-950 border-b border-stone-800">

        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 via-transparent to-orange-900/20" />

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

          {/* Right — Theme Toggle + Auth */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <AuthButton />
          </div>

        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="bg-white dark:bg-stone-900 rounded-3xl shadow-xl border border-stone-200 dark:border-stone-800 overflow-hidden transition-all duration-500">
          <CategoryTabs
            categories={categories}
            menuItems={menuItems}
          />
        </div>
      </div>

    </main>
  )
}