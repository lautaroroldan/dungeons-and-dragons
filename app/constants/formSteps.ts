import { ComponentType } from "react"
import { BasicInformationPanel } from "@/app/personajes/crear/components/basic-information-panel"
import { Attributes } from "@/app/personajes/crear/components/attributes"
import { Skills } from "@/app/personajes/crear/components/skills"
import { AddCharacterEquipment } from "@/app/personajes/crear/components/equipment"
import { History } from "@/app/personajes/crear/components/history"
import { Summary } from "@/app/personajes/crear/components/summary"

export interface FormStep {
    id: number
    title: string
    component: ComponentType
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