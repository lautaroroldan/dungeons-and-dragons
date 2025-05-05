"use client"

import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface HabilidadesProps {
  personaje: any
  actualizarPersonaje: (datos: any) => void
}

export function Habilidades({ personaje, actualizarPersonaje }: HabilidadesProps) {
  const [competenciasDisponibles, setCompetenciasDisponibles] = useState(2) // Por defecto
  const [bonusCompetencia, setBonusCompetencia] = useState(2) // Por defecto para nivel 1

  // Calcular el bonus de competencia basado en el nivel
  useEffect(() => {
    const nivel = personaje.nivel
    let bonus = 2
    if (nivel >= 5) bonus = 3
    if (nivel >= 9) bonus = 4
    if (nivel >= 13) bonus = 5
    if (nivel >= 17) bonus = 6
    setBonusCompetencia(bonus)
  }, [personaje.nivel])

  // Calcular el número de competencias disponibles basado en la clase
  useEffect(() => {
    const clase = personaje.clase
    let competencias = 2 // Por defecto

    // Ajustar según la clase
    if (clase === "Pícaro") competencias = 4
    else if (["Bardo", "Explorador"].includes(clase)) competencias = 3
    else if (["Guerrero", "Paladín", "Bárbaro", "Monje"].includes(clase)) competencias = 2
    else competencias = 2

    setCompetenciasDisponibles(competencias)
  }, [personaje.clase])

  // Calcular el modificador de atributo
  const calcularModificador = (valor: number) => {
    return Math.floor((valor - 10) / 2)
  }

  // Obtener el atributo asociado a una habilidad
  const obtenerAtributoHabilidad = (habilidad: string) => {
    const mapeoHabilidades: Record<string, string> = {
      Acrobacias: "destreza",
      Arcanos: "inteligencia",
      Atletismo: "fuerza",
      Engaño: "carisma",
      Historia: "inteligencia",
      Interpretación: "carisma",
      Intimidación: "carisma",
      Investigación: "inteligencia",
      "Juego de Manos": "destreza",
      Medicina: "sabiduria",
      Naturaleza: "inteligencia",
      Percepción: "sabiduria",
      Perspicacia: "sabiduria",
      Persuasión: "carisma",
      Religión: "inteligencia",
      Sigilo: "destreza",
      Supervivencia: "sabiduria",
      "Trato con Animales": "sabiduria",
    }

    return mapeoHabilidades[habilidad] || "destreza"
  }

  // Función para manejar cambios en las competencias
  const toggleCompetencia = (index: number) => {
    const nuevasHabilidades = [...personaje.habilidades]
    const habilidad = nuevasHabilidades[index]

    // Contar cuántas competencias están seleccionadas actualmente
    const competenciasSeleccionadas = nuevasHabilidades.filter((h) => h.competente).length

    // Si estamos intentando deseleccionar, siempre permitirlo
    if (habilidad.competente) {
      nuevasHabilidades[index] = { ...habilidad, competente: false }
    }
    // Si estamos intentando seleccionar, verificar si hay competencias disponibles
    else if (competenciasSeleccionadas < competenciasDisponibles) {
      nuevasHabilidades[index] = { ...habilidad, competente: true }
    }
    // Si no hay competencias disponibles, no hacer nada
    else {
      return
    }

    // Actualizar los valores de las habilidades
    nuevasHabilidades.forEach((h) => {
      const atributo = obtenerAtributoHabilidad(h.nombre)
      const modAtributo = calcularModificador(personaje.atributos[atributo])
      h.valor = modAtributo + (h.competente ? bonusCompetencia : 0)
    })

    actualizarPersonaje({ habilidades: nuevasHabilidades })
  }

  // Agrupar habilidades por atributo
  const habilidadesPorAtributo: Record<string, any[]> = {
    fuerza: [],
    destreza: [],
    inteligencia: [],
    sabiduria: [],
    carisma: [],
  }

  personaje.habilidades.forEach((habilidad: any, index: number) => {
    const atributo = obtenerAtributoHabilidad(habilidad.nombre)
    habilidadesPorAtributo[atributo].push({ ...habilidad, index })
  })

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Habilidades y Competencias</h3>
        <p className="text-sm text-muted-foreground">Selecciona en qué habilidades tu personaje es competente</p>
      </div>

      <div className="bg-muted p-3 rounded-lg flex justify-between items-center">
        <div>
          <p className="text-sm">
            Competencias disponibles: <span className="font-bold">{competenciasDisponibles}</span>
          </p>
          <p className="text-xs text-muted-foreground">Basado en tu clase: {personaje.clase || "No seleccionada"}</p>
        </div>
        <Badge>Bonus de Competencia: +{bonusCompetencia}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(habilidadesPorAtributo).map(([atributo, habilidades]) => (
          <Card key={atributo}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <h4 className="font-medium capitalize">
                  {atributo === "fuerza" && "Fuerza"}
                  {atributo === "destreza" && "Destreza"}
                  {atributo === "constitucion" && "Constitución"}
                  {atributo === "inteligencia" && "Inteligencia"}
                  {atributo === "sabiduria" && "Sabiduría"}
                  {atributo === "carisma" && "Carisma"}
                </h4>
                <Badge variant="outline">
                  {calcularModificador(personaje.atributos[atributo]) >= 0 ? "+" : ""}
                  {calcularModificador(personaje.atributos[atributo])}
                </Badge>
              </div>

              <div className="space-y-2">
                {habilidades.map((habilidad) => (
                  <div key={habilidad.index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`habilidad-${habilidad.index}`}
                      checked={habilidad.competente}
                      onCheckedChange={() => toggleCompetencia(habilidad.index)}
                    />
                    <Label
                      htmlFor={`habilidad-${habilidad.index}`}
                      className="flex justify-between items-center w-full cursor-pointer"
                    >
                      <span>{habilidad.nombre}</span>
                      <Badge variant={habilidad.competente ? "default" : "outline"}>
                        {habilidad.valor >= 0 ? "+" : ""}
                        {habilidad.valor}
                      </Badge>
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
