import Link from "next/link"
import { UtensilsCrossed, QrCode, LayoutDashboard, Star, ArrowRight, CheckCircle } from "lucide-react"
import ThemeToggle from "@/components/ThemeToggle"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-stone-950 text-stone-900 dark:text-white transition-colors duration-300">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto border-b border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="text-amber-500" size={28} />
          <span className="text-2xl font-black tracking-tight">QuickMenu</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/login" className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition text-sm font-medium">
            Sign In
          </Link>
          <Link href="/register" className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2 rounded-xl text-sm font-bold transition">
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-full text-sm font-medium mb-8">
          <Star size={14} />
          No printing. No hassle. Just scan.
        </div>

        <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-tight mb-6">
          Digitalize Your
          <span className="text-amber-500"> Cafe</span>
          <br />
          In Minutes
        </h1>

        <p className="text-stone-500 dark:text-stone-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Create a beautiful digital menu, generate a QR code, and let your customers browse from their phones. No app needed.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/register"
            className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition flex items-center gap-2 shadow-lg shadow-amber-900/30"
          >
            Start For Free
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/menu/9f82402b-798c-455e-8db0-36584dbd81d9"
            className="border border-stone-300 dark:border-stone-700 hover:border-stone-500 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white px-8 py-4 rounded-2xl font-bold text-lg transition"
          >
            See Demo Menu
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <h2 className="text-4xl font-black text-center mb-4">How It Works</h2>
        <p className="text-stone-500 dark:text-stone-400 text-center mb-16">Up and running in 3 simple steps</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              icon: <LayoutDashboard size={32} className="text-amber-500" />,
              title: "Create Your Account",
              description: "Register your restaurant in under 2 minutes. No credit card required."
            },
            {
              step: "02",
              icon: <UtensilsCrossed size={32} className="text-amber-500" />,
              title: "Add Your Menu",
              description: "Add your items, prices, descriptions and photos through your admin panel."
            },
            {
              step: "03",
              icon: <QrCode size={32} className="text-amber-500" />,
              title: "Print Your QR Code",
              description: "Download your unique QR code and place it on your tables. Done!"
            }
          ].map((item) => (
            <div key={item.step} className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-8 hover:border-amber-500/30 transition">
              <span className="text-amber-500/30 text-6xl font-black">{item.step}</span>
              <div className="mt-4 mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-stone-500 dark:text-stone-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <h2 className="text-4xl font-black text-center mb-4">Everything You Need</h2>
        <p className="text-stone-500 dark:text-stone-400 text-center mb-16">Powerful features built for modern restaurants</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "Beautiful digital menu your customers will love",
            "Unique QR code for every restaurant",
            "Add, edit and delete menu items instantly",
            "Mark items as popular or out of stock",
            "Upload beautiful food photos",
            "Manage categories easily",
            "Works on any phone — no app needed",
            "Real-time updates — changes reflect instantly",
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-3 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl px-6 py-4">
              <CheckCircle size={20} className="text-amber-500 shrink-0" />
              <p className="text-stone-600 dark:text-stone-300">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="bg-amber-600 rounded-3xl p-16 text-center">
          <h2 className="text-5xl font-black mb-4 text-white">Ready To Go Digital?</h2>
          <p className="text-amber-100 text-xl mb-10">Join hundreds of restaurants already using QuickMenu</p>
          <Link
            href="/register"
            className="bg-white text-amber-700 px-10 py-4 rounded-2xl font-black text-lg hover:bg-amber-50 transition inline-flex items-center gap-2"
          >
            Create Your Menu Now
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 dark:border-stone-800 px-8 py-8 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="text-amber-500" size={20} />
          <span className="font-bold">QuickMenu</span>
        </div>
        <p className="text-stone-500 text-sm">Built for modern restaurants</p>
      </footer>

    </main>
  )
}