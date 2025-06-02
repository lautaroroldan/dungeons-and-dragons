import { Badge } from "@/components/ui/badge"
import { Equipment } from "@/stores/useCharacterStore"

interface EquipmentItemProps {
    id: number
    equipment: Equipment
    quantity: number
    isEquipped: number
    layout?: 'horizontal' | 'vertical' | 'compact'
}

export function EquipmentItem({
    id,
    equipment,
    quantity,
    isEquipped,
    layout = 'horizontal'
}: EquipmentItemProps) {
    const isItemEquipped = isEquipped === 1

    if (layout === 'compact') {
        return (
            <div className="flex justify-between items-center py-2 border-b border-background last:border-0">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{equipment.name}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">x{quantity}</span>
                    {isItemEquipped && (
                        <Badge variant="secondary" className="text-xs">
                            En uso
                        </Badge>
                    )}
                </div>
            </div>
        )
    }

    if (layout === 'vertical') {
        return (
            <div className="bg-muted p-3 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{equipment.name}</div>
                    {isItemEquipped && (
                        <Badge variant="default" className="text-xs">
                            Equipado
                        </Badge>
                    )}
                </div>
                <div className="text-sm text-muted-foreground">
                    {equipment.type} • Cantidad: {quantity}
                </div>
            </div>
        )
    }

    return (
        <div className="bg-muted p-3 rounded-lg">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="font-medium">{equipment.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                        {equipment.type} • Cantidad: {quantity}
                    </div>
                </div>
                <div className="flex gap-2">
                    {isItemEquipped && (
                        <Badge variant="default" className="text-xs">
                            Equipado
                        </Badge>
                    )}
                </div>
            </div>
        </div>
    )
} 