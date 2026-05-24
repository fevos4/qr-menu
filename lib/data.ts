import { supabase } from "./supabase"
import { MenuItem, Category, Restaurant } from "@/types"

export async function getRestaurant(id: string): Promise<Restaurant | null> {
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error(error)
    return null
  }

  return data
}

export async function getCategories(restaurantId: string): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("restaurant_id", restaurantId)

  if (error) {
    console.error(error)
    return []
  }

  return data
}

export async function getMenuItems(restaurantId: string): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("restaurant_id", restaurantId)

  if (error) {
    console.error(error)
    return []
  }

  return data
}
export async function getRestaurantByOwner(ownerId: string): Promise<Restaurant | null> {
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("owner_id", ownerId)
    .single()

  if (error) {
    console.error(error)
    return null
  }

  return data
}