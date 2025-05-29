import { NextResponse } from "next/server";
import { getClasses } from "@/db/queries/select";

export async function GET(request: Request) {
    const data = await getClasses();
    return NextResponse.json(data);
}
