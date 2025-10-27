"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"

export function useToast() {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = "success", duration = 3000) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)

    return id
  }

  return { toasts, addToast }
}

export function ToastContainer({ toasts }) {
  return (
    <div className="fixed bottom-4 right-4 z-[9999] space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg animate-slide-up pointer-events-auto ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : toast.type === "error"
                ? "bg-red-500 text-white"
                : "bg-blue-500 text-white"
          }`}
        >
          {toast.type === "success" && <Check className="w-5 h-5" />}
          {toast.type === "error" && <X className="w-5 h-5" />}
          <span className="font-medium">{toast.message}</span>
        </div>
      ))}
    </div>
  )
}
