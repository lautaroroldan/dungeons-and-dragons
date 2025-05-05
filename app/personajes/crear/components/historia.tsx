"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface HistoriaProps {
  personaje: any
  actualizarPersonaje: (datos: any) => void
}

export function Historia({ personaje, actualizarPersonaje }: HistoriaProps) {
  // Función para manejar cambios en los campos
  const handleChange = (campo: string, valor: string) => {
    actualizarPersonaje({ [campo]: valor })
  }

  // Función para manejar cambios en los rasgos
  const handleRasgoChange = (index: number, valor: string) => {
    const nuevosRasgos = [...personaje.rasgos]
    nuevosRasgos[index] = valor
    actualizarPersonaje({ rasgos: nuevosRasgos })
  }

  // Función para agregar un nuevo rasgo
  const agregarRasgo = () => {
    const nuevosRasgos = [...personaje.rasgos, ""]
    actualizarPersonaje({ rasgos: nuevosRasgos })
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
              value={personaje.historia}
              onChange={(e) => handleChange("historia", e.target.value)}
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
                value={personaje.personalidad}
                onChange={(e) => handleChange("personalidad", e.target.value)}
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
                value={personaje.ideales}
                onChange={(e) => handleChange("ideales", e.target.value)}
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
                value={personaje.vinculos}
                onChange={(e) => handleChange("vinculos", e.target.value)}
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
                value={personaje.defectos}
                onChange={(e) => handleChange("defectos", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Rasgos y Habilidades Especiales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Agrega rasgos y habilidades especiales de tu personaje, como visión en la oscuridad, resistencia a
              elementos, etc.
            </p>

            {personaje.rasgos.map((rasgo: string, index: number) => (
              <Input
                key={index}
                placeholder={`Rasgo ${index + 1}`}
                value={rasgo}
                onChange={(e) => handleRasgoChange(index, e.target.value)}
              />
            ))}

            <button type="button" className="text-sm text-primary hover:underline" onClick={agregarRasgo}>
              + Agregar otro rasgo
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
