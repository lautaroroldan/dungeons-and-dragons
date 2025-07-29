"use client"

import { Input } from "@/components/ui/input"
import { FormControl, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form"
import { CompleteCharacterFormType } from "@/lib/validations/character"
import { Control } from "react-hook-form"

export function CharacterNameInput({ control }: { control: Control<CompleteCharacterFormType> }) {

    return (
        <div className="space-y-2">
            <FormField
                control={control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nombre del Personaje</FormLabel>
                        <FormControl>
                            <Input placeholder="Ej. Thorian Martillo de Piedra" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
} 