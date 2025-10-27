"use client"

import { useState, useEffect, useCallback } from "react"

export function useCart() {
  const [cart, setCart] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("pizza-cart")
    if (saved) {
      try {
        setCart(JSON.parse(saved))
      } catch (e) {
        console.error("[v0] Failed to parse cart:", e)
      }
    }
    setIsLoaded(true)
  }, [])

  const addToCart = useCallback((item) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id && p.size === item.size)
      let updated
      if (existing) {
        updated = prev.map((p) =>
          p.id === item.id && p.size === item.size ? { ...p, quantity: p.quantity + item.quantity } : p,
        )
      } else {
        updated = [...prev, item]
      }
      localStorage.setItem("pizza-cart", JSON.stringify(updated))
      return updated
    })
  }, [])

  const removeFromCart = useCallback((id, size) => {
    setCart((prev) => {
      const updated = prev.filter((p) => !(p.id === id && p.size === size))
      localStorage.setItem("pizza-cart", JSON.stringify(updated))
      return updated
    })
  }, [])

  const updateQuantity = useCallback(
    (id, size, quantity) => {
      if (quantity <= 0) {
        removeFromCart(id, size)
        return
      }
      setCart((prev) => {
        const updated = prev.map((p) => (p.id === id && p.size === size ? { ...p, quantity } : p))
        localStorage.setItem("pizza-cart", JSON.stringify(updated))
        return updated
      })
    },
    [removeFromCart],
  )

  const clearCart = useCallback(() => {
    setCart([])
    localStorage.removeItem("pizza-cart")
  }, [])

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart, total, isLoaded }
}
