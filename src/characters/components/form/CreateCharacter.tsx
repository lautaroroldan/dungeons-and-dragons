"use client"

import { CharacterForm } from "@characters/components/form/CharacterForm"
import { useCharacterSubmit } from "@characters/hooks/useCharacterSubmit"

export function CreateCharacter() {
    const { handleSubmit, isSubmitting, submitResult } = useCharacterSubmit('create')

    return (
        <div className="container mx-auto px-4 py-8">
            <CharacterForm
                mode="create"
                onSubmit={handleSubmit}
                title="Crear Nuevo Personaje"
                description="Completa la información para crear tu personaje de Dungeons & Dragons"
                isSubmitting={isSubmitting}
                submitResult={submitResult}
            />
        </div>
    )
} 