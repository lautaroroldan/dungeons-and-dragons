import { Card, CardHeader, CardTitle, CardContent } from "@shared/components/ui/card"
import { CompleteCharacterFormType } from "@/lib/validations/character"
import { Backpack } from "lucide-react"
import Image from "next/image"
import { UseFormReturn, useWatch } from "react-hook-form"

const MAX_EQUIPMENT_DISPLAY = 8


interface EquipmentCardProps {
    form: UseFormReturn<CompleteCharacterFormType>
}

export function EquipmentCard({ form }: EquipmentCardProps) {

    const equipment = useWatch({
        control: form.control,
        name: "equipment",
        defaultValue: []
    })

    const displayEquipment = equipment?.slice(0, MAX_EQUIPMENT_DISPLAY)

    const remainingCount = equipment?.length - MAX_EQUIPMENT_DISPLAY

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                    <Backpack className="h-5 w-5" />
                    Equipamiento
                </CardTitle>
            </CardHeader>
            <CardContent>
                {equipment?.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                        <p className="text-sm">No hay equipamiento</p>
                    </div>
                ) : (
                    <ul className="text-sm space-y-1">
                        {displayEquipment.map((item, index) => (
                            <li key={index} className="py-1 border-b border-muted last:border-0 flex items-center gap-2">
                                <Image
                                    unoptimized
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    width={16}
                                    height={16}
                                />
                                {item.name}
                            </li>
                        ))}
                        {remainingCount > 0 && (
                            <li className="text-xs text-muted-foreground">
                                Y {remainingCount} items más...
                            </li>
                        )}
                    </ul>
                )}
            </CardContent>
        </Card>
    )
}