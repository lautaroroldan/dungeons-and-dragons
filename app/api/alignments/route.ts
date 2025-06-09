import { getCachedAlignments, getCachedRaces } from "@/db/queries/cached"
import { NextResponse } from "next/server"

export async function GET() {
    const alignments = await getCachedAlignments()
    return NextResponse.json(alignments)
}

