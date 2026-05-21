import { getRestaurant, getCategories, getMenuItems } from "@/lib/data"
import CategoryTabs from "@/components/Category"

export default async function MenuPage({ params }: { params: Promise<{ restaurantId: string }> }) {
  const { restaurantId } = await params

  const restaurant = await getRestaurant(restaurantId)
  const categories = await getCategories(restaurantId)
  const menuItems = await getMenuItems(restaurantId)

  if (!restaurant) {
    return <div className="p-8 text-center">Restaurant not found</div>
  }

  return (
    <main>
      <div className="bg-stone-800 text-white p-8">
        <h1 className="text-4xl font-bold">{restaurant.name}</h1>
        <p className="text-stone-300 mt-1">{restaurant.slogan}</p>
      </div>

      <div className="bg-stone-100">
        <CategoryTabs categories={categories} menuItems={menuItems} />
      </div>
    </main>
  )
}