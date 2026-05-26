import { getRestaurantByOwner } from "@/lib/data"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export default async function QRPage() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        }
      }
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const restaurant = await getRestaurantByOwner(user.id)
  if (!restaurant) return (
    <div className="p-8 text-center text-stone-500">
      No restaurant found. Please register first.
    </div>
  )

  const menuUrl = `${process.env.NEXT_PUBLIC_APP_URL}/menu/${restaurant.id}`
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(menuUrl)}`

  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">QR Code</h1>
      <p className="text-gray-500 dark:text-stone-400 mb-8">Scan this to view your menu</p>

      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-gray-200 dark:border-stone-800 p-8 inline-block">
        <img src={qrImageUrl} alt="QR Code" width={256} height={256} />
        <p className="text-center text-gray-500 dark:text-stone-400 mt-4 text-sm break-all">
          {menuUrl}
        </p>
        <a
          href={qrImageUrl}
          download="qr-code.png"
          className="mt-4 block text-center bg-amber-700 text-white px-4 py-2 rounded-xl hover:bg-amber-600 transition"
        >
          Download QR Code
        </a>
      </div>
    </div>
  )
}