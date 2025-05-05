"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollText, Shield, Swords, BookOpen, Backpack } from "lucide-react"

interface ResumenProps {
  personaje: any
}

export function Resumen({ personaje }: ResumenProps) {
  // Función para calcular el modificador de atributo
  const calcularModificador = (valor: number) => {
    const mod = Math.floor((valor - 10) / 2)
    return mod >= 0 ? `+${mod}` : mod.toString()
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Resumen del Personaje</h3>
        <p className="text-sm text-muted-foreground">Revisa la información de tu personaje antes de guardar</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Columna izquierda - Información básica */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">{personaje.nombre || "Sin nombre"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
              <Image
                src={personaje.imagen || "/placeholder.svg"}
                alt={personaje.nombre || "Personaje"}
                fill
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <Badge className="justify-center">{personaje.raza || "Sin raza"}</Badge>
              <Badge className="justify-center">{personaje.clase || "Sin clase"}</Badge>
              <Badge variant="outline" className="justify-center">
                {personaje.trasfondo || "Sin trasfondo"}
              </Badge>
              <Badge variant="outline" className="justify-center">
                {personaje.alineamiento || "Sin alineamiento"}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Nivel {personaje.nivel}</span>
                <span className="text-sm text-muted-foreground">{personaje.experiencia} XP</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Columna central - Atributos y habilidades */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Atributos y Habilidades
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(personaje.atributos).map(([atributo, valor]) => (
                <div key={atributo} className="bg-muted rounded-lg p-2 text-center">
                  <div className="text-xs uppercase text-muted-foreground">
                    {atributo === "fuerza" && "FUE"}
                    {atributo === "destreza" && "DES"}
                    {atributo === "constitucion" && "CON"}
                    {atributo === "inteligencia" && "INT"}
                    {atributo === "sabiduria" && "SAB"}
                    {atributo === "carisma" && "CAR"}
                  </div>
                  <div className="text-lg font-bold">{valor}</div>
                  <div className="text-xs">{calcularModificador(valor as number)}</div>
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
                {personaje.habilidades
                  .filter((h: any) => h.competente)
                  .map((h: any) => (
                    <Badge key={h.nombre} variant="outline" className="text-xs">
                      {h.nombre}
                    </Badge>
                  ))}
                {personaje.habilidades.filter((h: any) => h.competente).length === 0 && (
                  <span className="text-xs text-muted-foreground">No se han seleccionado competencias</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Columna derecha - Equipamiento e historia */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Backpack className="h-5 w-5" />
              Equipamiento
            </CardTitle>
          </CardHeader>
          <CardContent>
            {personaje.equipamiento.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                <p className="text-sm">No hay equipamiento</p>
              </div>
            ) : (
              <ul className="text-sm space-y-1">
                {personaje.equipamiento.slice(0, 8).map((item: string, index: number) => (
                  <li key={index} className="py-1 border-b border-muted last:border-0">
                    {item}
                  </li>
                ))}
                {personaje.equipamiento.length > 8 && (
                  <li className="text-xs text-muted-foreground">Y {personaje.equipamiento.length - 8} items más...</li>
                )}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Historia y Trasfondo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {personaje.historia ? (
              <div>
                <h4 className="text-sm font-medium mb-1">Historia</h4>
                <p className="text-sm text-muted-foreground">
                  {personaje.historia.length > 200 ? `${personaje.historia.substring(0, 200)}...` : personaje.historia}
                </p>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No se ha agregado historia</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Personalidad</h4>
                <p className="text-sm text-muted-foreground">{personaje.personalidad || "No especificada"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Ideales</h4>
                <p className="text-sm text-muted-foreground">{personaje.ideales || "No especificados"}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Vínculos</h4>
                <p className="text-sm text-muted-foreground">{personaje.vinculos || "No especificados"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Defectos</h4>
                <p className="text-sm text-muted-foreground">{personaje.defectos || "No especificados"}</p>
              </div>
            </div>

            {personaje.rasgos.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-1">Rasgos Especiales</h4>
                <div className="flex flex-wrap gap-1">
                  {personaje.rasgos.map((rasgo: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {rasgo}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

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
    </div>
  )
}
