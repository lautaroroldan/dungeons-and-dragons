import { useState, useEffect } from "react"
import { CompleteCharacterFormType } from "@characters/types/character"

async function fetchCharacterById(id: string): Promise<CompleteCharacterFormType> {
    const response = await fetch(`/api/characters/${id}`)

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error(`No se encontró el personaje con ID: ${id}`)
        }
        throw new Error(`Error al cargar el personaje: ${response.statusText}`)
    }

    const character = await response.json()

    console.log("🔍 Raw character data from API:", character)

    // Convertir el character de la API al formato del form
    const formattedCharacter = {
        name: character.name || "",
        race: character.race?.name || "",
        class: character.class?.name || "",
        background: character.background?.name || "",
        alignment: character.alignment?.name || "",
        level: character.level || 1,
        experience: character.experience || 0,
        attributes: character.attributes || {
            strength: 8,
            dexterity: 8,
            constitution: 8,
            intelligence: 8,
            wisdom: 8,
            charisma: 8
        },
        skills: character.skills || [],
        equipment: character.equipment || [],
        history: {
            backstory: character.history?.backstory || "",
            ideals: character.history?.ideals || "",
            bonds: character.history?.bonds || "",
            flaws: character.history?.flaws || "",
            specialAbilities: character.history?.specialAbilities || []
        },
        image: character.image || ""
    }

    console.log("✅ Formatted character data for form:", formattedCharacter)

    return formattedCharacter
}

export function useCharacterById(characterId: string) {
    const [character, setCharacter] = useState<CompleteCharacterFormType | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadCharacter() {
            try {
                setIsLoading(true)
                setError(null)
                const characterData = await fetchCharacterById(characterId)
                setCharacter(characterData)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error al cargar el personaje')
                console.error('❌ Error loading character:', err)
            } finally {
                setIsLoading(false)
            }
        }

        if (characterId) {
            loadCharacter()
        }
    }, [characterId])

    return {
        character,
        isLoading,
        error
    }
}