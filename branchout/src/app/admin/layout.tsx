"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/src/firebase/firebase"
import { onAuthStateChanged } from "firebase/auth"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!auth) {
      console.error("Firebase Auth is not initialized. Check your environment variables.")
      router.push("/login")
      setLoading(false)
      return () => {}
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // You could add additional checks here for admin role
        // For example, checking a custom claim or a database entry
        setAuthenticated(true)
      } else {
        router.push("/login") // Redirect to login page
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    )
  }

  if (!authenticated) {
    return null // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  )
}