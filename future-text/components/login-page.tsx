"use client"

import { Clock } from "lucide-react"
import { signIn } from "next-auth/react"

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center justify-center gap-2">
            <div className="relative">
              <Clock className="h-10 w-10 text-primary" />
              <div className="absolute inset-0 animate-ping opacity-20">
                <Clock className="h-10 w-10 text-primary" />
              </div>
            </div>
          </div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground text-glow">
            Chronopost
          </h1>
          <p className="text-sm text-muted-foreground">
            Send messages through time to your future self
          </p>
        </div>

        {/* Glass card */}
        <div className="glass-strong rounded-2xl p-8 glow-cyan">
          <h2 className="mb-2 text-xl font-semibold text-foreground">
            Welcome
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Continue your temporal journey
          </p>

          <button
            onClick={() => signIn("google")}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm transition-all hover:opacity-90 glow-cyan cursor-pointer"
          >
            Sign in with Google
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground/50">
          {"Googleアカウントで安全にログインできます。 個人情報は暗号化され、外部に公開されません。"}
        </p>
      </div>
    </div>
  )
}