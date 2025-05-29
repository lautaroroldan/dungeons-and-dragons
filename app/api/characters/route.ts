import { NextResponse } from "next/server";
import { createCompleteCharacter } from "@/db/queries/insert";

export async function POST(request: Request) {
    const data = await request.json();
    console.log(data)
    await createCompleteCharacter(data, data.equipment, data.skills, data.history, data.history.specialAbilities);
    return NextResponse.json({ ok: true });
}
