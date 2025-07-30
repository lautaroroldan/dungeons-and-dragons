import { ComponentType } from "react"
import { BasicInformationPanel } from "@characters/components/form/BasicInformationPanel"
import { Attributes } from "@characters/components/form/attributes"
import { Skills } from "@characters/components/form/skills"
import { AddCharacterEquipment } from "@characters/components/form/equipment/Equipment"
import { History } from "@characters/components/form/history/History"
import { Summary } from "@characters/components/form/summary/Summary"
import { completeCharacterSchema } from "@characters/types/character"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

export interface FormStep {
    id: number
    title: string
    component: ComponentType<{ form: UseFormReturn<z.infer<typeof completeCharacterSchema>> }>
}

export const FORM_STEPS: FormStep[] = [
    { id: 0, title: "Información Básica", component: BasicInformationPanel },
    { id: 1, title: "Atributos", component: Attributes },
    { id: 2, title: "Habilidades", component: Skills },
    { id: 3, title: "Equipamiento", component: AddCharacterEquipment },
    { id: 4, title: "Historia", component: History },
    { id: 5, title: "Resumen", component: Summary },
]

export const TOTAL_STEPS = FORM_STEPS.length 