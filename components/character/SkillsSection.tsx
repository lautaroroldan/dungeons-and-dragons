import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Heart } from "lucide-react"
import { SkillItem } from "./SkillItem"
import { AttributesTable } from "@/db/schema"

interface Skill {
    id: number
    name: string
    attribute: string
}

interface CharacterSkill {
    id: number
    value: number
    proficient: boolean
    skill: Skill
}

interface SkillsSectionProps {
    skills: CharacterSkill[]
    attributes: AttributesTable
}

export function SkillsSection({ skills, attributes }: SkillsSectionProps) {
    // Función para calcular el modificador de atributo
    const calcularModificador = (valor: number): string => {
        const mod = Math.floor((valor - 10) / 2)
        return mod >= 0 ? `+${mod}` : mod.toString()
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Habilidades y Competencias</CardTitle>
            </CardHeader>
            <CardContent>
                {skills.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {skills.map(({ id, value, proficient, skill }) => (
                            <SkillItem
                                key={id}
                                id={id}
                                value={value}
                                proficient={proficient}
                                skill={skill}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-4 mb-6">
                        <p className="text-muted-foreground">No tiene habilidades registradas</p>
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Estado</h3>
                        <div className="flex items-center gap-2 mb-2">
                            <Heart className="h-5 w-5 text-red-500" />
                            <span className="font-medium">Puntos de Vida: 68/80</span>
                        </div>
                        <Progress value={85} className="h-3" />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div className="bg-muted p-3 rounded-lg text-center">
                            <div className="text-xs text-muted-foreground">Clase de Armadura</div>
                            <div className="text-xl font-bold">
                                {10 + parseInt(calcularModificador(attributes.dexterity))}
                            </div>
                        </div>
                        <div className="bg-muted p-3 rounded-lg text-center">
                            <div className="text-xs text-muted-foreground">Iniciativa</div>
                            <div className="text-xl font-bold">
                                {calcularModificador(attributes.dexterity)}
                            </div>
                        </div>
                        <div className="bg-muted p-3 rounded-lg text-center">
                            <div className="text-xs text-muted-foreground">Velocidad</div>
                            <div className="text-xl font-bold">30 ft</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 