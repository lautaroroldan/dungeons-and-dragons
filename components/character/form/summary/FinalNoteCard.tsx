import { ScrollText } from "lucide-react";

export function FinalNotesCard() {
    return (
        <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
                <ScrollText className="h-5 w-5 text-muted-foreground" />
                <h4 className="font-medium">Notas Finales</h4>
            </div>
            <p className="text-sm text-muted-foreground">
                Revisa toda la información de tu personaje antes de guardar. Una vez guardado, podrás ver el perfil completo
                de tu personaje y editarlo más adelante si es necesario.
            </p>
        </div>
    )
}