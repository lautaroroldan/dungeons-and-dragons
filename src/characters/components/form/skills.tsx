"use client"

import { useMemo, useCallback, useEffect } from "react"
import { Checkbox } from "@shared/components/ui/checkbox"
import { Label } from "@shared/components/ui/label"
import { Card, CardContent } from "@shared/components/ui/card"
import { Badge } from "@shared/components/ui/badge"
import { useCharacterStore, Skill } from "@/stores/useCharacterStore"
import { calculateAttributeModifier, EClass, getClassById, showAttributeModifier } from "@shared/utils/utils"
import { SKILL_ATTRIBUTE_MAP } from "@characters/utils/attributes"
import { ATTRIBUTE_DISPLAY_NAMES } from "@characters/utils/attributes"
import { FormControl, FormItem, FormField, FormLabel, FormDescription } from "@shared/components/ui/form"
import { ControllerRenderProps, UseFormReturn, useWatch } from "react-hook-form"
import { completeCharacterSchema } from "@/lib/validations/character"
import { z } from "zod"

const CLASS_PROFICIENCY_COUNT = {
  [EClass.ROUGH]: 4,
  [EClass.BARD]: 3,
  [EClass.EXPLORER]: 3,
  [EClass.WARRIOR]: 2,
  [EClass.PALADIN]: 2,
  [EClass.BARBARIAN]: 2,
  [EClass.MONK]: 2,
} as const

const DefaultSkills = [
  { name: "Arcanos", value: 0, proficient: false, attribute: "intelligence" },
  { name: "Atletismo", value: 0, proficient: false, attribute: "strength" },
  { name: "Engaño", value: 0, proficient: false, attribute: "charisma" },
  { name: "Historia", value: 0, proficient: false, attribute: "intelligence" },
  { name: "Interpretación", value: 0, proficient: false, attribute: "intelligence" },
  { name: "Intimidación", value: 0, proficient: false, attribute: "charisma" },
  { name: "Investigación", value: 0, proficient: false, attribute: "intelligence" },
  { name: "Juego de Manos", value: 0, proficient: false, attribute: "dexterity" },
  { name: "Medicina", value: 0, proficient: false, attribute: "wisdom" },
  { name: "Naturaleza", value: 0, proficient: false, attribute: "intelligence" },
  { name: "Percepción", value: 0, proficient: false, attribute: "wisdom" },
  { name: "Perspicacia", value: 0, proficient: false, attribute: "wisdom" },
  { name: "Persuasión", value: 0, proficient: false, attribute: "charisma" },
  { name: "Religión", value: 0, proficient: false, attribute: "intelligence" },
  { name: "Sigilo", value: 0, proficient: false, attribute: "dexterity" },
  { name: "Supervivencia", value: 0, proficient: false, attribute: "wisdom" },
  { name: "Trato con Animales", value: 0, proficient: false, attribute: "charisma" },
] as const

const calculateProficiencyBonus = (level: number): number => {
  if (level >= 17) return 6
  if (level >= 13) return 5
  if (level >= 9) return 4
  if (level >= 5) return 3
  return 2
}

const getAvailableCompetitions = (classId: string): number => {
  const classType = getClassById(parseInt(classId))
  return CLASS_PROFICIENCY_COUNT[classType?.id as keyof typeof CLASS_PROFICIENCY_COUNT] || 2
}

const getAttributeBySkill = (skillName: string) => {
  return SKILL_ATTRIBUTE_MAP[skillName] || "dexterity"
}

const calculateSkillValue = (
  attributeValue: number,
  isProficient: boolean,
  proficiencyBonus: number
): number => {
  const modifier = calculateAttributeModifier(attributeValue)
  return modifier + (isProficient ? proficiencyBonus : 0)
}


const SkillItem = ({ key, form, skill, canToggle, currentProficiencies, availableCompetitions, proficiencyBonus }: { key: string, form: UseFormReturn<z.infer<typeof completeCharacterSchema>>, skill: Skill, canToggle: boolean, currentProficiencies: number, availableCompetitions: number, proficiencyBonus: number }) => {
  const { attributes } = useWatch({ control: form.control })

  const handleSkillChange = (checked: boolean, field: ControllerRenderProps<z.infer<typeof completeCharacterSchema>, "skills">) => {
    if (checked && currentProficiencies >= availableCompetitions) {
      return
    }

    const updatedSkills = field.value?.map(s => {
      if (s.name === skill.name) {
        const attribute = s.attribute as keyof typeof attributes
        const attributeValue = attributes?.[attribute] || 10
        const value = calculateSkillValue(attributeValue, checked, proficiencyBonus)

        return {
          ...s,
          proficient: checked,
          value
        }
      }
      return s
    }) || []

    field.onChange(updatedSkills)
  }
  return (
    <FormField
      key={skill.name}
      control={form.control}
      name="skills"
      render={({ field }) => {
        return (
          <FormItem
            key={skill.name}
            className="flex flex-row items-center gap-2 space-y-0"
          >
            <FormControl>
              <Checkbox
                id={skill.name}
                checked={field?.value?.find(s => s.name === skill.name)?.proficient || false}
                disabled={!canToggle}
                onCheckedChange={(checked: boolean) => handleSkillChange(checked, field)}
              />
            </FormControl>
            <FormLabel className="flex justify-between items-center w-full cursor-pointer"
              onClick={() => handleSkillChange(!(field?.value?.find(s => s.name === skill.name)?.proficient || false), field)}
            >
              <span className={!canToggle ? "text-muted-foreground" : ""}>
                {skill.name}
              </span>
              <Badge variant={field?.value?.find(s => s.name === skill.name)?.proficient || false ? "default" : "outline-solid"}>
                {(() => {
                  const skillValue = field?.value?.find(s => s.name === skill.name)?.value
                  if (typeof skillValue === 'undefined') return 0
                  return `${skillValue >= 0 ? '+' : ''}${skillValue}`
                })()}
              </Badge>
            </FormLabel>
          </FormItem>
        )
      }}
    />
  )
}


