"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { User } from "@supabase/supabase-js"

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user
      // Only show if customer — not admin
      if (u && u.user_metadata?.role !== "admin") {
        setUser(u)
      }
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user
      if (u && u.user_metadata?.role !== "admin") {
        setUser(u)
      } else {
        setUser(null)
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-stone-300 text-sm">
          {user.user_metadata?.full_name || user.email}
        </span>
        <button
          onClick={async () => {
            await supabase.auth.signOut()
            window.location.reload()
          }}
          className="bg-stone-700 hover:bg-stone-600 text-white px-4 py-2 rounded-xl transition text-sm font-bold"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <a
      href="/auth/login"
      className="bg-amber-700 hover:bg-amber-600 text-white px-6 py-3 rounded-xl transition font-bold text-sm"
    >
      Sign In
    </a>
  )
}