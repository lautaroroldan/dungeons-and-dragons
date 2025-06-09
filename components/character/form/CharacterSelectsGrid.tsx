"use client"

import { SelectForm } from "@/components/character/form/SelectForm"
import { completeCharacterSchema } from "@/lib/validations/character"
import { z } from "zod"
import { UseFormReturn } from "react-hook-form"
import { getApiRaces, getApiClasses, getApiBackgrounds, getApiAlignments } from "@/lib/utils"
import { BasicTable } from "@/db/schema"
import { Suspense } from "react"

interface SelectConfig {
    id: string
    label: string
    url: () => Promise<BasicTable[]>
}

const selectConfigs: SelectConfig[] = [
    { label: "Raza", id: "race", url: getApiRaces },
    { label: "Clase", id: "class", url: getApiClasses },
    { label: "Trasfondo", id: "background", url: getApiBackgrounds },
    { label: "Alineamiento", id: "alignment", url: getApiAlignments }
]

export function CharacterSelectsGrid({ form }: { form: UseFormReturn<z.infer<typeof completeCharacterSchema>> }) {



    return (
        <div className="space-y-4">
            {/* Raza y Clase */}
            <div className="grid grid-cols-2 gap-4">
                {selectConfigs.slice(0, 2).map((config) => (
                    <Suspense key={config.id} fallback={<div>Loading...</div>}>
                        <SelectForm
                            key={config.id}
                            label={config.label}
                            name={config.id as keyof z.infer<typeof completeCharacterSchema>}
                            url={config.url}
                            form={form}
                        />
                    </Suspense>
                ))}
            </div>

            {/* Trasfondo y Alineamiento */}
            <div className="grid grid-cols-2 gap-4">
                {selectConfigs.slice(2, 4).map((config) => (
                    <SelectForm
                        key={config.id}
                        label={config.label}
                        name={config.id as keyof z.infer<typeof completeCharacterSchema>}
                        url={config.url}
                        form={form}
                    />
                ))}
            </div>
        </div>
    )
} 