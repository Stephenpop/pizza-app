"use client"

import { useState, useEffect } from "react"

export function useAuth() {
  const [user, setUser] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("pizza-user")
    if (saved) {
      setUser(JSON.parse(saved))
    }
    setIsLoaded(true)
  }, [])

  const login = (email, password) => {
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split("@")[0],
      createdAt: new Date().toISOString(),
    }
    setUser(userData)
    localStorage.setItem("pizza-user", JSON.stringify(userData))
    return userData
  }

  const register = (email, password, name) => {
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      createdAt: new Date().toISOString(),
    }
    setUser(userData)
    localStorage.setItem("pizza-user", JSON.stringify(userData))
    return userData
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("pizza-user")
  }

  return { user, login, register, logout, isLoaded }
}
