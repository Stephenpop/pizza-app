"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleCheckout = () => {
    if (!user) {
      router.push("/login")
      return
    }
    router.push("/checkout")
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Navigation cartCount={0} isScrolled={isScrolled} />
        <div className="pt-32 pb-16 px-4 md:px-8 flex items-center justify-center">
          <div className="text-center animate-slide-up">
            <div className="inline-block w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart className="w-12 h-12 text-primary/50" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Add some delicious pizzas to get started!</p>
            <Link href="/menu">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation cartCount={cart.length} isScrolled={isScrolled} />

      <div className="pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-slide-up">
            <Link href="/menu" className="flex items-center gap-2 text-primary hover:underline mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Menu
            </Link>
            <h1 className="text-4xl font-bold">Shopping Cart</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, idx) => (
                <Card
                  key={`${item.id}-${item.size}`}
                  className="p-6 flex gap-6 animate-slide-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Size: <span className="capitalize font-semibold">{item.size}</span>
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="p-1 hover:bg-background rounded transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="p-1 hover:bg-background rounded transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-2">Price</p>
                    <p className="text-2xl font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="animate-scale-in">
              <Card className="p-6 sticky top-32 space-y-6">
                <h2 className="text-2xl font-bold">Order Summary</h2>

                <div className="space-y-3 border-t border-b border-border py-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-semibold">$3.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-semibold">${(total * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary">${(total + 3.99 + total * 0.08).toFixed(2)}</span>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 font-semibold"
                >
                  Proceed to Checkout
                </Button>

                <Button variant="outline" onClick={() => router.push("/menu")} className="w-full">
                  Continue Shopping
                </Button>

                <button
                  onClick={clearCart}
                  className="w-full text-destructive hover:bg-destructive/10 py-2 rounded-lg transition-colors text-sm font-semibold"
                >
                  Clear Cart
                </button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
