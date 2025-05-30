"use server"

import { Character } from "@/app/stores/useCharacterStore"
import { db } from "@/db/index"
import { createCompleteCharacter } from "@/db/queries/insert"
import { racesTable, classesTable, backgroundsTable, alignmentsTable } from "@/db/schema"
import axios from "axios"
import { unstable_cache } from 'next/cache'
import { redirect } from "next/navigation"

export const getCachedRaces = unstable_cache(
    async () => {
        const result = await db.select().from(racesTable)
        return result
    },
    ['races'], // cache key
    {
        revalidate: 60 * 60 * 24, // 24 horas
        tags: ['races']
    }
)

export const getCachedClasses = unstable_cache(
    async () => {
        const result = await db.select().from(classesTable)
        return result
    },
    ['classes'],
    {
        revalidate: 60 * 60 * 24, // 24 horas
        tags: ['classes']
    }
)

export const getCachedBackgrounds = unstable_cache(
    async () => {
        const result = await db.select().from(backgroundsTable)
        return result
    },
    ['backgrounds'],
    {
        revalidate: 60 * 60 * 24, // 24 horas
        tags: ['backgrounds']
    }
)

export const getCachedAlignments = unstable_cache(
    async () => {
        const result = await db.select().from(alignmentsTable)
        return result
    },
    ['alignments'],
    {
        revalidate: 60 * 60 * 24, // 24 horas
        tags: ['alignments']
    }
)

// Función para invalidar caché específico
export async function revalidateStaticData(tag: 'races' | 'classes' | 'backgrounds' | 'alignments') {
    const { revalidateTag } = await import('next/cache')
    revalidateTag(tag)
}

export const saveCharacter = async (character: Character) => {
    const { equipment, skills, history, history: { specialAbilities } } = character
    try {
        await createCompleteCharacter(character, equipment, skills, history, specialAbilities)
        redirect("/personajes")
    } catch (error) {
        console.error(error)
        return { error: "Error al guardar el personaje" }
    }
}