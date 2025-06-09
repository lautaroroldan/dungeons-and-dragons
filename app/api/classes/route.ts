import { getCachedClasses } from "@/db/queries/cached"
import { NextResponse } from "next/server"

export async function GET() {
    const classes = await getCachedClasses()
    return NextResponse.json(classes)
}

