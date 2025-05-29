"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Shield, Sword, Package } from "lucide-react"
import { Equipment, useCharacterStore } from "@/app/stores/useCharacterStore"
import { useEquipmentManager } from "@/hooks/useEquipmentManager"

// Tipos
type EquipmentType = "weapon" | "armor" | "object" | "custom"

interface EquipmentCategory {
  id: EquipmentType
  name: string
  icon: React.ReactNode
  items: string[]
}

// Constantes de equipamiento organizadas
const EQUIPMENT_CATEGORIES: EquipmentCategory[] = [
  {
    id: "weapon",
    name: "Armas",
    icon: <Sword className="h-4 w-4" />,
    items: [
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
  },
  {
    id: "armor",
    name: "Armaduras",
    icon: <Shield className="h-4 w-4" />,
    items: [
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
  },
  {
    id: "object",
    name: "Objetos de Aventura",
    icon: <Package className="h-4 w-4" />,
    items: [
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
  }
]


// Componente para agregar equipamiento predefinido
const AddPredefinedEquipment = ({ onAdd }: { onAdd: (item: Equipment) => void }) => {
  const [selectedCategory, setSelectedCategory] = useState<EquipmentType>("weapon")
  const [selectedItem, setSelectedItem] = useState("")

  const currentCategory = EQUIPMENT_CATEGORIES.find(cat => cat.id === selectedCategory)

  const handleAdd = () => {
    if (selectedItem && currentCategory) {
      onAdd({
        name: selectedItem,
        type: currentCategory.name,
        image: ''
      })
      setSelectedItem("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          {currentCategory?.icon}
          Equipamiento Predefinido
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Categoría</Label>
            <Select
              value={selectedCategory}
              onValueChange={(value) => {
                setSelectedCategory(value as EquipmentType)
                setSelectedItem("")
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EQUIPMENT_CATEGORIES.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center gap-2">
                      {category.icon}
                      {category.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Objeto</Label>
            <Select value={selectedItem} onValueChange={setSelectedItem}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un objeto" />
              </SelectTrigger>
              <SelectContent>
                {currentCategory?.items.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleAdd} disabled={!selectedItem} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Agregar {currentCategory?.name.slice(0, -1)}
        </Button>
      </CardContent>
    </Card>
  )
}

// Componente para agregar equipamiento personalizado
const AddCustomEquipment = ({ onAdd }: { onAdd: (item: Equipment) => void }) => {
  const [itemName, setItemName] = useState("")
  const [itemType, setItemType] = useState("")

  const handleAdd = () => {
    if (itemName.trim() && itemType.trim()) {
      onAdd({
        name: itemName.trim(),
        type: itemType.trim(),
        image: ''
      })
      setItemName("")
      setItemType("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Equipamiento Personalizado</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="item-name">Nombre del Objeto</Label>
            <Input
              id="item-name"
              placeholder="Ej: Anillo mágico"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="item-type">Tipo</Label>
            <Input
              id="item-type"
              placeholder="Ej: Accesorio mágico"
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
            />
          </div>
        </div>

        <Button
          onClick={handleAdd}
          disabled={!itemName.trim() || !itemType.trim()}
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Agregar Objeto Personalizado
        </Button>
      </CardContent>
    </Card>
  )
}

// Componente para mostrar el inventario
const InventoryDisplay = ({
  equipment,
  equipmentByType,
  onRemove
}: {
  equipment: Equipment[]
  equipmentByType: Record<string, (Equipment & { index: number })[]>
  onRemove: (index: number) => void
}) => {
  if (equipment.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-muted-foreground">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Inventario vacío</p>
            <p className="text-sm">Agrega equipamiento en la pestaña "Agregar"</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {Object.entries(equipmentByType).map(([type, items]) => (
        <Card key={type}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{type}</CardTitle>
              <Badge variant="secondary">{items.length} objeto(s)</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.index}
                  className="flex justify-between items-center p-3 bg-muted rounded-lg"
                >
                  <span className="font-medium">{item.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(item.index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Componente principal
export function AddCharacterEquipment() {
  const { equipment, addEquipment, removeEquipment, equipmentByType, totalItems } = useEquipmentManager()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">Equipamiento e Inventario</h3>
          <p className="text-sm text-muted-foreground">
            Agrega el equipamiento y los objetos que lleva tu personaje
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {totalItems} objeto(s) total
        </Badge>
      </div>

      <Tabs defaultValue="agregar" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="agregar">Agregar Equipamiento</TabsTrigger>
          <TabsTrigger value="inventario">
            Inventario {totalItems > 0 && `(${totalItems})`}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="agregar" className="space-y-6">
          <AddPredefinedEquipment onAdd={addEquipment} />
          <AddCustomEquipment onAdd={addEquipment} />
        </TabsContent>

        <TabsContent value="inventario">
          <InventoryDisplay
            equipment={equipment}
            equipmentByType={equipmentByType}
            onRemove={removeEquipment}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
