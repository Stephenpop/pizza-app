"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, Star, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import PizzaModal from "@/components/pizza-modal"
import { useCart } from "@/hooks/use-cart"

const pizzas = [
  {
    id: 1,
    name: "Margherita Classic",
    category: "Classic",
    price: 12.99,
    image: "/margherita-pizza-with-fresh-basil.jpg",
    description: "Fresh mozzarella, tomato sauce, and basil",
    rating: 4.8,
    reviews: 245,
    popular: true,
  },
  {
    id: 2,
    name: "Pepperoni Blaze",
    category: "Classic",
    price: 14.99,
    image: "/pizza-pepperoni.png",
    description: "Loaded with pepperoni and mozzarella",
    rating: 4.9,
    reviews: 312,
    popular: true,
  },
  {
    id: 3,
    name: "Veggie Paradise",
    category: "Veggie",
    price: 13.99,
    image: "/vegetarian-pizza.png",
    description: "Bell peppers, mushrooms, onions, and olives",
    rating: 4.7,
    reviews: 189,
    popular: false,
  },
  {
    id: 4,
    name: "BBQ Chicken Supreme",
    category: "Special",
    price: 15.99,
    image: "/bbq-chicken-pizza.png",
    description: "Grilled chicken, BBQ sauce, and red onions",
    rating: 4.8,
    reviews: 267,
    popular: true,
  },
  {
    id: 5,
    name: "Four Cheese Delight",
    category: "Special",
    price: 16.99,
    image: "/four-cheese-pizza.png",
    description: "Mozzarella, parmesan, feta, and gouda",
    rating: 4.9,
    reviews: 298,
    popular: true,
  },
  {
    id: 6,
    name: "Spicy Inferno",
    category: "Special",
    price: 14.99,
    image: "/spicy-pizza-with-jalapenos.jpg",
    description: "Jalapeños, habaneros, and hot sauce",
    rating: 4.6,
    reviews: 156,
    popular: false,
  },
]

const categories = ["All", "Classic", "Special", "Veggie"]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPizza, setSelectedPizza] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const { cart } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const filteredPizzas = selectedCategory === "All" ? pizzas : pizzas.filter((p) => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation cartCount={cart.length} isScrolled={isScrolled} />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4 md:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-primary font-semibold text-sm flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  Fresh & Delicious
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
                Taste the <span className="text-primary">Perfect</span> Slice
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-balance">
                Handcrafted pizzas made with premium ingredients. Order now and get your favorite pizza delivered hot
                and fresh.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/menu">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Order Now <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  View Menu
                </Button>
              </div>
            </div>

            <div className="relative animate-bounce-in">
              <div className="relative w-full aspect-square">
                <img
                  src="/delicious-pizza-hero-image.jpg"
                  alt="Hero Pizza"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground px-6 py-3 rounded-xl shadow-lg font-bold">
                  50% OFF
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 md:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-4 md:pb-0 md:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-card text-foreground hover:bg-muted border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Pizzas */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            {selectedCategory === "All" ? "Our Pizzas" : `${selectedCategory} Pizzas`}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPizzas.map((pizza, idx) => (
              <div key={pizza.id} className="animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <Card
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group h-full flex flex-col"
                  onClick={() => setSelectedPizza(pizza)}
                >
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={pizza.image || "/placeholder.svg"}
                      alt={pizza.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {pizza.popular && (
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        Popular
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2">{pizza.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-1">{pizza.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(pizza.rating) ? "fill-accent text-accent" : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">({pizza.reviews})</span>
                      </div>
                      <span className="text-2xl font-bold text-primary">${pizza.price}</span>
                    </div>

                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedPizza(pizza)
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-8 py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          <h2 className="text-4xl font-bold mb-6">Ready to Order?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of satisfied customers enjoying our delicious pizzas
          </p>
          <Link href="/menu">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Start Ordering <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Pizza Modal */}
      {selectedPizza && <PizzaModal pizza={selectedPizza} onClose={() => setSelectedPizza(null)} />}
    </div>
  )
}
