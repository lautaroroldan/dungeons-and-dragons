import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"
import { Shield } from "lucide-react"
import { AttributeItem } from "./AttributeItem"
import { AttributesTable } from "@/db/schema"

interface AttributesSectionProps {
    attributes: AttributesTable
}

const attributeLabels = {
    strength: "Fuerza",
    dexterity: "Destreza",
    constitution: "Constitución",
    intelligence: "Inteligencia",
    wisdom: "Sabiduría",
    charisma: "Carisma"
} as const

export function AttributesSection({ attributes }: AttributesSectionProps) {
    const attributeEntries = Object.entries({
        strength: attributes.strength,
        dexterity: attributes.dexterity,
        constitution: attributes.constitution,
        intelligence: attributes.intelligence,
        wisdom: attributes.wisdom,
        charisma: attributes.charisma
    }) as Array<[keyof typeof attributeLabels, number]>

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Atributos
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    {attributeEntries.map(([attributeName, value]) => (
                        <AttributeItem
                            key={attributeName}
                            name={attributeName}
                            value={value}
                            label={attributeLabels[attributeName]}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
} 