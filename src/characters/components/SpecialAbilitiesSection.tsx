import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"
import { Zap } from "lucide-react"
import { SpecialAbilityItem } from "./SpecialAbilityItem"

interface SpecialAbility {
    id: number
    name: string
    description?: string | null
    type: string
    level?: number | null
    source?: string | null
}

interface SpecialAbilitiesSectionProps {
    specialAbilities: SpecialAbility[]
}

export function SpecialAbilitiesSection({ specialAbilities }: SpecialAbilitiesSectionProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Habilidades Especiales
                </CardTitle>
            </CardHeader>
            <CardContent>
                {specialAbilities.length > 0 ? (
                    <div className="space-y-3">
                        {specialAbilities.map((ability) => (
                            <SpecialAbilityItem
                                key={ability.id}
                                id={ability.id}
                                name={ability.name}
                                description={ability.description}
                                type={ability.type}
                                level={ability.level}
                                source={ability.source}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-4">
                        <p className="text-muted-foreground text-sm">
                            No tiene habilidades especiales registradas
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
} 