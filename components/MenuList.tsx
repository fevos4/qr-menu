"use client"

import { useState } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"
import { MenuItem, Category } from "@/types"
import { supabase } from "@/lib/supabase"
import { RESTAURANT_ID } from "@/lib/constants"

export default function MenuList({
  initialItems,
  categories,
}: {
  initialItems: MenuItem[]
  categories: Category[]
}) {
  const [items, setItems] = useState(initialItems)
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [newName, setNewName] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [newCategoryId, setNewCategoryId] = useState(categories[0].id)
  const [newIsAvailable, setNewIsAvailable] = useState(true)
  const [newImage, setNewImage] = useState<File | null>(null)
  const [newIsPopular, setNewIsPopular] = useState(false)

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this item?")
    if (!confirmed) return

    const { error } = await supabase
      .from("menu_items")
      .delete()
      .eq("id", id)

    if (error) {
      alert("Failed to delete item")
      console.log(error)
      return
    }

    setItems(items.filter((item) => item.id !== id))
  }

  const handleSave = async () => {
    if (!newName || !newPrice) {
      alert("Please fill in the name and price!")
      return
    }

    let imageUrl = null
    if (newImage) {
      const fileExt = newImage.name.split(".").pop()
      const fileName = `${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from("menu-images")
        .upload(fileName, newImage)

      if (uploadError) {
        alert("Failed to upload image")
        console.log(uploadError)
        return
      }

      const { data: urlData } = supabase.storage
        .from("menu-images")
        .getPublicUrl(fileName)

      imageUrl = urlData.publicUrl
    }

    if (editingItem) {
      const updatedItem = {
        name: newName,
        description: newDescription,
        price: parseFloat(newPrice),
        category_id: newCategoryId,
        is_available: newIsAvailable,
        is_popular: newIsPopular,
        ...(imageUrl && { image_url: imageUrl }),
      }

      const { error } = await supabase
        .from("menu_items")
        .update(updatedItem)
        .eq("id", editingItem)

      if (error) {
        alert("Failed to update item")
        console.log(error)
        return
      }

      setItems(items.map((item) =>
        item.id === editingItem
          ? { ...item, ...updatedItem }
          : item
      ))
      setEditingItem(null)
    } else {
      const newItem = {
        name: newName,
        description: newDescription,
        price: parseFloat(newPrice),
        is_popular: newIsPopular,
        category_id: newCategoryId,
        restaurant_id: RESTAURANT_ID,
        preparation_time: 10,
        is_available: newIsAvailable,
        image_url: imageUrl,
      }

      const { data, error } = await supabase
        .from("menu_items")
        .insert(newItem)
        .select()
        .single()

      if (error) {
        alert("Failed to add item")
        console.log(error)
        return
      }

      setItems([...items, data])
    }

    setShowForm(false)
    setNewName("")
    setNewDescription("")
    setNewPrice("")
    setNewCategoryId(categories[0].id)
    setNewIsAvailable(true)
    setNewIsPopular(false)
    setNewImage(null)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Menu Items</h1>
          <p className="text-gray-500 dark:text-stone-400 mt-2">Manage your restaurant menu items</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="group relative bg-amber-700 text-white px-4 py-3 rounded-2xl flex items-center gap-3 font-bold shadow-md transition-all duration-300 ease-out hover:bg-amber-600 hover:shadow-xl hover:-translate-y-1 active:scale-95"
        >
          <Plus size={20} className="transition-transform duration-300 group-hover:rotate-90" />
          <span>Add New</span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-gray-200 dark:border-stone-700 p-6 mb-6 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            {editingItem ? "Edit Item" : "Add New Item"}
          </h2>

          <div className="grid gap-4">
            {/* Availability */}
            <div className="flex items-center justify-between border bg-gray-50 dark:bg-stone-800 border-gray-200 dark:border-stone-700 rounded-lg px-4 py-2">
              <span className="text-sm text-gray-700 dark:text-stone-300 font-medium">Availability</span>
              <button
                type="button"
                onClick={() => setNewIsAvailable(!newIsAvailable)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${newIsAvailable ? "bg-green-500" : "bg-gray-300"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${newIsAvailable ? "translate-x-6" : "translate-x-0"}`} />
              </button>
            </div>

            {/* Popular Toggle */}
            <div className="flex items-center justify-between border bg-gray-50 dark:bg-stone-800 border-gray-200 dark:border-stone-700 rounded-lg px-4 py-2">
              <span className="text-gray-700 dark:text-stone-300 text-sm">Mark As Popular</span>
              <button
                type="button"
                onClick={() => setNewIsPopular(!newIsPopular)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${newIsPopular ? "bg-amber-500" : "bg-gray-300"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${newIsPopular ? "translate-x-6" : "translate-x-0"}`} />
              </button>
            </div>

            {/* Image Upload */}
            <div className="bg-gray-50 dark:bg-stone-800 border border-gray-200 dark:border-stone-700 rounded-xl px-4 py-3">
              <label className="text-sm text-gray-600 dark:text-stone-400 mb-2 block">Item Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewImage(e.target.files?.[0] || null)}
                className="text-sm text-gray-500 dark:text-stone-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 transition"
              />
            </div>

            {/* Inputs */}
            {[
              { value: newName, setter: setNewName, placeholder: "Item name" },
              { value: newDescription, setter: setNewDescription, placeholder: "Description" },
              { value: newPrice, setter: setNewPrice, placeholder: "Price" },
            ].map((field, i) => (
              <input
                key={i}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-stone-800 border border-gray-200 dark:border-stone-700 text-stone-900 dark:text-white placeholder-gray-400 dark:placeholder-stone-500 transition-all duration-200 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 dark:focus:ring-amber-900/30"
              />
            ))}

            {/* Category */}
            <select
              value={newCategoryId}
              onChange={(e) => setNewCategoryId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-stone-800 border border-gray-200 dark:border-stone-700 text-stone-900 dark:text-white transition-all duration-200 focus:outline-none focus:border-amber-500"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="bg-amber-700 text-white px-5 py-3 rounded-2xl font-semibold shadow-md transition-all duration-300 hover:bg-amber-600 hover:shadow-xl hover:-translate-y-1 active:scale-95"
            >
              Save Item
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-5 py-3 rounded-2xl border border-gray-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-medium transition-all duration-300 hover:bg-gray-100 dark:hover:bg-stone-800 hover:-translate-y-1 active:scale-95"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-gray-200 dark:border-stone-800 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[auto_2fr_1fr_1fr_1fr_auto] px-8 py-5 border-b border-gray-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 text-gray-700 dark:text-stone-400 font-semibold">
          <p className="w-16">Image</p>
          <p>Item Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Status</p>
          <p className="text-right">Actions</p>
        </div>

        {/* Table Rows */}
        {items.map((item) => {
          const category = categories.find((cat) => cat.id === item.category_id)
          return (
            <div
              key={item.id}
              className="grid grid-cols-[auto_2fr_1fr_1fr_1fr_auto] items-center px-8 py-6 border-b border-gray-100 dark:border-stone-800 last:border-b-0"
            >
              {/* Image */}
              <div className="w-16 h-16 mr-4">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-stone-800 flex items-center justify-center text-gray-400 dark:text-stone-600 text-xs">
                    No image
                  </div>
                )}
              </div>

              {/* Item Info */}
              <div className="pr-8">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</h2>
                <p className="text-gray-500 dark:text-stone-400 mt-1 text-sm">{item.description}</p>
              </div>

              {/* Category */}
              <div>
                <span className="bg-gray-100 dark:bg-stone-800 text-gray-700 dark:text-stone-300 px-4 py-2 rounded-full text-sm font-medium">
                  {category?.name}
                </span>
              </div>

              {/* Price */}
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">${item.price.toFixed(2)}</p>
              </div>

              {/* Status */}
              <div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  item.is_available
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                }`}>
                  {item.is_available ? "Available" : "Out of Stock"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-5">
                <button
                  onClick={() => {
                    setEditingItem(item.id)
                    setNewName(item.name)
                    setNewDescription(item.description)
                    setNewPrice(item.price.toString())
                    setNewCategoryId(item.category_id)
                    setNewIsAvailable(item.is_available)
                    setNewIsPopular(item.is_popular)
                    setShowForm(true)
                  }}
                  className="text-amber-700 hover:text-amber-500 transition"
                >
                  <Pencil size={22} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-400 transition"
                >
                  <Trash2 size={22} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}