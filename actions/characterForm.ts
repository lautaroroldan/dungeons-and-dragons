"use server"

import { CreateCharacterWithAttributesInput, createCompleteCharacter } from "@/db/queries/insert";
import { completeCharacterSchema } from "@/lib/validations/character"
import { History } from "@/stores/useCharacterStore";
import { revalidateTag } from "next/cache";
import { z } from "zod"


export async function transformZodErrors(error: z.ZodError) {
    const errors = error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
    }))
    return errors
};


export async function submitForm(formData: FormData) {
    try {

        const validatedFields = completeCharacterSchema.parse({
            name: formData.get("name"),
            race: formData.get("race"),
            class: formData.get("class"),
            background: formData.get("background"),
            alignment: formData.get("alignment"),
            skills: JSON.parse(formData.get("skills") as string),
            attributes: JSON.parse(formData.get("attributes") as string),
            image: formData.get("image"),
            equipment: JSON.parse(formData.get("equipment") as string),
            history: JSON.parse(formData.get("history") as string),
        })

        const character: CreateCharacterWithAttributesInput = {
            name: validatedFields.name,
            class: Number(validatedFields.class),
            race: Number(validatedFields.race),
            background: Number(validatedFields.background),
            alignment: Number(validatedFields.alignment),
            image: validatedFields.image,
            attributes: validatedFields.attributes,
            level: 1,
            experience: 0,
        }
        const history: Omit<History, 'specialAbilities'> = {
            history: validatedFields.history?.history || "",
            traits: validatedFields.history?.traits || "",
            ideals: validatedFields.history?.ideals || "",
            bonds: validatedFields.history?.bonds || "",
            flaws: validatedFields.history?.flaws || "",
        }

        await createCompleteCharacter(character, validatedFields.equipment, validatedFields.skills, history, validatedFields.history?.specialAbilities)
        console.log("character created")
        revalidateTag("characters")
        return {
            data: { success: true },
            errors: null,
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                errors: transformZodErrors(error),
                data: null,
            };
        }
        return {
            errors: {
                message: "Ocurrió un error al guardar el personaje.",
            },
            data: null,
        };
    }
}