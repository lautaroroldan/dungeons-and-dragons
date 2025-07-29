"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFieldArray, UseFormReturn } from "react-hook-form"
import { CompleteCharacterFormType } from "@/lib/validations/character"
import { TextAreaForm } from "@/components/character/form/TextAreaForm"
import { SpecialAbility } from "@/components/character/form/history/SpecialAbility"

export function History({ form }: { form: UseFormReturn<CompleteCharacterFormType> }) {

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "history.specialAbilities"
  })


  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Historia y Trasfondo</h3>
        <p className="text-sm text-muted-foreground">
          Describe la historia, personalidad y motivaciones de tu personaje
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Historia del Personaje</CardTitle>
        </CardHeader>
        <CardContent>
          <TextAreaForm
            form={form}
            name="history.history"
            label="Historia y Orígenes"
            placeholder="Describe los orígenes y la historia de tu personaje..."
            TextAreaClassName="min-h-[150px]"
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Personalidad</CardTitle>
          </CardHeader>
          <CardContent>
            <TextAreaForm
              form={form}
              name="history.traits"
              label="Rasgos de Personalidad"
              placeholder="Describe cómo es la personalidad de tu personaje..."
              TextAreaClassName="min-h-[100px]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ideales</CardTitle>
          </CardHeader>
          <CardContent>
            <TextAreaForm
              form={form}
              name="history.ideals"
              label="Ideales y Creencias"
              placeholder="¿Cuáles son los ideales y creencias que guían a tu personaje?"
              TextAreaClassName="min-h-[100px]"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Vínculos</CardTitle>
          </CardHeader>
          <CardContent>
            <TextAreaForm
              form={form}
              name="history.bonds"
              label="Vínculos y Conexiones"
              placeholder="¿Qué conexiones tiene tu personaje con el mundo y otras personas?"
              TextAreaClassName="min-h-[100px]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Defectos</CardTitle>
          </CardHeader>
          <CardContent>
            <TextAreaForm
              form={form}
              name="history.flaws"
              label="Defectos y Debilidades"
              placeholder="¿Cuáles son los defectos o debilidades de tu personaje?"
              TextAreaClassName="min-h-[100px]"
            />
          </CardContent>
        </Card>
      </div>

      <SpecialAbility
        form={form}
        fields={fields}
        remove={remove}
        append={append}
      />
    </div>
  )
}
