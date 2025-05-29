"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useCharacterStore, SpecialAbility } from "@/app/stores/useCharacterStore"

const ABILITY_TYPES = [
  { value: "racial", label: "Racial" },
  { value: "class", label: "Clase" },
  { value: "feat", label: "Dote" },
  { value: "magic", label: "Mágica" },
  { value: "equipment", label: "Equipamiento" },
  { value: "other", label: "Otra" },
]

export function History() {
  const { history } = useCharacterStore((state) => state.character)
  const setCharacter = useCharacterStore((state) => state.setCharacter)

  const handleSpecialAbilityChange = (index: number, field: keyof SpecialAbility, value: string | number) => {
    const newSpecialAbilities = [...history.specialAbilities]
    newSpecialAbilities[index] = {
      ...newSpecialAbilities[index],
      [field]: value
    }
    setCharacter({ history: { ...history, specialAbilities: newSpecialAbilities } })
  }

  const addSpecialAbility = () => {
    const newAbility: SpecialAbility = {
      name: "",
      description: "",
      type: "other",
      level: 1,
      source: ""
    }
    const newSpecialAbilities = [...history.specialAbilities, newAbility]
    setCharacter({ history: { ...history, specialAbilities: newSpecialAbilities } })
  }

  const removeSpecialAbility = (index: number) => {
    const newSpecialAbilities = history.specialAbilities.filter((_, i) => i !== index)
    setCharacter({ history: { ...history, specialAbilities: newSpecialAbilities } })
  }

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
          <div className="space-y-2">
            <Label htmlFor="historia">Historia y Orígenes</Label>
            <Textarea
              id="historia"
              placeholder="Describe los orígenes y la historia de tu personaje..."
              className="min-h-[150px]"
              value={history.history}
              onChange={(e) => setCharacter({ history: { ...history, history: e.target.value } })}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Personalidad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="personalidad">Rasgos de Personalidad</Label>
              <Textarea
                id="personalidad"
                placeholder="Describe cómo es la personalidad de tu personaje..."
                className="min-h-[100px]"
                value={history.traits}
                onChange={(e) => setCharacter({ history: { ...history, traits: e.target.value } })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ideales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="ideales">Ideales y Creencias</Label>
              <Textarea
                id="ideales"
                placeholder="¿Cuáles son los ideales y creencias que guían a tu personaje?"
                className="min-h-[100px]"
                value={history.ideals}
                onChange={(e) => setCharacter({ history: { ...history, ideals: e.target.value } })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Vínculos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="vinculos">Vínculos y Conexiones</Label>
              <Textarea
                id="vinculos"
                placeholder="¿Qué conexiones tiene tu personaje con el mundo y otras personas?"
                className="min-h-[100px]"
                value={history.bonds}
                onChange={(e) => setCharacter({ history: { ...history, bonds: e.target.value } })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Defectos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="defectos">Defectos y Debilidades</Label>
              <Textarea
                id="defectos"
                placeholder="¿Cuáles son los defectos o debilidades de tu personaje?"
                className="min-h-[100px]"
                value={history.flaws}
                onChange={(e) => setCharacter({ history: { ...history, flaws: e.target.value } })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Habilidades Especiales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Agrega habilidades especiales de tu personaje, como visión en la oscuridad, resistencia a elementos,
              habilidades de clase, dotes, etc.
            </p>

            {history.specialAbilities.map((ability, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">Habilidad {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSpecialAbility(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nombre de la Habilidad</Label>
                    <Input
                      placeholder="Ej: Visión en la Oscuridad"
                      value={ability.name}
                      onChange={(e) => handleSpecialAbilityChange(index, 'name', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <Select
                      value={ability.type}
                      onValueChange={(value) => handleSpecialAbilityChange(index, 'type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {ABILITY_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nivel</Label>
                    <Input
                      type="number"
                      min="1"
                      max="20"
                      placeholder="1"
                      value={ability.level}
                      onChange={(e) => handleSpecialAbilityChange(index, 'level', parseInt(e.target.value) || 1)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Fuente</Label>
                    <Input
                      placeholder="Ej: Raza Elfo, Clase Explorador"
                      value={ability.source}
                      onChange={(e) => handleSpecialAbilityChange(index, 'source', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Descripción</Label>
                  <Textarea
                    placeholder="Describe cómo funciona esta habilidad..."
                    className="min-h-[80px]"
                    value={ability.description}
                    onChange={(e) => handleSpecialAbilityChange(index, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addSpecialAbility}
              className="w-full"
            >
              + Agregar Habilidad Especial
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
