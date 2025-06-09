"use server"

import { Character } from "@/stores/useCharacterStore"
import { createCompleteCharacter } from "@/db/queries/insert"
import { redirect } from "next/navigation"
import { revalidateTag } from "next/cache"


export const saveCharacter = async (character: Character) => {
    const { equipment, skills, history, history: { specialAbilities } } = character
    try {
        await createCompleteCharacter(character, equipment, skills, history, specialAbilities)
        // revalidateTag("characters")
        redirect("/personajes")
    } catch (error) {
        console.error(error)
        return { error: "Error al guardar el personaje" }
    }
}

export async function handleFormSubmit(currentState: any, formData: FormData) {
    console.log(formData)
    console.log(formData.get("name"))
    return { message: "Personaje guardado correctamente" }
}