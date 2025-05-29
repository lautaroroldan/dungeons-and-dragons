"use server"

import { db } from "@/db/index"
import { racesTable, classesTable, backgroundsTable, alignmentsTable } from "@/db/schema"
import { unstable_cache } from 'next/cache'

// Server actions con caché nativo de Next.js

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