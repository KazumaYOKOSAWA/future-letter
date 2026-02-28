"use client"

import { Clock, Lock, Unlock, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export interface TimeMessage {
  id: string
  title: string
  body: string
  createdAt: string
  deliverDate: string
  isDelivered: boolean
}

interface MessageCardProps {
  message: TimeMessage
}

export function MessageCard({ message }: MessageCardProps) {
  const [expanded, setExpanded] = useState(false)

  const daysLeft = Math.max(
    0,
    Math.ceil(
      (new Date(message.deliverDate).getTime() - Date.now()) / 86400000
    )
  )

  const formattedCreated = new Date(message.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const formattedDeliver = new Date(message.deliverDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div
      className={`glass rounded-xl p-5 transition-all duration-300 ${
        message.isDelivered
          ? "hover:glow-cyan"
          : "opacity-80"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <div
            className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
              message.isDelivered
                ? "bg-primary/10 text-primary"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {message.isDelivered ? (
              <Unlock className="h-4 w-4" />
            ) : (
              <Lock className="h-4 w-4" />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-foreground">
              {message.title}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {"Sent "}{formattedCreated}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {message.isDelivered ? (
            <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              <Clock className="h-3 w-3" />
              Delivered
            </span>
          ) : (
            <span className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">
              <Clock className="h-3 w-3" />
              {daysLeft}{"d left"}
            </span>
          )}
        </div>
      </div>

      {/* Delivery info bar */}
      <div className="mt-3 flex items-center justify-between rounded-lg bg-secondary/40 px-3 py-2">
        <span className="text-xs text-muted-foreground">
          {"Delivery: "}{formattedDeliver}
        </span>
        {message.isDelivered && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors cursor-pointer"
            aria-expanded={expanded}
          >
            {expanded ? "Collapse" : "Read"}
            {expanded ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </button>
        )}
      </div>

      {/* Expanded body */}
      {expanded && message.isDelivered && (
        <div className="mt-3 rounded-lg bg-secondary/30 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
            {message.body}
          </p>
        </div>
      )}

      {/* Locked preview */}
      {!message.isDelivered && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-secondary/30 p-3">
          <Lock className="h-3.5 w-3.5 text-muted-foreground/40" />
          <p className="text-xs text-muted-foreground/50 italic">
            This message is sealed until {formattedDeliver}
          </p>
        </div>
      )}
    </div>
  )
}
