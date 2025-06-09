"use server"
import { db } from "@/db"
import { racesTable, classesTable, backgroundsTable, alignmentsTable } from "../schema"
import { unstable_cacheTag as cacheTag } from "next/cache"


export const getCachedRaces = async () => {
    "use cache"
    cacheTag('races')
    return await db.select().from(racesTable)
}

export const getCachedClasses = async () => {
    "use cache"
    cacheTag('classes')
    return await db.select().from(classesTable)
}

export const getCachedBackgrounds = async () => {
    "use cache"
    cacheTag('backgrounds')
    return await db.select().from(backgroundsTable)
}


export const getCachedAlignments = async () => {
    "use cache"
    cacheTag('alignments')
    return await db.select().from(alignmentsTable)
}