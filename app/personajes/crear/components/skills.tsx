"use client"

import { useMemo, useCallback } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCharacterStore, Skill } from "@/app/stores/useCharacterStore"
import { EClass, getClassById } from "@/lib/utils"

// Constantes
const SKILL_ATTRIBUTE_MAP: Record<string, string> = {
  Acrobacias: "dexterity",
  Arcanos: "intelligence",
  Atletismo: "strength",
  Engaño: "charisma",
  Historia: "intelligence",
  Interpretación: "charisma",
  Intimidación: "charisma",
  Investigación: "intelligence",
  "Juego de Manos": "dexterity",
  Medicina: "wisdom",
  Naturaleza: "intelligence",
  Percepción: "wisdom",
  Perspicacia: "wisdom",
  Persuasión: "charisma",
  Religión: "intelligence",
  Sigilo: "dexterity",
  Supervivencia: "wisdom",
  "Trato con Animales": "wisdom",
}

const ATTRIBUTE_DISPLAY_NAMES = {
  strength: "Fuerza",
  dexterity: "Destreza",
  constitution: "Constitución",
  intelligence: "Inteligencia",
  wisdom: "Sabiduría",
  charisma: "Carisma"
} as const

const CLASS_PROFICIENCY_COUNT = {
  [EClass.ROUGH]: 4,
  [EClass.BARD]: 3,
  [EClass.EXPLORER]: 3,
  [EClass.WARRIOR]: 2,
  [EClass.PALADIN]: 2,
  [EClass.BARBARIAN]: 2,
  [EClass.MONK]: 2,
} as const

// Utilidades
const calculateAttributeModifier = (value: number): number => Math.floor((value - 10) / 2)

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

export function Skills() {
  const { level, class: characterClass, attributes, skills } = useCharacterStore((state) => state.character)
  const setCharacter = useCharacterStore((state) => state.setCharacter)

  // Valores calculados
  const proficiencyBonus = useMemo(() => calculateProficiencyBonus(level), [level])
  const availableCompetitions = useMemo(() => getAvailableCompetitions(characterClass), [characterClass])
  const currentProficiencies = useMemo(() => skills.filter(skill => skill.proficient).length, [skills])

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

    skills.forEach(skill => {
      const attribute = getAttributeBySkill(skill.name)
      grouped[attribute].push(skill)
    })

    return grouped
  }, [skills])

  // Manejador de cambio de competencia
  const handleSkillChange = useCallback((skillName: string, proficient: boolean) => {
    // Verificar si puede agregar más competencias
    if (proficient && currentProficiencies >= availableCompetitions) {
      return
    }

    const updatedSkills = skills.map(skill => {
      if (skill.name === skillName) {
        const attribute = getAttributeBySkill(skillName) as keyof typeof attributes
        const attributeValue = attributes[attribute] || 10
        const value = calculateSkillValue(attributeValue, proficient, proficiencyBonus)

        return {
          ...skill,
          proficient,
          value
        }
      }
      return skill
    })

    setCharacter({ skills: updatedSkills })
  }, [skills, attributes, proficiencyBonus, currentProficiencies, availableCompetitions, setCharacter])

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

          const attributeValue = attributes[attribute as keyof typeof attributes] || 10
          const modifier = calculateAttributeModifier(attributeValue)

          return (
            <Card key={attribute}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="font-medium">
                    {ATTRIBUTE_DISPLAY_NAMES[attribute as keyof typeof ATTRIBUTE_DISPLAY_NAMES]}
                  </h4>
                  <Badge variant="outline">
                    {modifier >= 0 ? "+" : ""}{modifier}
                  </Badge>
                </div>

                <div className="space-y-2">
                  {attributeSkills.map(skill => {
                    const canToggle = skill.proficient || currentProficiencies < availableCompetitions

                    return (
                      <div key={skill.name} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill.name}
                          checked={skill.proficient}
                          disabled={!canToggle}
                          onCheckedChange={(checked: boolean) => handleSkillChange(skill.name, checked)}
                        />
                        <Label
                          htmlFor={skill.name}
                          className="flex justify-between items-center w-full cursor-pointer"
                        >
                          <span className={!canToggle ? "text-muted-foreground" : ""}>
                            {skill.name}
                          </span>
                          <Badge variant={skill.proficient ? "default" : "outline"}>
                            {skill.value >= 0 ? "+" : ""}{skill.value}
                          </Badge>
                        </Label>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
