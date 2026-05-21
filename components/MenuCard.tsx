import { MenuItem } from "@/types"

export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="border bg-stone-50 border-stone-200 rounded-lg p-4 mt-4">
        <div className="flex items-center gap-2">
      <h3 className="text-xl font-bold text-stone-800">{item.name}</h3> 
      {item.is_popular && <span className="text-sm px-2 py-1 bg-amber-100 text-amber-800 rounded-2xl font-bold ">Popular</span>}
      </div>
      <p className="text-stone-500">{item.description}</p>
      <p className="text-amber-700">${item.price.toFixed(2)}</p>
    </div>
  )
}