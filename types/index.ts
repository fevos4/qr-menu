export type MenuItem = {
  id: string
  name: string
  price: number
  isPopular: boolean
  isAvailable: boolean
  description: string
  categoryId: string
  restaurantId: string
  preparationTime: number
  // anything else for future features?
}

export type Category = {
  id: string
  name: string
  restaurantId: string
  // does it need restaurantId?
}

export type Restaurant = {
  id: string
  name: string
  slogan: string

  // what was the answer to the slogan question?
}