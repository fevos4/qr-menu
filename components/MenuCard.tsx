import { MenuItem } from "@/types"

export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="border border-stone-200 dark:border-stone-800 rounded-xl p-4 bg-white dark:bg-stone-900 flex gap-4 items-center transition-colors duration-300">

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
          <h3 className="text-xl font-bold text-stone-800 dark:text-white">{item.name}</h3>
          {item.is_popular && (
            <span className="text-sm px-2 py-1 bg-amber-100 dark:bg-amber-900/30 rounded-2xl font-bold text-amber-800 dark:text-amber-400">
              Popular
            </span>
          )}
        </div>
        <p className="text-stone-500 dark:text-stone-400">{item.description}</p>
        <p className="text-amber-700 dark:text-amber-500 font-bold">${item.price.toFixed(2)}</p>
      </div>

    </div>
  )
}