import { getMenuItems, getCategories } from "@/lib/data"
import MenuList from "@/components/MenuList"

export default async function MenuItemsPage() {
  const menuItems = await getMenuItems("rest_001")
  const categories = await getCategories("rest_001")

  return <MenuList initialItems={menuItems} categories={categories} />
}