"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import {
  Clock,
  Plus,
  LogOut,
  Send,
  Inbox,
  Timer,
  Search,
} from "lucide-react"
import { MessageCard, type TimeMessage } from "./message-card"
import { CreateMessageModal } from "./create-message-modal"

export function Dashboard() {
  const { data: session, status } = useSession()

  const [messages, setMessages] = useState<TimeMessage[]>([])
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState<"all" | "delivered" | "pending">("all")
  const [search, setSearch] = useState("")

  // ✅ セッション取得後にだけfetch
  useEffect(() => {
    if (status !== "authenticated") return

    async function fetchMessages() {
      const res = await fetch("/api/messages")
      const data = await res.json()

      if (Array.isArray(data)) {
        setMessages(data)
      } else {
        console.error("API error:", data)
        setMessages([])
      }
    }

    fetchMessages()
  }, [status])

  // ✅ 保険
  const safeMessages = Array.isArray(messages) ? messages : []

  const delivered = safeMessages.filter((m) => m.isDelivered)
  const pending = safeMessages.filter((m) => !m.isDelivered)

  const filtered = safeMessages
    .filter((m) => {
      if (filter === "delivered") return m.isDelivered
      if (filter === "pending") return !m.isDelivered
      return true
    })
    .filter((m) =>
      m.title?.toLowerCase().includes(search.toLowerCase())
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )

  async function handleSend(msg: {
    title: string
    body: string
    deliverDate: string
  }) {
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msg),
    })

    const res = await fetch("/api/messages")
    const data = await res.json()

    if (Array.isArray(data)) {
      setMessages(data)
    } else {
      setMessages([])
    }
  }

  if (status === "loading") return null

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2.5">
            <Clock className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold tracking-tight text-foreground">
              Chronopost
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 glow-cyan cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Message</span>
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all cursor-pointer"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-4 py-8 md:px-6">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="glass rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Send className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{messages.length}</p>
                <p className="text-xs text-muted-foreground">Total Messages</p>
              </div>
            </div>
          </div>
          <div className="glass rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Inbox className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{delivered.length}</p>
                <p className="text-xs text-muted-foreground">Delivered</p>
              </div>
            </div>
          </div>
          <div className="glass rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Timer className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pending.length}</p>
                <p className="text-xs text-muted-foreground">In Transit</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {(["all", "delivered", "pending"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  filter === f
                    ? "bg-primary text-primary-foreground glow-cyan"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "all"
                  ? "All"
                  : f === "delivered"
                  ? "Delivered"
                  : "Pending"}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search messages..."
              className="h-9 w-full rounded-lg bg-secondary/60 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all sm:w-64"
            />
          </div>
        </div>

        {/* Messages */}
        {filtered.length > 0 ? (
          <div className="flex flex-col gap-3">
            {filtered.map((msg) => (
              <MessageCard key={msg.id} message={msg} />
            ))}
          </div>
        ) : (
          <div className="glass rounded-xl p-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
              <Inbox className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mb-1 text-sm font-semibold text-foreground">No messages found</h3>
            <p className="text-xs text-muted-foreground">
              {filter !== "all"
                ? "Try a different filter"
                : "Send your first message to the future"}
            </p>
          </div>
        )}
      </main>

      <div className="mt-16 border-t border-white/10 pt-6 text-center">
        <p className="text-xs text-white/50 leading-relaxed">
        🔒 本サービスではGoogle認証を利用しています。<br />
          個人情報を第三者へ提供することはありません。<br />
          データはユーザーごとの識別IDにより安全に管理されています。
        </p>
      </div>

      <CreateMessageModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSend={handleSend}
      />
    </div>
  )
}