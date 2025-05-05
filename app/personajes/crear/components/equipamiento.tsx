"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2 } from "lucide-react"

// Datos de ejemplo para el equipamiento
const armas = [
  "Espada corta",
  "Espada larga",
  "Espada a dos manos",
  "Hacha de mano",
  "Hacha de batalla",
  "Maza",
  "Martillo de guerra",
  "Arco corto",
  "Arco largo",
  "Ballesta ligera",
  "Ballesta pesada",
  "Daga",
  "Lanza",
  "Bastón",
]

const armaduras = [
  "Acolchada",
  "Cuero",
  "Cuero tachonado",
  "Camisote de malla",
  "Cota de escamas",
  "Coraza",
  "Cota de malla",
  "Cota de placas",
  "Placas",
]

const objetosAventura = [
  "Mochila",
  "Saco de dormir",
  "Raciones (1 día)",
  "Cuerda (50 pies)",
  "Antorcha",
  "Cantimplora",
  "Kit de herramientas",
  "Kit de escalada",
  "Kit de curación",
  "Símbolo sagrado",
  "Foco arcano",
  "Componentes de hechizos",
  "Libro de hechizos",
  "Tinta y pluma",
  "Pergamino",
]

interface EquipamientoProps {
  personaje: any
  actualizarPersonaje: (datos: any) => void
}

export function Equipamiento({ personaje, actualizarPersonaje }: EquipamientoProps) {
  const [nuevoItem, setNuevoItem] = useState("")
  const [tipoItem, setTipoItem] = useState("arma")
  const [itemSeleccionado, setItemSeleccionado] = useState("")

  // Función para agregar un item al equipamiento
  const agregarItem = () => {
    if (itemSeleccionado) {
      const nuevosItems = [...personaje.equipamiento, itemSeleccionado]
      actualizarPersonaje({ equipamiento: nuevosItems })
      setItemSeleccionado("")
    } else if (nuevoItem.trim()) {
      const nuevosItems = [...personaje.equipamiento, nuevoItem.trim()]
      actualizarPersonaje({ equipamiento: nuevosItems })
      setNuevoItem("")
    }
  }

  // Función para eliminar un item del equipamiento
  const eliminarItem = (index: number) => {
    const nuevosItems = personaje.equipamiento.filter((_: any, i: number) => i !== index)
    actualizarPersonaje({ equipamiento: nuevosItems })
  }

  // Función para obtener la lista de items según el tipo
  const obtenerListaItems = () => {
    switch (tipoItem) {
      case "arma":
        return armas
      case "armadura":
        return armaduras
      case "objeto":
        return objetosAventura
      default:
        return []
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Equipamiento e Inventario</h3>
        <p className="text-sm text-muted-foreground">Agrega el equipamiento y los objetos que lleva tu personaje</p>
      </div>

      <Tabs defaultValue="agregar" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="agregar">Agregar Equipamiento</TabsTrigger>
          <TabsTrigger value="inventario">Inventario Actual</TabsTrigger>
        </TabsList>

        <TabsContent value="agregar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Seleccionar de la lista</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo-item">Tipo de Item</Label>
                  <Select value={tipoItem} onValueChange={setTipoItem}>
                    <SelectTrigger id="tipo-item">
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arma">Arma</SelectItem>
                      <SelectItem value="armadura">Armadura</SelectItem>
                      <SelectItem value="objeto">Objeto de Aventura</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="item-seleccionado">Item</Label>
                  <Select value={itemSeleccionado} onValueChange={setItemSeleccionado}>
                    <SelectTrigger id="item-seleccionado">
                      <SelectValue placeholder="Selecciona un item" />
                    </SelectTrigger>
                    <SelectContent>
                      {obtenerListaItems().map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={agregarItem} disabled={!itemSeleccionado}>
                <Plus className="mr-2 h-4 w-4" />
                Agregar Item Seleccionado
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Agregar Item Personalizado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Nombre del item..."
                  value={nuevoItem}
                  onChange={(e) => setNuevoItem(e.target.value)}
                />
                <Button onClick={agregarItem} disabled={!nuevoItem.trim()}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventario">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Inventario Actual</CardTitle>
            </CardHeader>
            <CardContent>
              {personaje.equipamiento.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No hay items en el inventario</p>
                  <p className="text-sm">Agrega equipamiento en la pestaña anterior</p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {personaje.equipamiento.map((item: string, index: number) => (
                    <li key={index} className="flex justify-between items-center p-2 bg-muted rounded-md">
                      <span>{item}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => eliminarItem(index)}
                        className="h-8 w-8 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
