"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 800))

    if (!email || !password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    try {
      login(email, password)
      router.push("/dashboard")
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-orange-600 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl animate-bounce" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-block mb-6 relative">
            <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl" />
            <div className="relative w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-5xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
              🍕
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-lg">PizzaHub</h1>
          <p className="text-white/90 text-lg font-semibold drop-shadow">Welcome Back!</p>
          <p className="text-white/80 text-sm mt-1">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500 group-focus-within:scale-110 transition-transform" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500 group-focus-within:scale-110 transition-transform" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-100 border-2 border-red-300 rounded-xl text-red-700 text-sm font-semibold animate-slide-up">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  LOGIN
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-600 font-semibold">or</span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-800 hover:border-orange-500 hover:bg-orange-50 rounded-xl py-3 font-bold transition-all duration-300 transform hover:scale-105"
              >
                <span className="text-xl">🔵</span>
                Google
              </Button>
              <Button
                type="button"
                className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-800 hover:border-orange-500 hover:bg-orange-50 rounded-xl py-3 font-bold transition-all duration-300 transform hover:scale-105"
              >
                <span className="text-xl">🍎</span>
                Apple
              </Button>
            </div>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-700 mt-6 font-medium">
            Don't have an account?{" "}
            <Link href="/register" className="text-orange-600 font-bold hover:text-red-600 transition-colors">
              Register
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-white/80 mt-6 drop-shadow">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
