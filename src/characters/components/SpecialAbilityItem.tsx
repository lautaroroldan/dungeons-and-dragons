import { Badge } from "@shared/components/ui/badge"

interface SpecialAbilityItemProps {
    id: number
    name: string
    description?: string | null
    type: string
    level?: number | null
    source?: string | null
}

export function SpecialAbilityItem({
    id,
    name,
    description,
    type,
    level,
    source
}: SpecialAbilityItemProps) {
    return (
        <div className="p-3 border rounded-lg space-y-2">
            <div className="flex items-start justify-between">
                <h4 className="font-medium text-sm">{name}</h4>
                <div className="flex gap-1">
                    <Badge variant="outline" className="text-xs">
                        {type}
                    </Badge>
                    {level && (
                        <Badge variant="secondary" className="text-xs">
                            Nv. {level}
                        </Badge>
                    )}
                </div>
            </div>

            {description && (
                <p className="text-xs text-muted-foreground leading-relaxed">
                    {description}
                </p>
            )}

            {source && (
                <p className="text-xs text-muted-foreground font-medium">
                    Fuente: {source}
                </p>
            )}
        </div>
    )
} 