"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/components/ui/tabs"
import { Badge } from "@shared/components/ui/badge"
import { Equipment } from "@/stores/useCharacterStore"
import { completeCharacterSchema } from "@/lib/validations/character"
import { useFieldArray, UseFormReturn, useWatch } from "react-hook-form"
import { z } from "zod"
import { AddEquipment } from "@characters/components/form/equipment/AddEquipment"
import { AddCustomEquipment } from "@characters/components/form/equipment/CustomEquipment"
import { InventoryDisplay } from "@characters/components/form/equipment/InventoryDisplay"



function EquipmentTabs({ children, totalItems }: { children: React.ReactNode, totalItems: number }) {
  return (
    <Tabs defaultValue="agregar" className="w-full">
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger value="agregar">Agregar Equipamiento</TabsTrigger>
        <TabsTrigger value="inventario">
          Inventario {totalItems > 0 && `(${totalItems})`}
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  )
}

// Componente principal
export function AddCharacterEquipment({ form }: { form: UseFormReturn<z.infer<typeof completeCharacterSchema>> }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "equipment"
  })

  const totalItems = fields.length
  const equipment = useWatch({ control: form.control, name: "equipment" })

  const equipmentByType = fields.reduce((acc, item) => {
    acc[item.type] = [...(acc[item.type] || []), item]
    return acc
  }, {} as Record<string, Equipment[]>)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">Equipamiento e Inventario</h3>
          <p className="text-sm text-muted-foreground">
            Agrega el equipamiento y los objetos que lleva tu personaje
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {totalItems} objeto(s) total
        </Badge>
      </div>

      <EquipmentTabs totalItems={totalItems}>

        <TabsContent value="agregar" className="space-y-6">
          <AddEquipment onAdd={append} />
          <AddCustomEquipment onAdd={append} />
        </TabsContent>

        <TabsContent value="inventario">
          <InventoryDisplay
            equipment={equipment}
            equipmentByType={equipmentByType}
            onRemove={remove}
          />
        </TabsContent>
      </EquipmentTabs>
    </div>
  )
}
