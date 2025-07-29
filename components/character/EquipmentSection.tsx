import { Equipment } from "@/stores/useCharacterStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EquipmentItem } from "@/components/character/EquipmentItem"

interface CharacterEquipment {
    id: number
    quantity: number
    isEquipped: number
    equipment: Equipment
}

interface EquipmentSectionProps {
    equipment: CharacterEquipment[]
}

export function EquipmentSection({ equipment }: EquipmentSectionProps) {
    const categorizedEquipment = equipment.reduce(
        (acc, item) => {
            const type = item.equipment.type.toLowerCase()

            if (type.includes('armas') || type.includes('weapon')) {
                acc.weapons.push(item)
            } else if (
                type.includes('armaduras') ||
                type.includes('armor') ||
                type.includes('escudo') ||
                type.includes('shield')
            ) {
                acc.armor.push(item)
            } else {
                acc.otherItems.push(item)
            }

            return acc
        },
        {
            weapons: [] as CharacterEquipment[],
            armor: [] as CharacterEquipment[],
            otherItems: [] as CharacterEquipment[]
        }
    )

    const { weapons, armor, otherItems } = categorizedEquipment

    const isEquipped = (item: CharacterEquipment) => {
        return item.isEquipped === 1
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Equipamiento e Inventario</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {weapons.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Armas</h3>
                            <div className="space-y-3">
                                {weapons.map((item) => (
                                    <EquipmentItem
                                        key={item.id}
                                        id={item.id}
                                        equipment={item.equipment}
                                        quantity={item.quantity}
                                        isEquipped={item.isEquipped}
                                        layout="horizontal"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {armor.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Armadura y Protección</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {armor.map((item) => (
                                    <EquipmentItem
                                        key={item.id}
                                        id={item.id}
                                        equipment={item.equipment}
                                        quantity={item.quantity}
                                        isEquipped={item.isEquipped}
                                        layout="vertical"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {otherItems.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Inventario</h3>
                            <div className="bg-muted p-3 rounded-lg">
                                <div className="space-y-2">
                                    {otherItems.map((item) => (
                                        <EquipmentItem
                                            key={item.id}
                                            id={item.id}
                                            equipment={item.equipment}
                                            quantity={item.quantity}
                                            isEquipped={item.isEquipped}
                                            layout="compact"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {equipment.length === 0 && (
                        <div className="text-center py-8">
                            <div className="text-muted-foreground">
                                <p className="text-lg mb-2">No hay equipamiento registrado</p>
                                <p className="text-sm">Este personaje no tiene objetos en su inventario</p>
                            </div>
                        </div>
                    )}

                    {equipment.length > 0 && (
                        <div className="border-t pt-4">
                            <h4 className="text-sm font-semibold mb-2">Resumen</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                                <div className="bg-background p-2 rounded text-center">
                                    <div className="font-medium">{equipment.length}</div>
                                    <div className="text-muted-foreground text-xs">Total objetos</div>
                                </div>
                                <div className="bg-background p-2 rounded text-center">
                                    <div className="font-medium">
                                        {equipment.filter(item => isEquipped(item)).length}
                                    </div>
                                    <div className="text-muted-foreground text-xs">Equipados</div>
                                </div>
                                <div className="bg-background p-2 rounded text-center">
                                    <div className="font-medium">{weapons.length}</div>
                                    <div className="text-muted-foreground text-xs">Armas</div>
                                </div>
                                <div className="bg-background p-2 rounded text-center">
                                    <div className="font-medium">{armor.length}</div>
                                    <div className="text-muted-foreground text-xs">Protección</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
} 