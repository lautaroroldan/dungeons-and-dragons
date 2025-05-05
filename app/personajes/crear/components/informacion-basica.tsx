"use client"

import { useState } from "react"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Camera } from "lucide-react"

// Datos de ejemplo para las opciones
const razas = [
  "Humano",
  "Elfo",
  "Enano",
  "Mediano",
  "Gnomo",
  "Semielfo",
  "Semiorco",
  "Tiefling",
  "Dracónido",
  "Aasimar",
]

const clases = [
  "Bárbaro",
  "Bardo",
  "Brujo",
  "Clérigo",
  "Druida",
  "Explorador",
  "Guerrero",
  "Hechicero",
  "Mago",
  "Monje",
  "Paladín",
  "Pícaro",
]

const trasfondos = [
  "Acólito",
  "Artesano Gremial",
  "Artista",
  "Charlatán",
  "Criminal",
  "Ermitaño",
  "Héroe del Pueblo",
  "Huérfano",
  "Marinero",
  "Noble",
  "Sabio",
  "Soldado",
]

const alineamientos = [
  "Legal Bueno",
  "Neutral Bueno",
  "Caótico Bueno",
  "Legal Neutral",
  "Neutral",
  "Caótico Neutral",
  "Legal Maligno",
  "Neutral Maligno",
  "Caótico Maligno",
]

interface InformacionBasicaProps {
  personaje: any
  actualizarPersonaje: (datos: any) => void
}

export function InformacionBasica({ personaje, actualizarPersonaje }: InformacionBasicaProps) {
  const [avatarPreview, setAvatarPreview] = useState(personaje.imagen)

  // Función para manejar cambios en los campos
  const handleChange = (campo: string, valor: any) => {
    actualizarPersonaje({ [campo]: valor })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre del Personaje</Label>
            <Input
              id="nombre"
              value={personaje.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              placeholder="Ej. Thorian Martillo de Piedra"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="raza">Raza</Label>
              <Select value={personaje.raza} onValueChange={(value) => handleChange("raza", value)}>
                <SelectTrigger id="raza">
                  <SelectValue placeholder="Selecciona una raza" />
                </SelectTrigger>
                <SelectContent>
                  {razas.map((raza) => (
                    <SelectItem key={raza} value={raza}>
                      {raza}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="clase">Clase</Label>
              <Select value={personaje.clase} onValueChange={(value) => handleChange("clase", value)}>
                <SelectTrigger id="clase">
                  <SelectValue placeholder="Selecciona una clase" />
                </SelectTrigger>
                <SelectContent>
                  {clases.map((clase) => (
                    <SelectItem key={clase} value={clase}>
                      {clase}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nivel">Nivel</Label>
              <Select
                value={personaje.nivel.toString()}
                onValueChange={(value) => handleChange("nivel", Number.parseInt(value))}
              >
                <SelectTrigger id="nivel">
                  <SelectValue placeholder="Selecciona un nivel" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((nivel) => (
                    <SelectItem key={nivel} value={nivel.toString()}>
                      {nivel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experiencia">Experiencia</Label>
              <Input
                id="experiencia"
                type="number"
                value={personaje.experiencia}
                onChange={(e) => handleChange("experiencia", Number.parseInt(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="trasfondo">Trasfondo</Label>
              <Select value={personaje.trasfondo} onValueChange={(value) => handleChange("trasfondo", value)}>
                <SelectTrigger id="trasfondo">
                  <SelectValue placeholder="Selecciona un trasfondo" />
                </SelectTrigger>
                <SelectContent>
                  {trasfondos.map((trasfondo) => (
                    <SelectItem key={trasfondo} value={trasfondo}>
                      {trasfondo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="alineamiento">Alineamiento</Label>
              <Select value={personaje.alineamiento} onValueChange={(value) => handleChange("alineamiento", value)}>
                <SelectTrigger id="alineamiento">
                  <SelectValue placeholder="Selecciona un alineamiento" />
                </SelectTrigger>
                <SelectContent>
                  {alineamientos.map((alineamiento) => (
                    <SelectItem key={alineamiento} value={alineamiento}>
                      {alineamiento}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <div className="text-center mb-4">
              <h3 className="font-medium">Avatar del Personaje</h3>
              <p className="text-sm text-muted-foreground">Sube una imagen para tu personaje</p>
            </div>

            <div className="relative w-48 h-48 mb-4">
              <Image
                src={avatarPreview || "/placeholder.svg"}
                alt="Avatar del personaje"
                fill
                className="object-cover rounded-lg border"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                <div className="text-white text-center">
                  <Camera className="mx-auto h-8 w-8 mb-2" />
                  <span className="text-sm">Cambiar imagen</span>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>Formatos aceptados: JPG, PNG</p>
              <p>Tamaño máximo: 2MB</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
