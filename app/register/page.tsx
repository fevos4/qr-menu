"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { UtensilsCrossed } from "lucide-react"
import ThemeToggle from "@/components/ThemeToggle"

export default function RegisterPage() {
  const router = useRouter()
  const [restaurantName, setRestaurantName] = useState("")
  const [slogan, setSlogan] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    setLoading(true)
    setError("")

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password
    })

    if (signUpError || !data.user) {
      setError(signUpError?.message || "Failed to create account")
      setLoading(false)
      return
    }

    const { error: restaurantError } = await supabase
      .from("restaurants")
      .insert({
        name: restaurantName,
        slogan: slogan,
        owner_id: data.user.id
      })

    if (restaurantError) {
      setError("Failed to create restaurant")
      setLoading(false)
      return
    }

    router.push("/admin")
  }

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 flex items-center justify-center transition-colors duration-300">

      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-gray-200 dark:border-stone-800 p-8 w-full max-w-md shadow-lg">

        <div className="flex items-center gap-2 mb-6">
          <UtensilsCrossed className="text-amber-600" size={24} />
          <span className="text-xl font-black text-stone-800 dark:text-white">QuickMenu</span>
        </div>

        <h1 className="text-3xl font-bold text-stone-800 dark:text-white mb-2">Register Your Restaurant</h1>
        <p className="text-gray-500 dark:text-stone-400 mb-6">Create your account and start managing your menu</p>

        {error && (
          <p className="text-red-500 text-sm mb-4 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{error}</p>
        )}

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Restaurant name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            className="border border-gray-200 dark:border-stone-700 rounded-lg px-4 py-2 w-full bg-gray-50 dark:bg-stone-800 text-stone-900 dark:text-white placeholder-gray-400 dark:placeholder-stone-500 focus:outline-none focus:border-amber-500"
          />
          <input
            type="text"
            placeholder="Slogan (e.g. Best coffee in town)"
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
            className="border border-gray-200 dark:border-stone-700 rounded-lg px-4 py-2 w-full bg-gray-50 dark:bg-stone-800 text-stone-900 dark:text-white placeholder-gray-400 dark:placeholder-stone-500 focus:outline-none focus:border-amber-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-200 dark:border-stone-700 rounded-lg px-4 py-2 w-full bg-gray-50 dark:bg-stone-800 text-stone-900 dark:text-white placeholder-gray-400 dark:placeholder-stone-500 focus:outline-none focus:border-amber-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-200 dark:border-stone-700 rounded-lg px-4 py-2 w-full bg-gray-50 dark:bg-stone-800 text-stone-900 dark:text-white placeholder-gray-400 dark:placeholder-stone-500 focus:outline-none focus:border-amber-500"
          />
          <button
            onClick={handleRegister}
            disabled={loading}
            className="bg-amber-700 text-white px-4 py-2 rounded-xl hover:bg-amber-600 transition font-bold disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </div>

        <p className="text-center text-gray-500 dark:text-stone-400 mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-amber-700 dark:text-amber-500 font-bold">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}