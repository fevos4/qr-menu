import { getMenuItems, getCategories } from "@/lib/data"
import MenuList from "@/components/MenuList"
import { RESTAURANT_ID } from "@/lib/constants"

export default async function MenuItemsPage() {
  const menuItems = await getMenuItems(RESTAURANT_ID)
  const categories = await getCategories(RESTAURANT_ID)

  return <MenuList initialItems={menuItems} categories={categories} />
}