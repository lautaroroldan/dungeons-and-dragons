import { NextResponse } from "next/server";
import { getBackgrounds } from "@/db/queries/select";

export async function GET(request: Request) {
    const data = await getBackgrounds();
    return NextResponse.json(data);
}
