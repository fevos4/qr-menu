import { MenuItem } from "@/types"

export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="border border-stone-200 rounded-lg p-4 mt-4 bg-stone-50 flex gap-4 items-center">
      
      {/* Image */}
      {item.image_url && (
        <img 
          src={item.image_url} 
          alt={item.name}
          className="w-20 h-20 rounded-lg object-cover shrink-0"
        />
      )}

      {/* Info */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-stone-800">{item.name}</h3>
          {item.is_popular && (
            <span className="text-sm px-2 py-1 bg-amber-100 rounded-2xl font-bold text-amber-800">
              Popular
            </span>
          )}
        </div>
        <p className="text-stone-500">{item.description}</p>
        <p className="text-amber-700 font-bold">${item.price.toFixed(2)}</p>
      </div>

    </div>
  )
}