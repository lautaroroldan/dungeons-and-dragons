"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { getCategoryLabel } from "../utils/location-utils"

interface MapLegendProps {
  visibleCategories: Record<string, boolean>
  toggleCategory: (category: string) => void
}

export function MapLegend({ visibleCategories, toggleCategory }: MapLegendProps) {
  const categories = [
    { id: "ciudad", color: "bg-sky-500" },
    { id: "pueblo", color: "bg-lime-500" },
    { id: "mazmorra", color: "bg-red-500" },
    { id: "punto_interes", color: "bg-violet-500" },
    { id: "ruina", color: "bg-amber-500" },
  ]

  return (
    <Card className="w-64 shadow-lg">
      <CardContent className="p-3">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium">Leyenda del Mapa</h3>
        </div>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={visibleCategories[category.id]}
                onCheckedChange={() => toggleCategory(category.id)}
              />
              <div className={`w-3 h-3 rounded-full ${category.color}`} />
              <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer flex-1">
                {getCategoryLabel(category.id)}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
