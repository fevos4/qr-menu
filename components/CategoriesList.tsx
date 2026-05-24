"use client"
import { useState } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"
import { Category } from "@/types"
import { supabase } from "@/lib/supabase"
import { RESTAURANT_ID } from "@/lib/constants"

export default function CategoriesList({ initialCategories, restaurantId }: {
  initialCategories: Category[],
  restaurantId: string
}) {
  const [categories, setCategories] = useState(initialCategories)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newName, setNewName] = useState("")

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this category?")
    if (!confirmed) return

    const { data: items } = await supabase
      .from("menu_items")
      .select("id")
      .eq("category_id", id)

    if (items && items.length > 0) {
      alert(`Cannot delete this category — it has ${items.length} menu item(s) attached to it. Please move or delete those items first!`)
      return
    }

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id)

    if (error) {
      alert("Failed to delete category")
      return
    }

    setCategories(categories.filter(cat => cat.id !== id))
  }

  const handleSave = async () => {
    if (!newName) {
      alert("Please enter a category name!")
      return
    }

    if (editingId) {
      const { error } = await supabase
        .from("categories")
        .update({ name: newName })
        .eq("id", editingId)

      if (error) {
        alert("Failed to update category")
        return
      }

      setCategories(categories.map(cat =>
        cat.id === editingId ? { ...cat, name: newName } : cat
      ))
      setEditingId(null)
    } else {
      const { data, error } = await supabase
        .from("categories")
        .insert({ name: newName, restaurant_id: restaurantId, })
        .select()
        .single()

      if (error) {
        alert("Failed to add category")
        return
      }

      setCategories([...categories, data])
    }

    setShowForm(false)
    setNewName("")
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Categories</h1>
          <p className="text-gray-500 dark:text-stone-400 mt-2">Manage your menu categories</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setNewName("") }}
          className="bg-amber-700 hover:bg-amber-600 text-white px-4 py-3 rounded-2xl flex items-center gap-3 font-bold shadow-md transition"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-gray-200 dark:border-stone-700 p-6 mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            {editingId ? "Edit Category" : "Add New Category"}
          </h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Category name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border bg-gray-50 dark:bg-stone-800 border-gray-200 dark:border-stone-700 text-stone-900 dark:text-white placeholder-gray-400 dark:placeholder-stone-500 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:border-amber-500"
            />
            <button
              onClick={handleSave}
              className="bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded-xl transition"
            >
              Save
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="border border-gray-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-stone-800 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-gray-200 dark:border-stone-800 overflow-hidden">
        <div className="grid grid-cols-[1fr_auto] px-8 py-5 border-b border-gray-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 text-gray-700 dark:text-stone-400 font-semibold">
          <p>Category Name</p>
          <p>Actions</p>
        </div>

        {categories.map((cat) => (
          <div
            key={cat.id}
            className="grid grid-cols-[1fr_auto] items-center px-8 py-5 border-b border-gray-100 dark:border-stone-800 last:border-b-0"
          >
            <p className="font-medium text-slate-900 dark:text-white">{cat.name}</p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setEditingId(cat.id)
                  setNewName(cat.name)
                  setShowForm(true)
                }}
                className="text-amber-700 hover:text-amber-500 transition"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                className="text-red-500 hover:text-red-400 transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}