"use client"

import { useState } from "react"
import { Category, MenuItem } from "@/types"
import MenuCard from "./MenuCard"

export default function CategoryTabs({
  categories,
  menuItems,
}: {
  categories: Category[]
  menuItems: MenuItem[]
}) {
  const [selected, setSelected] = useState(categories[0].id)
  const [isSwitching, setIsSwitching] = useState(false)

  const filteredItems = menuItems
    .filter(item => item.category_id === selected)
    .filter(item => item.is_available === true)

  const handleChange = (id: string) => {
    if (id === selected) return
    setIsSwitching(true)
    setTimeout(() => {
      setSelected(id)
      setIsSwitching(false)
    }, 150)
  }

  return (
    <div className="w-full">

      {/* Tabs */}
      <div className="flex gap-2 px-4 py-5 overflow-x-auto scrollbar-hide">
        {categories.map((category) => {
          const isActive = selected === category.id
          return (
            <button
              key={category.id}
              onClick={() => handleChange(category.id)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-out whitespace-nowrap ${
                isActive
                  ? "bg-stone-900 dark:bg-amber-600 text-white scale-105"
                  : "bg-white dark:bg-stone-800 text-gray-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700 hover:bg-amber-50 dark:hover:bg-stone-700 hover:text-amber-700 dark:hover:text-amber-400"
              }`}
            >
              {category.name}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="bg-stone-50 dark:bg-stone-950 py-8 min-h-[300px] transition-colors duration-300">
        <div className={`px-4 space-y-4 transition-all duration-300 ease-out ${
          isSwitching ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="transition-all duration-300 hover:scale-[1.01]">
                <MenuCard item={item} />
              </div>
            ))
          ) : (
            <p className="text-center text-stone-500 dark:text-stone-500 py-10">
              No items in this category
            </p>
          )}
        </div>
      </div>
    </div>
  )
}