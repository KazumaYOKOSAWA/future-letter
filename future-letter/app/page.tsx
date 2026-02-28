/*"use client"

import { useState } from "react"
import { AnimatedBackground } from "@/components/animated-background"
import { LoginPage } from "@/components/login-page"
import { Dashboard } from "@/components/dashboard"
import { useSession } from "next-auth/react"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      <AnimatedBackground />
      {isLoggedIn ? (
        <Dashboard onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      )}
    </>
  )
}

export default function Home() {
  const { data: session } = useSession()

  if (!session) {
    return <LoginPage />
  }

  return <Dashboard />
}*/

"use client"

import { useSession } from "next-auth/react"
import { LoginPage } from "@/components/login-page"
import { Dashboard } from "@/components/dashboard"

export default function Home() {
  const { data: session } = useSession()

  if (!session) {
    return <LoginPage />
  }

  return <Dashboard />
}
