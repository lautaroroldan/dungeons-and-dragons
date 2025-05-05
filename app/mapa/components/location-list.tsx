"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, Filter } from "lucide-react"
import type { Location } from "../types"
import { getCategoryLabel, getTypeLabel } from "../utils/location-utils"

interface LocationListProps {
  locations: Location[]
  onLocationSelect: (locationId: string) => void
  selectedLocation: string | null
  visibleCategories: Record<string, boolean>
  toggleCategory: (category: string) => void
}

export function LocationList({
  locations,
  onLocationSelect,
  selectedLocation,
  visibleCategories,
  toggleCategory,
}: LocationListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Filtrar ubicaciones por término de búsqueda y categorías visibles
  const filteredLocations = locations.filter(
    (location) =>
      visibleCategories[location.category] &&
      (location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getTypeLabel(location.type).toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Agrupar ubicaciones por categoría
  const groupedLocations: Record<string, Location[]> = {}
  filteredLocations.forEach((location) => {
    if (!groupedLocations[location.category]) {
      groupedLocations[location.category] = []
    }
    groupedLocations[location.category].push(location)
  })

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Ubicaciones</h2>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar ubicación..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className={showFilters ? "bg-muted" : ""}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-4 p-3 bg-muted rounded-md">
          <h3 className="text-sm font-medium mb-2">Filtrar por tipo</h3>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={visibleCategories.ciudad ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleCategory("ciudad")}
            >
              Ciudades
            </Badge>
            <Badge
              variant={visibleCategories.pueblo ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleCategory("pueblo")}
            >
              Pueblos
            </Badge>
            <Badge
              variant={visibleCategories.mazmorra ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleCategory("mazmorra")}
            >
              Mazmorras
            </Badge>
            <Badge
              variant={visibleCategories.punto_interes ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleCategory("punto_interes")}
            >
              Puntos de Interés
            </Badge>
            <Badge
              variant={visibleCategories.ruina ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleCategory("ruina")}
            >
              Ruinas
            </Badge>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-4">
        {Object.keys(groupedLocations).length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No se encontraron ubicaciones</p>
            <p className="text-xs">Intenta con otros términos de búsqueda o filtros</p>
          </div>
        ) : (
          Object.entries(groupedLocations).map(([category, locs]) => (
            <div key={category}>
              <h3 className="text-sm font-medium mb-2">{getCategoryLabel(category)}</h3>
              <ul className="space-y-1">
                {locs.map((location) => (
                  <li
                    key={location.id}
                    className={`p-2 rounded-md cursor-pointer hover:bg-muted ${
                      selectedLocation === location.id ? "bg-muted" : ""
                    }`}
                    onClick={() => onLocationSelect(location.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{location.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(location.type)}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
              <Separator className="my-3" />
            </div>
          ))
        )}
      </div>
    </div>
  )
}
