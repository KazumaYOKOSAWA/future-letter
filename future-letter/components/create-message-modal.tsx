"use client"

import { useState } from "react"
import { X, Send, CalendarDays, Sparkles } from "lucide-react"

interface CreateMessageModalProps {
  isOpen: boolean
  onClose: () => void
  onSend: (message: { title: string; body: string; deliverDate: string }) => void
}

export function CreateMessageModal({ isOpen, onClose, onSend }: CreateMessageModalProps) {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [deliverDate, setDeliverDate] = useState("")
  const [isSending, setIsSending] = useState(false)

  if (!isOpen) return null

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !body || !deliverDate) return
    setIsSending(true)
    setTimeout(() => {
      onSend({ title, body, deliverDate })
      setTitle("")
      setBody("")
      setDeliverDate("")
      setIsSending(false)
      onClose()
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="glass-strong relative w-full max-w-lg rounded-2xl p-6 glow-cyan-strong animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">New Time Capsule</h2>
              <p className="text-xs text-muted-foreground">Write a message to your future self</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSend} className="flex flex-col gap-5">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label htmlFor="msg-title" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Subject
            </label>
            <input
              id="msg-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="A reminder for the future..."
              className="h-11 w-full rounded-lg bg-secondary/60 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
              required
            />
          </div>

          {/* Body */}
          <div className="flex flex-col gap-2">
            <label htmlFor="msg-body" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Your Message
            </label>
            <textarea
              id="msg-body"
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Dear future me..."
              className="w-full resize-none rounded-lg bg-secondary/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all leading-relaxed"
              required
            />
          </div>

          {/* Delivery Date */}
          <div className="flex flex-col gap-2">
            <label htmlFor="deliver-date" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                Deliver On
              </span>
            </label>
            <input
              id="deliver-date"
              type="date"
              value={deliverDate}
              onChange={(e) => setDeliverDate(e.target.value)}
              min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
              className="h-11 w-full rounded-lg bg-secondary/60 px-4 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all [color-scheme:dark]"
              required
            />
          </div>

          {/* Action */}
          <button
            type="submit"
            disabled={isSending || !title || !body || !deliverDate}
            className="group mt-1 flex h-12 items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed glow-cyan cursor-pointer"
          >
            {isSending ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                Sealing in time...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                Send to the Future
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
