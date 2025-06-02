import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { charactersTable, classesTable, racesTable } from '@/db/schema'
import React from 'react'
import CharacterCard from '../CharacterCard'

async function CharacterList() {
    const characters = await db.select({
        id: charactersTable.id,
        name: charactersTable.name,
        race: racesTable.name,
        class: classesTable.name,
        level: charactersTable.level,
        image: charactersTable.image,
    }).from(charactersTable)
        .leftJoin(classesTable, eq(charactersTable.class, classesTable.id))
        .leftJoin(racesTable, eq(charactersTable.race, racesTable.id))
    return (
        <>
            {characters.map((character) => (
                <CharacterCard
                    key={character.id}
                    id={character.id}
                    level={character.level}
                    name={character.name}
                    type={character.class || ""}
                    race={character.race || ""}
                    image={character.image || "/placeholder.svg?height=200&width=200"}
                />
            ))}
        </>
    )
}

export default CharacterList