"use client"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition px-4 py-3 rounded-xl font-medium"
    >
      <LogOut size={20} />
      Logout
    </button>
  )
}