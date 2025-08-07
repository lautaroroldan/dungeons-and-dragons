"use client"


import { CompleteCharacterFormType, completeCharacterSchema } from "@characters/types/character"
import { z } from "zod"
import { UseFormReturn } from "react-hook-form"
import { getApiRaces, getApiClasses, getApiBackgrounds, getApiAlignments } from "@shared/utils/utils"
import useSWR from "swr"
import { FormControl, FormMessage, FormItem, FormField, FormLabel } from "@/src/shared/components/ui/form"
import SWRSelect from "@/src/shared/components/ui/custom-select/SWRSelect"

interface SelectConfig {
    id: keyof z.infer<typeof completeCharacterSchema>
    label: string
}

const selectConfigs: SelectConfig[] = [
    { label: "Raza", id: "race", },
    { label: "Clase", id: "class", },
    { label: "Trasfondo", id: "background", },
    { label: "Alineamiento", id: "alignment", }
]

export function CharacterSelectsGrid({ form }: { form: UseFormReturn<CompleteCharacterFormType> }) {

    const racesQuery = useSWR('/api/races', getApiRaces)
    const classesQuery = useSWR('/api/classes', getApiClasses)
    const backgroundsQuery = useSWR('/api/backgrounds', getApiBackgrounds)
    const alignmentsQuery = useSWR('/api/alignments', getApiAlignments)

    const queriesById = {
        race: racesQuery,
        class: classesQuery,
        background: backgroundsQuery,
        alignment: alignmentsQuery
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                {selectConfigs.map(({ id, label }) => (
                    <FormField
                        key={id}
                        control={form.control}
                        name={id}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{label}</FormLabel>
                                <FormControl>
                                    <SWRSelect
                                        query={queriesById[id as keyof typeof queriesById]}
                                        valueKey="id"
                                        labelKey="name"
                                        value={field.value as string}
                                        onValueChange={field.onChange}
                                        placeholder={`Selecciona ${label.toLowerCase()}`}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
            </div>
        </div>
    )
} 