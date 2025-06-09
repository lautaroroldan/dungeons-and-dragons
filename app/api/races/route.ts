import { getCachedRaces } from "@/db/queries/cached"
import { NextResponse } from "next/server"

export async function GET() {
    const races = await getCachedRaces()
    return NextResponse.json(races)
}

