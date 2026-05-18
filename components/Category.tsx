"use client"

import { useState } from "react"
import { Category, MenuItem } from "@/types"
import MenuCard from "./MenuCard"

export default function CategoryTabs({ categories, menuItems }: { 
  categories: Category[]
  menuItems: MenuItem[]
}) {
  const [selected, setSelected] = useState(categories[0].id)

  const filteredItems = menuItems.filter((item) => item.categoryId === selected)

  return (
    <div>
      <div className="flex gap-2 p-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelected(category.id)}
            className={selected === category.id 
            ? "px-4 py-2 rounded-full bg-stone-800 text-white" 
            : "px-4 py-2 rounded-full border border-stone-400 text-stone-600"}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="bg-stone-100 py-6">
        <div className="max-w-2xl mx-auto px-4">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}