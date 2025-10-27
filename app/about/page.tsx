"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"

export default function AboutPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation cartCount={0} isScrolled={isScrolled} />

      <div className="pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-5xl font-bold mb-4">About PizzaHub</h1>
            <p className="text-xl text-muted-foreground">Crafting delicious pizzas since 2020</p>
          </div>

          <div className="space-y-8">
            <div className="bg-card rounded-2xl p-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                PizzaHub was founded with a simple mission: to deliver the most delicious, fresh pizzas right to your
                doorstep. We believe that great pizza starts with quality ingredients and a passion for perfection.
                Every pizza we make is crafted with care and attention to detail.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <h2 className="text-2xl font-bold mb-4">Our Values</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Quality: We use only the finest ingredients</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Freshness: Every pizza is made to order</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Speed: Fast delivery without compromising quality</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Customer Service: Your satisfaction is our priority</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 animate-slide-up" style={{ animationDelay: "300ms" }}>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>📍 123 Pizza Street, New York, NY 10001</p>
                <p>📞 (555) 123-4567</p>
                <p>📧 hello@pizzahub.com</p>
                <p>🕐 Open Daily: 11 AM - 11 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
