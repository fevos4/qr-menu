import { getMenuItems, getCategories } from "@/lib/data"
import { UtensilsCrossed } from 'lucide-react';
import { Folder } from 'lucide-react';
import { Clock } from 'lucide-react';
import { RESTAURANT_ID } from "@/lib/constants"

export default async function AdminPage() {
  const menuItems = await getMenuItems(RESTAURANT_ID)
  const categories = await getCategories(RESTAURANT_ID)
  return (
    <div>
      <h1 className="text-3xl font-bold text-stone-800 mb-2">Dashboard</h1>
      <p className="mb-8 text-gray-400">Overview of your restaurant menu system</p>
      <div className="flex gap-4">
        {/* Card 1 - Total Menu Items */}
        <div className="bg-white rounded-lg p-6 flex-1">
            <UtensilsCrossed className="text-stone-800" size={32} />
          <p className="text-stone-500">Total Menu Items</p>
          <p className="text-4xl font-bold text-stone-800">{menuItems?.length}</p>
        </div>
  <div className="bg-white rounded-lg p-6 flex-1">
       <Folder className="text-orange-400" size={32} />
          <p className="text-stone-500">Total Categories</p>
          {menuItems && <p className="text-4xl font-bold text-stone-800">{categories?.length}</p>}
        </div>


         <div className="bg-white rounded-lg p-6 flex-1">
          <Clock className="text-blue-400" size={32} />
          <p className="text-stone-500">Recently Updated</p>
          {menuItems && <p className="text-4xl font-bold text-stone-800">{menuItems?.filter(item => item.is_available).length}</p>}
        </div>
      </div>
    </div>
  )
}