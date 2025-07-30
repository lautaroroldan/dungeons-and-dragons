import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"
import { Shield, Swords } from "lucide-react"
import { useMemo } from "react"
import { Skill } from "@/stores/useCharacterStore"
import { Separator } from "@shared/components/ui/separator"
import { Badge } from "@shared/components/ui/badge"
import { ATTRIBUTE_ABBREVIATIONS } from "@characters/utils/attributes"
import { calculateAttributeModifier, showAttributeModifier } from "@shared/utils/utils"
import { UseFormReturn, useWatch } from "react-hook-form"
import { CompleteCharacterFormType } from "@/lib/validations/character"

interface AttributeCardProps {
  form: UseFormReturn<CompleteCharacterFormType>
}

export function AttributeCard({ form }: AttributeCardProps) {

  const attributes = useWatch({
    control: form.control,
    name: "attributes",
    defaultValue: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    }
  })

  const skills = useWatch({
    control: form.control,
    name: "skills"
  })

  const proficientSkills = skills?.filter((skill) => skill.proficient) || []

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Atributos y Habilidades
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(attributes).map(([attribute, value]) => (
            <div key={attribute} className="bg-muted rounded-lg p-2 text-center">
              <div className="text-xs uppercase text-muted-foreground">
                {ATTRIBUTE_ABBREVIATIONS[attribute as keyof typeof ATTRIBUTE_ABBREVIATIONS]}
              </div>
              <div className="text-lg font-bold">{value}</div>
              <div className="text-xs">{showAttributeModifier(value)}</div>
            </div>
          ))}
        </div>

        <Separator />

        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
            <Swords className="h-4 w-4" />
            Competencias
          </h4>
          <div className="flex flex-wrap gap-1">
            {proficientSkills.length > 0 ? (
              proficientSkills.map((skill) => (
                <Badge key={skill.name} variant="outline" className="text-xs">
                  {skill.name}
                </Badge>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">
                No se han seleccionado competencias
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}