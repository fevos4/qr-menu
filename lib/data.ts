import { MenuItem, Category, Restaurant } from "@/types"

export const restaurant: Restaurant = {
  id: "rest_001",
  name: "Fresh Cafe",
  slogan: "Enjoy your coffee!" 
}

export const categories: Category[] = [
  {
    id: "001",
    name: "Drinks",
    restaurantId: "rest_001"
  },
  {
    id: "002",
    name: "Food",
    restaurantId: "rest_001"
  },
  {
    id: "003",
    name: "Desserts",
    restaurantId: "rest_001"
  }
]

export const menuItems: MenuItem[] = [
  {
    id: "item_001",
    name: "Iced Latte",
    price: 4.50,
    isPopular: true,
    isAvailable: false,
    description: "A refreshing blend of espresso and milk served over ice.",
    categoryId: "001",
    restaurantId: "rest_001",
    preparationTime: 5
  },{
  id: "item_002",
  name: "Avocado Toast",
  price: 6.0,
  isPopular: true,
  isAvailable: true,
  description: "Toasted bread topped with mashed avocado, cherry tomatoes, and a sprinkle of salt.",
  categoryId: "002",
  restaurantId: "rest_001",   
  preparationTime: 10
  },
  {
    id: "item_003",
    name: "Chocolate Cake",
    price: 5.0,
    isPopular: false,
    isAvailable: true,
    description: "Rich and moist chocolate cake topped with a layer of chocolate ganache.",
    categoryId: "003",
    restaurantId: "rest_001",
    preparationTime: 15
  }
  
]