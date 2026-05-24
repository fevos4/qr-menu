"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { UtensilsCrossed } from "lucide-react"
import ThemeToggle from "@/components/ThemeToggle"

export default function CustomerLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    window.history.back()
    setTimeout(() => window.location.reload(), 100)
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

        <h1 className="text-3xl font-bold text-stone-800 dark:text-white mb-2">Welcome Back</h1>
        <p className="text-gray-500 dark:text-stone-400 mb-6">Sign in to continue</p>

        {error && (
          <p className="text-red-500 text-sm mb-4 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{error}</p>
        )}

        <div className="flex flex-col gap-4">
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
            onClick={handleLogin}
            disabled={loading}
            className="bg-stone-800 dark:bg-amber-700 text-white px-4 py-2 rounded-xl hover:bg-stone-700 dark:hover:bg-amber-600 transition font-bold disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        <p className="text-center text-gray-500 dark:text-stone-400 mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/auth/signup" className="text-amber-700 dark:text-amber-500 font-bold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}