export type MenuItem = {
  id: string
  name: string
  price: number
  is_popular: boolean
  is_available: boolean
  description: string
  category_id: string
  restaurant_id: string
  preparation_time: number
}

export type Category = {
  id: string
  name: string
  restaurant_id: string
}

export type Restaurant = {
  id: string
  name: string
  slogan: string
}