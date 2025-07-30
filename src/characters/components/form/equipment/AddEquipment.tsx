import { Card, CardHeader, CardTitle, CardContent } from "@shared/components/ui/card"
import { EQUIPMENT_CATEGORIES } from "@characters/utils/equipment"
import { EquipmentType } from "@/db/schema"
import { Equipment } from "@/stores/useCharacterStore"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@shared/components/ui/select"
import { Plus } from "lucide-react"
import { useState } from "react"
import { Button } from "@shared/components/ui/button"
import { Label } from "@shared/components/ui/label"


export const AddEquipment = ({ onAdd }: { onAdd: (item: Equipment) => void }) => {
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
                    {currentCategory?.icon && <currentCategory.icon className="h-4 w-4" />}
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
                                            {category.icon && <category.icon className="h-4 w-4" />}
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

                <Button onClick={handleAdd} disabled={!selectedItem} className="w-full" type="button">
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar {currentCategory?.name.slice(0, -1)}
                </Button>
            </CardContent>
        </Card>
    )
}