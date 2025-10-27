"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Menu, ShoppingCart, User } from "lucide-react"

export default function MobileBottomNav() {
  const pathname = usePathname()

  const isActive = (path) => pathname === path

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-background border-t border-border">
      <div className="flex items-center justify-around h-20">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
            isActive("/") ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Home</span>
        </Link>

        <Link
          href="/menu"
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
            isActive("/menu") ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Menu className="w-6 h-6" />
          <span className="text-xs font-medium">Menu</span>
        </Link>

        <Link
          href="/cart"
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
            isActive("/cart") ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="text-xs font-medium">Cart</span>
        </Link>

        <Link
          href="/dashboard"
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
            isActive("/dashboard") ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs font-medium">Profile</span>
        </Link>
      </div>
    </div>
  )
}
