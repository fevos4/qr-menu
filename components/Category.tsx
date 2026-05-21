"use client";

import { useState } from "react";
import { Category, MenuItem } from "@/types";
import MenuCard from "./MenuCard";

export default function CategoryTabs({
  categories,
  menuItems,
}: {
  categories: Category[];
  menuItems: MenuItem[];
}) {
  const [selected, setSelected] = useState(categories[0].id);
  const [isSwitching, setIsSwitching] = useState(false);

  const filteredItems = menuItems.filter(
    (item) => item.category_id === selected
  );

  const handleChange = (id: string) => {
    if (id === selected) return;

    setIsSwitching(true);

    // small delay for smooth transition feel
    setTimeout(() => {
      setSelected(id);
      setIsSwitching(false);
    }, 150);
  };

  return (
    <div className="w-full">

      {/* Tabs */}
      <div className="flex gap-2 px-4 py-5 scrollbar-hide">
        {categories.map((category) => {
          const isActive = selected === category.id;

          return (
            <button
              key={category.id}
              onClick={() => handleChange(category.id)}
              className={`
                relative px-5 py-2.5 rounded-full text-sm font-medium
                transition-all duration-300 ease-out whitespace-nowrap

                ${
                  isActive
                    ? "bg-amber-100 text-black scale-105"
                    : "bg-white text-gray-600 border border-stone-200 hover:bg-amber-50 hover:text-amber-700 hover:scale-105"
                }
              `}
            >
              {category.name}

              {/* active glow indicator */}
              {isActive && (
                <span className="absolute inset-0 rounded-full bg-stone-900 blur-md opacity-20 -z-10" />
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-gradient-to-b from-stone-50 to-stone-100 py-8 min-h-[300px]">
        <div
          className={`
            px-4 space-y-4
            transition-all duration-300 ease-out
            ${isSwitching ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}
          `}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="transition-all duration-300 hover:scale-[1.01]"
              >
                <MenuCard item={item} />
              </div>
            ))
          ) : (
            <p className="text-center text-stone-500 py-10">
              No items in this category
            </p>
          )}
        </div>
      </div>
    </div>
  );
}