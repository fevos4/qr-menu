"use client"
import { useState } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"
import { menuItems, categories } from "@/lib/data"

export default function MenuItemsPage() {
  const [items, setItems] = useState(menuItems)

const handleDelete = (id: string) => {
  const confirmed = confirm("Are you sure you want to delete this item?")
  if (confirmed) {
    setItems(items.filter(item => item.id !== id))
  }
}
const [editingItem, setEditingItem] = useState<string | null>(null)

const [showForm, setShowForm] = useState(false)
const [newName, setNewName] = useState("")
const [newDescription, setNewDescription] = useState("")
const [newPrice, setNewPrice] = useState("")
const [newCategoryId, setNewCategoryId] = useState(categories[0].id)

const handleSave = () => {
  if (editingItem) {
    // UPDATE existing item
    setItems(items.map(item => 
      item.id === editingItem 
        ? { 
            ...item, 
            name: newName, 
            description: newDescription, 
            price: parseFloat(newPrice),
            categoryId: newCategoryId
          } 
        : item
    ))
    setEditingItem(null)
  } else {
    // ADD new item
    const newItem = {
      id: `item_00${items.length + 1}`,
      name: newName,
      description: newDescription,
      price: parseFloat(newPrice),
      isAvailable: true,
      isPopular: false,
      categoryId: newCategoryId,
      restaurantId: "rest_001",
      preparationTime: 10
    }
    setItems([...items, newItem])
  }

  // reset everything
  setShowForm(false)
  setNewName("")
  setNewDescription("")
  setNewPrice("")
  setNewCategoryId(categories[0].id)
}

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Menu Items
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your restaurant menu items
          </p>
        </div>

        <button onClick={() => setShowForm(true)} className="bg-amber-700 hover:bg-amber-100 hover:text-black text-white px-4 py-3 rounded-2xl flex items-center gap-3 font-bold shadow-md transition">
          <Plus size={20} />
          Add New Item
        </button>
      </div>
{showForm && (
  <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
    <h2 className="text-xl font-bold text-slate-900 mb-4">Add New Item</h2>
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Item name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        className="border bg-gray-50 border-gray-200 rounded-lg px-4 py-2 w-full"
      />
      <input
        type="text"
        placeholder="Description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        className="border bg-gray-50 border-gray-200 rounded-lg px-4 py-2 w-full"
      />
      <select
  value={newCategoryId}
  onChange={(e) => setNewCategoryId(e.target.value)}
  className="border bg-gray-50 border-gray-200 rounded-lg px-4 py-2 w-full"
>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.id}>
      {cat.name}
    </option>
  ))}
</select>
      <input
        type="number"
        placeholder="Price"
        value={newPrice}
        onChange={(e) => setNewPrice(e.target.value)}
        className="border bg-gray-50 border-gray-200 rounded-lg px-4 py-2 w-full"
      />
    </div>
    <div className="flex gap-3 mt-4">
      <button onClick={handleSave} className="bg-amber-700 hover:bg-amber-100 hover:text-black shadow-2xl text-white px-4 py-2 rounded-2xl">
        Save Item
      </button>
      <button onClick={() => setShowForm(false)} className="border hover:bg-gray-200 border-gray-200 px-4 py-2 rounded-2xl">
        Cancel
      </button>
    </div>
  </div>
)}
      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] px-8 py-5 border-b border-gray-200 bg-[#f5f5f5] text-gray-700 font-semibold">
          <p>Item Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Status</p>
          <p className="text-right">Actions</p>
        </div>

        {/* Table Rows */}
        {items.map((item) => {
          const category = categories.find(
            (cat) => cat.id === item.categoryId
          )

          return (
            <div
              key={item.id}
              className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-center px-8 py-6 border-b border-gray-100 last:border-b-0"
            >
              {/* Item Info */}
              {/* Item Info */}
            <div className="pr-8">
                 <h2 className="text-sm font-bold text-slate-900">
                    {item.name}
                 </h2>
                <p className="text-gray-500 mt-2 text-sm">
                     {item.description}
                </p>
            </div>

              {/* Category */}
              <div>
                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                  {category?.name}
                </span>
              </div>

              {/* Price */}
              <div>
                <p className=" font-semibold text-slate-900">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              {/* Status */}
              <div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    item.isAvailable
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.isAvailable
                    ? "Available"
                    : "Out of Stock"}
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
                  setNewCategoryId(item.categoryId)
                  setShowForm(true)
  }}
                 className="text-amber-700 hover:text-blue-700 transition">
                  <Pencil size={22} />
                </button>

                <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-black transition">
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