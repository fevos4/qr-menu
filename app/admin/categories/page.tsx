import { getCategories, getRestaurantByOwner } from "@/lib/data"
import CategoriesList from "@/components/CategoriesList"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"


export default async function CategoriesPage() {
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
    <div className="p-8 text-center text-stone-500">
      No restaurant found. Please register first.
    </div>
  )

  const categories = await getCategories(restaurant.id)

  return <CategoriesList initialCategories={categories} restaurantId={restaurant.id} />
}