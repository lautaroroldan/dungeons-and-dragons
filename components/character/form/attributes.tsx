"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dice6, RefreshCw } from "lucide-react"
import { completeCharacterSchema } from "@/lib/validations/character"
import { UseFormReturn, useWatch } from "react-hook-form"
import { z } from "zod"
import { SliderForm } from "@/components/character/form/SliderForm"
import { ATTRIBUTE_DISPLAY_NAMES } from "@/constants/attributes"
import { showAttributeModifier } from "@/lib/utils"

const AVAILABLE_POINTS = 27


const AttributeItem = ({ attribute, form }: { attribute: string, form: UseFormReturn<z.infer<typeof completeCharacterSchema>> }) => {
  const currentValue = useWatch({
    control: form.control,
    name: `attributes.${attribute as keyof z.infer<typeof completeCharacterSchema>['attributes']}`
  }) as number || 10;

  return (
    <Card key={attribute}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <Label htmlFor={`attributes.${attribute}`} className="text-base capitalize">
            {ATTRIBUTE_DISPLAY_NAMES[attribute as keyof typeof ATTRIBUTE_DISPLAY_NAMES]}
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{currentValue}</span>
            <span className="text-sm text-muted-foreground">({showAttributeModifier(currentValue as number)})</span>
          </div>
        </div>
        {AVAILABLE_POINTS > 0 ? (
          <SliderForm
            name={`attributes.${attribute}` as keyof z.infer<typeof completeCharacterSchema>}
            control={form.control}
            min={8}
            max={15}
            step={1}
          />
        ) : (
          <div className="h-5 bg-muted rounded-full relative">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${((currentValue as number) / 20) * 100}%` }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function Attributes({ form }: { form: UseFormReturn<z.infer<typeof completeCharacterSchema>> }) {

  const [availablePoints, setAvailablePoints] = useState(AVAILABLE_POINTS)

  const attributes = form.watch("attributes") || {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10
  }

  const resetAttributes = () => {
    form.resetField("attributes")
    setAvailablePoints(AVAILABLE_POINTS)
  }



  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Atributos del Personaje</h3>
          <p className="text-sm text-muted-foreground">Asigna valores a los atributos de tu personaje</p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={resetAttributes}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Resetear
          </Button>
          <Button variant="secondary" size="sm" onClick={() => { }}>
            <Dice6 className="mr-2 h-4 w-4" />
            Tirar Dados
          </Button>
        </div>
      </div>

      {availablePoints > 0 && (
        <div className="bg-muted p-3 rounded-lg text-center">
          <p className="text-sm">
            Puntos disponibles: <span className="font-bold">{availablePoints}</span>
          </p>
          <p className="text-xs text-muted-foreground">Usa el sistema de puntos para asignar valores entre 8 y 15</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(attributes).map((attribute) => (
          <AttributeItem
            key={attribute}
            attribute={attribute}
            form={form}
          />
        ))}
      </div>

      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-medium mb-2">¿Qué significan estos atributos?</h4>
        <ul className="space-y-1 text-sm">
          <li>
            <strong>Fuerza:</strong> Potencia física, capacidad para levantar peso y golpear con fuerza.
          </li>
          <li>
            <strong>Destreza:</strong> Agilidad, reflejos, equilibrio y precisión.
          </li>
          <li>
            <strong>Constitución:</strong> Salud, resistencia y aguante.
          </li>
          <li>
            <strong>Inteligencia:</strong> Razonamiento, memoria y capacidad de aprendizaje.
          </li>
          <li>
            <strong>Sabiduría:</strong> Percepción, intuición y fuerza de voluntad.
          </li>
          <li>
            <strong>Carisma:</strong> Personalidad, liderazgo y capacidad para influir en otros.
          </li>
        </ul>
      </div>
    </div>
  )
}
