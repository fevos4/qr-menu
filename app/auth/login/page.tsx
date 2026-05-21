"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function CustomerLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.back()
  }

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-stone-800 mb-2">Welcome Back</h1>
        <p className="text-gray-500 mb-6">Sign in to continue</p>

        {error && (
          <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg">{error}</p>
        )}

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 w-full bg-gray-50"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 w-full bg-gray-50"
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-stone-800 text-white px-4 py-2 rounded-xl hover:bg-stone-700 transition font-bold"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        <p className="text-center text-gray-500 mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/auth/signup" className="text-amber-700 font-bold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}