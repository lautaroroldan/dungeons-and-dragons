import { NextResponse } from "next/server";
import { getAlignments } from "@/db/queries/select";

export async function GET(request: Request) {
    const data = await getAlignments();
    return NextResponse.json(data);
}
