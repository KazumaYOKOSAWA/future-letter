import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      console.log("No session (GET)")
      return NextResponse.json([])
    }

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", session.user?.id)

    if (error || !data) {
      console.error("Supabase GET error:", error)
      return NextResponse.json([])
    }

    // フロント用に整形
    const formatted = data.map((m) => ({
      id: m.id,
      title: m.title,
      body: m.body,
      createdAt: m.created_at,
      deliverDate: m.deliver_date,
      isDelivered: m.is_delivered,
    }))

    return NextResponse.json(formatted)
  } catch (err) {
    console.error("Server crash (GET):", err)
    return NextResponse.json([])
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      console.log("No session (POST)")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("Session ID:", session.user?.id)

    const body = await req.json()
    console.log("Body:", body)

    const { data, error } = await supabase.from("messages").insert({
      user_id: session.user?.id,
      title: body.title,
      body: body.body,
      deliver_date: body.deliverDate,
      is_delivered: false,
    })

    if (error) {
      console.error("Supabase POST error:", error)
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Server crash (POST):", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}