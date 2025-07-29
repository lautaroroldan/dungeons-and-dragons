import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { UseFormReturn, useWatch } from "react-hook-form"
import { CompleteCharacterFormType } from "@/lib/validations/character"

interface HistorySection {
    title: string
    content?: string
    fallback: string
}

const MAX_HISTORY_LENGTH = 200

const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
}

export function HistoryCard({ form }: { form: UseFormReturn<CompleteCharacterFormType> }) {
    const history = useWatch({
        control: form.control,
        name: "history",
        defaultValue: {
            traits: "",
            ideals: "",
            bonds: "",
            flaws: "",
            specialAbilities: [],
            history: ""
        }
    })!

    const { traits, ideals, bonds, flaws, specialAbilities, history: historyText } = history

    const historySections: HistorySection[] = [
        { title: "Personalidad", content: traits, fallback: "No especificada" },
        { title: "Ideales", content: ideals, fallback: "No especificados" },
        { title: "Vínculos", content: bonds, fallback: "No especificados" },
        { title: "Defectos", content: flaws, fallback: "No especificados" }
    ]

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Historia y Trasfondo
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {historyText ? (
                        <div>
                            <h4 className="text-sm font-medium mb-1">Historia</h4>
                            <p className="text-sm text-muted-foreground">{truncateText(historyText, MAX_HISTORY_LENGTH)}</p>
                        </div>
                    ) : (
                        <div className="text-sm text-muted-foreground">No se ha agregado historia</div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {historySections.map((section) => (
                            <div key={section.title}>
                                <h4 className="text-sm font-medium mb-1">{section.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                    {section.content || section.fallback}
                                </p>
                            </div>
                        ))}
                    </div>

                    {specialAbilities.length > 0 && (
                        <div>
                            <h4 className="text-sm font-medium mb-1">Habilidades Especiales</h4>
                            <div className="flex flex-wrap gap-1">
                                {specialAbilities.map((ability, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                        {ability.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}