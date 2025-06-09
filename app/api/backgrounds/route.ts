import { getCachedBackgrounds } from "@/db/queries/cached"
import { NextResponse } from "next/server"

export async function GET() {
    const backgrounds = await getCachedBackgrounds()
    return NextResponse.json(backgrounds)
}

