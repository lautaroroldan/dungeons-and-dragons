import { useState } from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Package, Plus } from "lucide-react"
import { Equipment } from "@/stores/useCharacterStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const AddCustomEquipment = ({ onAdd }: { onAdd: (item: Equipment) => void }) => {
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
                <CardTitle className="text-base flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Equipamiento Personalizado
                </CardTitle>
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