const AttributeSkills = ({ attribute, modifier, attributeSkills, currentProficiencies, availableCompetitions, form, attributes, proficiencyBonus }: { attribute: string, modifier: number, attributeSkills: Skill[], currentProficiencies: number, availableCompetitions: number, form: UseFormReturn<z.infer<typeof completeCharacterSchema>>, attributes: any, proficiencyBonus: number }) => {
  return (
    <Card key={attribute}>
      <CardContent className="p-4">
        <FormField
          control={form.control}
          name="skills"
          render={() => {
            return (
              <FormItem>
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-sm text-muted-foreground">Attribute</p>
                  <FormLabel className="font-medium">
                    {ATTRIBUTE_DISPLAY_NAMES[attribute as keyof typeof ATTRIBUTE_DISPLAY_NAMES]}
                  </FormLabel>
                  <Badge variant="outline">
                    {modifier >= 0 ? "+" : ""}{modifier}
                  </Badge>
                </div>

                <div className="space-y-2">
                  {attributeSkills.map(skill => {
                    const canToggle = skill.proficient || currentProficiencies < availableCompetitions

                    return (
                      <SkillItem
                        key={skill.name}
                        form={form}
                        skill={skill}
                        canToggle={canToggle}
                        currentProficiencies={currentProficiencies}
                        availableCompetitions={availableCompetitions}
                        proficiencyBonus={proficiencyBonus}
                      />
                    )
                  })}
                </div>
              </FormItem>
            )
          }}
        />
      </CardContent>
    </Card>
  )
}

export function Skills({ form }: { form: UseFormReturn<z.infer<typeof completeCharacterSchema>> }) {
  const { class: characterClass, attributes, skills } = useWatch({ control: form.control })
  const level = 1

  // Inicializar skills si no existen - usando useEffect para evitar setState durante render
  useEffect(() => {
    if (!skills || skills.length === 0) {
      form.setValue("skills", DefaultSkills.map(skill => ({
        name: skill.name,
        value: calculateSkillValue(
          attributes?.[skill.attribute as keyof typeof attributes] || 10,
          false,
          calculateProficiencyBonus(level)
        ),
        proficient: false,
        attribute: skill.attribute
      })))
    }
  }, [skills, attributes, form, level])

  const proficiencyBonus = calculateProficiencyBonus(level)
  const availableCompetitions = getAvailableCompetitions(characterClass?.toString() || "1")
  const currentProficiencies = skills?.filter(skill => skill.proficient).length || 0

  // Skills organizadas por atributo
  const skillsByAttribute = useMemo(() => {
    const grouped: Record<string, Skill[]> = {
      strength: [],
      dexterity: [],
      constitution: [],
      intelligence: [],
      wisdom: [],
      charisma: [],
    }

    skills?.forEach(skill => {
      const attribute = getAttributeBySkill(skill.name || "")
      grouped[attribute].push(skill as Skill)
    })

    return grouped
  }, [skills])


  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Habilidades y Competencias</h3>
        <p className="text-sm text-muted-foreground">
          Selecciona en qué habilidades tu personaje es competente
        </p>
      </div>

      <div className="bg-muted p-3 rounded-lg flex justify-between items-center">
        <div>
          <p className="text-sm">
            Competencias disponibles: <span className="font-bold">{availableCompetitions}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Usadas: {currentProficiencies} / {availableCompetitions}
          </p>
        </div>
        <Badge>Bonus de Competencia: +{proficiencyBonus}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(skillsByAttribute).map(([attribute, attributeSkills]) => {
          if (attributeSkills.length === 0) return null

          const attributeValue = attributes?.[attribute as keyof typeof attributes] || 10
          const modifier = calculateAttributeModifier(attributeValue)

          return (
            <AttributeSkills
              key={attribute}
              attribute={attribute}
              modifier={modifier}
              attributeSkills={attributeSkills}
              currentProficiencies={currentProficiencies}
              availableCompetitions={availableCompetitions}
              form={form}
              attributes={attributes}
              proficiencyBonus={proficiencyBonus}
            />
          )
        })}
      </div>
    </div>
  )
}
