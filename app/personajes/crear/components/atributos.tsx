"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dice6, RefreshCw } from "lucide-react"
import { Slider } from "@/components/ui/slider"

interface AtributosProps {
  personaje: any
  actualizarPersonaje: (datos: any) => void
}

export function Atributos({ personaje, actualizarPersonaje }: AtributosProps) {
  const [puntosDisponibles, setPuntosDisponibles] = useState(27) // Sistema de puntos estándar
  const [valoresOriginales, setValoresOriginales] = useState({ ...personaje.atributos })

  // Función para calcular el costo de puntos
  const calcularCostoPuntos = (valor: number) => {
    if (valor <= 13) return valor - 8
    if (valor === 14) return 7
    if (valor === 15) return 9
    return 0 // No debería llegar aquí
  }

  // Función para calcular el modificador de atributo
  const calcularModificador = (valor: number) => {
    const mod = Math.floor((valor - 10) / 2)
    return mod >= 0 ? `+${mod}` : mod.toString()
  }

  // Función para manejar cambios en los atributos
  const handleAtributoChange = (atributo: string, nuevoValor: number) => {
    const valorActual = personaje.atributos[atributo]

    // Calcular la diferencia en puntos
    const costoActual = calcularCostoPuntos(valorActual)
    const costoNuevo = calcularCostoPuntos(nuevoValor)
    const diferencia = costoNuevo - costoActual

    // Verificar si hay suficientes puntos disponibles
    if (puntosDisponibles - diferencia < 0) return

    // Actualizar el atributo y los puntos disponibles
    const nuevosAtributos = {
      ...personaje.atributos,
      [atributo]: nuevoValor,
    }

    actualizarPersonaje({ atributos: nuevosAtributos })
    setPuntosDisponibles(puntosDisponibles - diferencia)
  }

  // Función para tirar dados aleatoriamente (4d6, descartar el menor)
  const tirarDados = () => {
    const nuevosAtributos = { ...personaje.atributos }

    Object.keys(nuevosAtributos).forEach((atributo) => {
      // Tirar 4d6
      const dados = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1)
      // Ordenar y descartar el menor
      dados.sort((a, b) => b - a)
      const suma = dados.slice(0, 3).reduce((acc, val) => acc + val, 0)
      nuevosAtributos[atributo] = suma
    })

    actualizarPersonaje({ atributos: nuevosAtributos })
    setValoresOriginales(nuevosAtributos)
    setPuntosDisponibles(0) // Ya no usamos puntos al tirar dados
  }

  // Función para resetear a los valores predeterminados
  const resetearAtributos = () => {
    actualizarPersonaje({
      atributos: {
        fuerza: 10,
        destreza: 10,
        constitucion: 10,
        inteligencia: 10,
        sabiduria: 10,
        carisma: 10,
      },
    })
    setPuntosDisponibles(27)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Atributos del Personaje</h3>
          <p className="text-sm text-muted-foreground">Asigna valores a los atributos de tu personaje</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={resetearAtributos}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Resetear
          </Button>
          <Button variant="secondary" size="sm" onClick={tirarDados}>
            <Dice6 className="mr-2 h-4 w-4" />
            Tirar Dados
          </Button>
        </div>
      </div>

      {puntosDisponibles > 0 && (
        <div className="bg-muted p-3 rounded-lg text-center">
          <p className="text-sm">
            Puntos disponibles: <span className="font-bold">{puntosDisponibles}</span>
          </p>
          <p className="text-xs text-muted-foreground">Usa el sistema de puntos para asignar valores entre 8 y 15</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(personaje.atributos).map(([atributo, valor]) => (
          <Card key={atributo}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor={atributo} className="text-base capitalize">
                  {atributo === "fuerza" && "Fuerza"}
                  {atributo === "destreza" && "Destreza"}
                  {atributo === "constitucion" && "Constitución"}
                  {atributo === "inteligencia" && "Inteligencia"}
                  {atributo === "sabiduria" && "Sabiduría"}
                  {atributo === "carisma" && "Carisma"}
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{valor}</span>
                  <span className="text-sm text-muted-foreground">({calcularModificador(valor as number)})</span>
                </div>
              </div>

              {puntosDisponibles > 0 ? (
                <Slider
                  id={atributo}
                  min={8}
                  max={15}
                  step={1}
                  value={[valor as number]}
                  onValueChange={(values) => handleAtributoChange(atributo, values[0])}
                />
              ) : (
                <div className="h-5 bg-muted rounded-full relative">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${((valor as number) / 20) * 100}%` }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
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
