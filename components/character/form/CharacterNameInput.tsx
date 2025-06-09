"use client"

import { Input } from "@/components/ui/input"
import { FormControl, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form"
import { completeCharacterSchema } from "@/lib/validations/character"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

export function CharacterNameInput({ form }: { form: UseFormReturn<z.infer<typeof completeCharacterSchema>> }) {

    return (
        <div className="space-y-2">
            <FormField
                control={form.control}
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