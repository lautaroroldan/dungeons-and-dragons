"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Edit, MapPin, Users, Scroll, Sword } from "lucide-react"
import type { Location } from "../types"
import { getCategoryLabel, getTypeLabel } from "../utils/location-utils"

interface LocationDetailProps {
  location: Location
  onClose: () => void
}

export function LocationDetail({ location, onClose }: LocationDetailProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{location.name}</h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden">
        <Image
          src={location.image || "/placeholder.svg?height=300&width=600"}
          alt={location.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline" className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {getTypeLabel(location.type)}
        </Badge>
        <Badge>{getCategoryLabel(location.category)}</Badge>
        {location.faction && <Badge variant="secondary">{location.faction}</Badge>}
      </div>

      <Tabs defaultValue="descripcion" className="flex-1">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="descripcion" className="text-xs">
            Info
          </TabsTrigger>
          <TabsTrigger value="personajes" className="text-xs">
            Personajes
          </TabsTrigger>
          <TabsTrigger value="misiones" className="text-xs">
            Misiones
          </TabsTrigger>
          <TabsTrigger value="notas" className="text-xs">
            Notas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="descripcion" className="mt-0 flex-1">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">{location.description}</p>
            </div>

            {location.history && (
              <>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Scroll className="h-4 w-4" />
                    Historia
                  </h3>
                  <p className="text-sm text-muted-foreground">{location.history}</p>
                </div>
              </>
            )}

            {location.points_of_interest && location.points_of_interest.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium mb-2">Puntos de Interés</h3>
                  <ul className="space-y-2">
                    {location.points_of_interest.map((poi, index) => (
                      <li key={index} className="text-sm">
                        <span className="font-medium">{poi.name}:</span>{" "}
                        <span className="text-muted-foreground">{poi.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="personajes" className="mt-0">
          {location.npcs && location.npcs.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Personajes Importantes
              </h3>
              <ul className="space-y-3">
                {location.npcs.map((npc, index) => (
                  <li key={index} className="flex items-start gap-3 p-2 bg-muted rounded-md">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={npc.avatar || "/placeholder.svg?height=100&width=100"}
                        alt={npc.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{npc.name}</div>
                      <div className="text-xs text-muted-foreground">{npc.role}</div>
                      {npc.description && <div className="text-xs mt-1">{npc.description}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No hay personajes registrados</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="misiones" className="mt-0">
          {location.quests && location.quests.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Sword className="h-4 w-4" />
                Misiones Disponibles
              </h3>
              <ul className="space-y-3">
                {location.quests.map((quest, index) => (
                  <li key={index} className="p-2 bg-muted rounded-md">
                    <div className="flex justify-between items-start">
                      <div className="font-medium text-sm">{quest.title}</div>
                      <Badge variant="outline" className="text-xs">
                        Nivel {quest.level}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{quest.description}</div>
                    {quest.reward && (
                      <div className="text-xs mt-1">
                        <span className="font-medium">Recompensa:</span> {quest.reward}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Sword className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No hay misiones disponibles</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="notas" className="mt-0">
          {location.notes ? (
            <div className="space-y-4">
              <h3 className="text-sm font-medium mb-2">Notas del DM</h3>
              <div className="p-3 bg-muted rounded-md text-sm">
                <p className="text-muted-foreground">{location.notes}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Scroll className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No hay notas para esta ubicación</p>
              <p className="text-xs">Haz clic en el botón de editar para añadir notas</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
