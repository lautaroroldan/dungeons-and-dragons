import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"
import { HistoryItem } from "./HistoryItem"

interface History {
    id: number
    characterId: number
    history?: string | null
    traits?: string | null
    ideals?: string | null
    bonds?: string | null
    flaws?: string | null
}

interface HistorySectionProps {
    history: History | null
}

export function HistorySection({ history }: HistorySectionProps) {
    const hasAnyContent = history && (
        history.history ||
        history.traits ||
        history.ideals ||
        history.bonds ||
        history.flaws
    )

    return (
        <Card>
            <CardHeader>
                <CardTitle>Historia y Trasfondo</CardTitle>
            </CardHeader>
            <CardContent>
                {hasAnyContent ? (
                    <div className="space-y-6">
                        <HistoryItem
                            title="Historia Personal"
                            content={history.history}
                        />

                        <HistoryItem
                            title="Rasgos de Personalidad"
                            content={history.traits}
                        />

                        <HistoryItem
                            title="Ideales"
                            content={history.ideals}
                        />

                        <HistoryItem
                            title="Vínculos"
                            content={history.bonds}
                        />

                        <HistoryItem
                            title="Defectos"
                            content={history.flaws}
                        />
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="text-muted-foreground">
                            <p className="text-lg mb-2">No hay información de historia registrada</p>
                            <p className="text-sm">Este personaje aún no tiene su trasfondo detallado</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
} 