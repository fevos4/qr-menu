import { restaurant, categories, menuItems } from "@/lib/data"
import MenuCard from "@/components/MenuCard"
import CategoryTabs from "@/components/Category"
import { playfair } from "@/app/layout"



export default async function MenuPage({ params }: { params: Promise<{ restaurantId: string }> }) {
  const { restaurantId } = await params

  return (
    <main >
      <div className="bg-stone-800 text-white p-8">
        <h1 className= "text-4xl font-bold">{restaurant.name}</h1>
      <p className="text-stone-300 mt-1">{restaurant.slogan}</p>
      </div>
      <div >
      <CategoryTabs categories={categories} menuItems={menuItems} />
      </div>
     

    </main>
  )
}