"use client"

import { UseFormReturn } from "react-hook-form"
import { CompleteCharacterFormType } from "@characters/types/character"
import FormAvatarUpload from "@shared/components/FormAvatarUpload"

interface CharacterAvatarUploadProps {
    form: UseFormReturn<CompleteCharacterFormType>
}

export function CharacterAvatarUpload({ form }: CharacterAvatarUploadProps) {
    return (
        <FormAvatarUpload
            name="image"
            control={form.control}
            title="Avatar del Personaje"
            description="Sube una imagen para tu personaje"
            maxSizeMB={2}
        />
    )
}