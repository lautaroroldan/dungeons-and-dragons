"use client"

import { useMemo } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollText, Shield, Swords, BookOpen, Backpack } from "lucide-react"
import { Equipment, SpecialAbility, useCharacterStore, Skill } from "@/app/stores/useCharacterStore"
import { getAlignmentsById, getBackgroundById, getClassById, getRacesById } from "@/lib/utils"

// Constantes
const ATTRIBUTE_LABELS = {
  strength: "FUE",
  dexterity: "DES",
  constitution: "CON",
  intelligence: "INT",
  wisdom: "SAB",
  charisma: "CAR"
} as const

const MAX_EQUIPMENT_DISPLAY = 8
const MAX_HISTORY_LENGTH = 200

// Utilidades
const calculateModifier = (value: number): string => {
  const mod = Math.floor((value - 10) / 2)
  return mod >= 0 ? `+${mod}` : mod.toString()
}

const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
}

// Componentes
interface BasicInfoCardProps {
  name: string
  image: string
  race: string
  characterClass: string
  background: string
  alignment: string
}

function BasicInfoCard({ name, image, race, characterClass, background, alignment }: BasicInfoCardProps) {
  const raceData = useMemo(() => getRacesById(parseInt(race)), [race])
  const classData = useMemo(() => getClassById(parseInt(characterClass)), [characterClass])
  const backgroundData = useMemo(() => getBackgroundById(parseInt(background)), [background])
  const alignmentData = useMemo(() => getAlignmentsById(parseInt(alignment)), [alignment])

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{name || "Sin nombre"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name || "Personaje"}
            fill
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Badge className="justify-center">{raceData?.name || "Sin raza"}</Badge>
          <Badge className="justify-center">{classData?.name || "Sin clase"}</Badge>
          <Badge variant="outline" className="justify-center">
            {backgroundData?.name || "Sin trasfondo"}
          </Badge>
          <Badge variant="outline" className="justify-center">
            {alignmentData?.name || "Sin alineamiento"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

interface AttributesCardProps {
  attributes: Record<string, number>
  skills: Skill[]
}

function AttributesCard({ attributes, skills }: AttributesCardProps) {
  const proficientSkills = useMemo(() =>
    skills.filter((skill) => skill.proficient),
    [skills]
  )

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
                {ATTRIBUTE_LABELS[attribute as keyof typeof ATTRIBUTE_LABELS]}
              </div>
              <div className="text-lg font-bold">{value}</div>
              <div className="text-xs">{calculateModifier(value)}</div>
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

interface EquipmentCardProps {
  equipment: Equipment[]
}

function EquipmentCard({ equipment }: EquipmentCardProps) {
  const displayEquipment = useMemo(() =>
    equipment.slice(0, MAX_EQUIPMENT_DISPLAY),
    [equipment]
  )

  const remainingCount = equipment.length - MAX_EQUIPMENT_DISPLAY

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Backpack className="h-5 w-5" />
          Equipamiento
        </CardTitle>
      </CardHeader>
      <CardContent>
        {equipment.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            <p className="text-sm">No hay equipamiento</p>
          </div>
        ) : (
          <ul className="text-sm space-y-1">
            {displayEquipment.map((item, index) => (
              <li key={index} className="py-1 border-b border-muted last:border-0 flex items-center gap-2">
                <Image
                  unoptimized
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={16}
                  height={16}
                />
                {item.name}
              </li>
            ))}
            {remainingCount > 0 && (
              <li className="text-xs text-muted-foreground">
                Y {remainingCount} items más...
              </li>
            )}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

interface HistorySection {
  title: string
  content: string
  fallback: string
}

interface HistoryCardProps {
  history: {
    history: string
    traits: string
    ideals: string
    bonds: string
    flaws: string
    specialAbilities: SpecialAbility[]
  }
}

function HistoryCard({ history }: HistoryCardProps) {
  const historySections: HistorySection[] = useMemo(() => [
    { title: "Personalidad", content: history.traits, fallback: "No especificada" },
    { title: "Ideales", content: history.ideals, fallback: "No especificados" },
    { title: "Vínculos", content: history.bonds, fallback: "No especificados" },
    { title: "Defectos", content: history.flaws, fallback: "No especificados" }
  ], [history])

  const truncatedHistory = useMemo(() =>
    truncateText(history.history, MAX_HISTORY_LENGTH),
    [history.history]
  )

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Historia y Trasfondo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.history ? (
            <div>
              <h4 className="text-sm font-medium mb-1">Historia</h4>
              <p className="text-sm text-muted-foreground">{truncatedHistory}</p>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No se ha agregado historia</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {historySections.map((section) => (
              <div key={section.title}>
                <h4 className="text-sm font-medium mb-1">{section.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {section.content || section.fallback}
                </p>
              </div>
            ))}
          </div>

          {history.specialAbilities.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1">Habilidades Especiales</h4>
              <div className="flex flex-wrap gap-1">
                {history.specialAbilities.map((ability, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {ability.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function FinalNotesCard() {
  return (
    <div className="bg-muted p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <ScrollText className="h-5 w-5 text-muted-foreground" />
        <h4 className="font-medium">Notas Finales</h4>
      </div>
      <p className="text-sm text-muted-foreground">
        Revisa toda la información de tu personaje antes de guardar. Una vez guardado, podrás ver el perfil completo
        de tu personaje y editarlo más adelante si es necesario.
      </p>
    </div>
  )
}

// Componente principal
export function Resumen() {
  const character = useCharacterStore((state) => state.character)
  const { name, image, race, class: characterClass, background, alignment, attributes, skills, equipment, history } = character

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
          name={name}
          image={image}
          race={race}
          characterClass={characterClass}
          background={background}
          alignment={alignment}
        />

        <AttributesCard
          attributes={attributes}
          skills={skills}
        />

        <EquipmentCard equipment={equipment} />
      </div>

      <HistoryCard history={history} />

      <FinalNotesCard />
    </div>
  )
}
