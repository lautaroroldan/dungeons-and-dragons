import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Equipment } from "@/stores/useCharacterStore"
import { Package, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const InventoryDisplay = ({
    equipment,
    equipmentByType,
    onRemove
}: {
    equipment: Equipment[]
    equipmentByType: Record<string, Equipment[]>
    onRemove: (index: number) => void
}) => {
    if (!equipment || equipment.length === 0) {
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
                            {items?.map((item, index) => (
                                <div
                                    key={item.name}
                                    className="flex justify-between items-center p-3 bg-muted rounded-lg"
                                >
                                    <span className="font-medium">{item.name}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onRemove(index)}
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