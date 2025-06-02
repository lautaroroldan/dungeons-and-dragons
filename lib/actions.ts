"use server"

import { Character } from "@/stores/useCharacterStore"
import { createCompleteCharacter } from "@/db/queries/insert"
import { redirect } from "next/navigation"


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