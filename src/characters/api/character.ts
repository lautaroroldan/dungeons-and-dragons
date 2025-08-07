import { charactersTable, classesTable, racesTable } from "@/db/schema"

import { db } from "@/db"
import { unstable_cacheTag as cacheTag } from "next/cache"
import { eq } from "drizzle-orm"

export async function getCharacters() {
    "use cache"
    cacheTag('characters')
    return await db
        .select({
            id: charactersTable.id,
            name: charactersTable.name,
            race: racesTable.name,
            class: classesTable.name,
            level: charactersTable.level,
            image: charactersTable.image,
        }).from(charactersTable)
        .leftJoin(classesTable, eq(charactersTable.class, classesTable.id))
        .leftJoin(racesTable, eq(charactersTable.race, racesTable.id))
}