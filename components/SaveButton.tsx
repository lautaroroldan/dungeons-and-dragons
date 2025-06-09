import { Button } from "@/components/ui/button"
import { Loader2, Save } from "lucide-react"

export function SaveButton({ isSubmitting }: { isSubmitting: boolean }) {
    return (
        <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                </>
            ) : (
                <>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Personaje
                </>
            )}
        </Button>
    )
}
