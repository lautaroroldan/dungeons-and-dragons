import { NextResponse } from "next/server";
import { getRaces } from "@/db/queries/select";

export async function GET(request: Request) {
    const data = await getRaces();
    return NextResponse.json(data);
}
