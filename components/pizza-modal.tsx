"use client"

import { useState } from "react"
import { X, Plus, Minus, ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

export default function PizzaModal({ pizza, onClose }) {
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState("medium")
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { addToCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const sizes = {
    small: { label: 'Small (10")', price: 0 },
    medium: { label: 'Medium (12")', price: 2 },
    large: { label: 'Large (14")', price: 4 },
  }

  const handleAddToCart = async () => {
    setIsAdding(true)
    await new Promise((resolve) => setTimeout(resolve, 600))

    addToCart({
      id: pizza.id,
      name: pizza.name,
      price: pizza.price + sizes[size].price,
      image: pizza.image,
      quantity,
      size,
    })

    setShowSuccess(true)
    setIsAdding(false)

    setTimeout(() => {
      onClose()
      setShowSuccess(false)
    }, 1500)
  }

  const handleCheckout = () => {
    if (!user) {
      router.push("/login")
      return
    }
    handleAddToCart()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{pizza.name}</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="relative h-80 rounded-xl overflow-hidden">
            <img src={pizza.image || "/placeholder.svg"} alt={pizza.name} className="w-full h-full object-cover" />
          </div>

          <div>
            <p className="text-lg text-muted-foreground mb-4">{pizza.description}</p>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-accent">
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({pizza.reviews} reviews)</span>
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <h3 className="font-semibold mb-4">Select Size</h3>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(sizes).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setSize(key)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    size === key ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold">{value.label}</div>
                  <div className="text-sm text-muted-foreground">+${value.price.toFixed(2)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <h3 className="font-semibold mb-4">Quantity</h3>
            <div className="flex items-center gap-4 w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-semibold">${((pizza.price + sizes[size].price) * quantity).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-primary">${((pizza.price + sizes[size].price) * quantity).toFixed(2)}</span>
            </div>
          </div>

          {showSuccess && (
            <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 flex items-center gap-3 animate-slide-up">
              <Check className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-bold text-green-900">Added to cart!</p>
                <p className="text-sm text-green-800">
                  {quantity}x {pizza.name} added successfully
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleAddToCart}
              disabled={isAdding || showSuccess}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2"
            >
              {showSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  Added!
                </>
              ) : isAdding ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
