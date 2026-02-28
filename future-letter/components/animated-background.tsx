"use client"

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,210,211,0.08)_0%,_transparent_50%),_radial-gradient(ellipse_at_bottom_right,_rgba(0,100,180,0.06)_0%,_transparent_50%)]" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[rgba(0,210,211,0.03)] blur-[100px] animate-pulse" style={{ animationDuration: "8s" }} />
      <div className="absolute bottom-1/4 right-1/3 h-80 w-80 rounded-full bg-[rgba(0,100,180,0.04)] blur-[100px] animate-pulse" style={{ animationDuration: "12s", animationDelay: "2s" }} />
      <div className="absolute top-1/2 right-1/4 h-64 w-64 rounded-full bg-[rgba(0,210,211,0.02)] blur-[80px] animate-pulse" style={{ animationDuration: "10s", animationDelay: "4s" }} />
      
      {/* Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.015)_1px,_transparent_1px)] bg-[size:80px_80px]" />
    </div>
  )
}
