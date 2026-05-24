import { getCategories } from "@/lib/data"
import CategoriesList from "@/components/CategoriesList"
import { RESTAURANT_ID } from "@/lib/constants"

export default async function CategoriesPage() {
  const categories = await getCategories(RESTAURANT_ID)
  return <CategoriesList initialCategories={categories} />
}