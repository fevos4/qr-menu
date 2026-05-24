"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { User } from "@supabase/supabase-js"

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-stone-300 dark:text-stone-400 text-sm">
          {user.user_metadata?.full_name || user.email}
        </span>
        <button
          onClick={async () => {
            await supabase.auth.signOut()
            window.location.reload()
          }}
          className="bg-stone-700 hover:bg-stone-600 dark:bg-stone-800 dark:hover:bg-stone-700 text-white px-4 py-2 rounded-xl transition text-sm font-bold"
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