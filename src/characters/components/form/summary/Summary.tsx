"use client"

import { HistoryCard } from "@characters/components/form/summary/HistoryCard"
import { UseFormReturn } from "react-hook-form"
import { CompleteCharacterFormType } from "@/lib/validations/character"
import { BasicInfoCard } from "@characters/components/form/summary/BasicInfoCard"
import { AttributeCard } from "@characters/components/form/summary/AttributeCard"
import { EquipmentCard } from "@characters/components/form/summary/EquipmentCard"
import { FinalNotesCard } from "@characters/components/form/summary/FinalNoteCard"


export function Summary({ form }: { form: UseFormReturn<CompleteCharacterFormType> }) {

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Resumen del Personaje</h3>
        <p className="text-sm text-muted-foreground">
          Revisa la información de tu personaje antes de guardar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BasicInfoCard
          form={form}
        />

        <AttributeCard
          form={form}
        />

        <EquipmentCard
          form={form}
        />
      </div>

      <HistoryCard form={form} />

      <FinalNotesCard />
    </div>
  )
}
