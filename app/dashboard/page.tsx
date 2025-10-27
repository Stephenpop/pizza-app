"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogOut, ShoppingBag, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import MobileBottomNav from "@/components/mobile-bottom-nav"
import { useAuth } from "@/hooks/use-auth"

const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    items: ["Pepperoni Blaze", "Margherita Classic"],
    total: 32.97,
    status: "Delivered",
    estimatedTime: "30 mins",
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    items: ["Four Cheese Delight", "Veggie Paradise"],
    total: 35.97,
    status: "Delivered",
    estimatedTime: "35 mins",
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    items: ["BBQ Chicken Supreme"],
    total: 18.98,
    status: "Delivered",
    estimatedTime: "40 mins",
  },
]

export default function DashboardPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout, isLoaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/login")
    }
  }, [isLoaded, user, router])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (!isLoaded || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 pb-24 md:pb-16">
      <Navigation cartCount={0} isScrolled={isScrolled} />

      <div className="pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 animate-slide-up gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {user.name}!</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2 bg-transparent w-full md:w-auto"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-12">
            <Card className="p-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Total Orders</p>
                  <p className="text-3xl font-bold">{mockOrders.length}</p>
                </div>
                <ShoppingBag className="w-12 h-12 text-primary/20" />
              </div>
            </Card>

            <Card className="p-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Total Spent</p>
                  <p className="text-3xl font-bold">${mockOrders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-xl">💰</div>
              </div>
            </Card>

            <Card className="p-6 animate-slide-up" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Member Since</p>
                  <p className="text-3xl font-bold">
                    {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-xl">⭐</div>
              </div>
            </Card>
          </div>

          {/* Order History */}
          <div className="animate-slide-up" style={{ animationDelay: "400ms" }}>
            <h2 className="text-2xl font-bold mb-6">Order History</h2>
            <div className="space-y-4">
              {mockOrders.map((order, idx) => (
                <Card
                  key={order.id}
                  className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group animate-slide-up"
                  style={{ animationDelay: `${500 + idx * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex-1 w-full">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-3">
                        <div>
                          <p className="font-bold text-lg">{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                          {order.status}
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <ShoppingBag className="w-4 h-4" />
                          {order.items.length} item{order.items.length > 1 ? "s" : ""}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {order.estimatedTime}
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground">{order.items.join(", ")}</p>
                    </div>

                    <div className="text-right w-full md:w-auto">
                      <p className="text-2xl font-bold text-primary mb-2">${order.total.toFixed(2)}</p>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform hidden md:block" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center animate-slide-up" style={{ animationDelay: "800ms" }}>
            <p className="text-muted-foreground mb-4">Ready to order more delicious pizzas?</p>
            <Link href="/menu">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Order Now</Button>
            </Link>
          </div>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  )
}
