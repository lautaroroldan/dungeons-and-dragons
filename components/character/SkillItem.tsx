import { Badge } from "@/components/ui/badge"

interface Skill {
    id: number
    name: string
    attribute: string
}

interface SkillItemProps {
    id: number
    value: number
    proficient: boolean
    skill: Skill
}

export function SkillItem({ id, value, proficient, skill }: SkillItemProps) {
    return (
        <div className="flex items-center justify-between p-2 rounded-lg border">
            <div className="flex items-center gap-2">
                {proficient && <div className="w-2 h-2 rounded-full bg-primary" />}
                <span className="text-sm font-medium">{skill.name}</span>
                <Badge variant="outline" className="text-xs">
                    {skill.attribute}
                </Badge>
            </div>
            <Badge variant={proficient ? "default" : "outline"}>
                +{value}
            </Badge>
        </div>
    )
} 