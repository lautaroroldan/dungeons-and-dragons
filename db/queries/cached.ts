"use server"
import { db } from "@/db"
import { racesTable, classesTable, backgroundsTable, alignmentsTable } from "../schema"
import { unstable_cache as cache } from "next/cache"

const CACHE_TIME = 60 * 60 * 24 // 24 horas

export const getCachedRaces = cache(
    async () => {
        const result = await db.select().from(racesTable)
        return result
    },
    ['races'], // cache key
    {
        revalidate: CACHE_TIME, // 24 horas
        tags: ['races']
    }
)

export const getCachedClasses = cache(
    async () => {
        const result = await db.select().from(classesTable)
        return result
    },
    ['classes'],
    {
        revalidate: CACHE_TIME, // 24 horas
        tags: ['classes']
    }
)

export const getCachedBackgrounds = cache(
    async () => {
        const result = await db.select().from(backgroundsTable)
        return result
    },
    ['backgrounds'],
    {
        revalidate: CACHE_TIME, // 24 horas
        tags: ['backgrounds']
    }
)

export const getCachedAlignments = cache(
    async () => {
        const result = await db.select().from(alignmentsTable)
        return result
    },
    ['alignments'],
    {
        revalidate: CACHE_TIME, // 24 horas
        tags: ['alignments']
    }
)