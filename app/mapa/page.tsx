import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Construction } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function MapaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="ghost" className="gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </Button>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Construction className="h-5 w-5" />
            Mapa en Desarrollo
          </CardTitle>
          <CardDescription>
            Esta funcionalidad está temporalmente deshabilitada mientras resolvemos algunos problemas técnicos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            El mapa interactivo del mundo permitirá explorar las diferentes ubicaciones de la campaña, ver detalles de
            ciudades, mazmorras y puntos de interés, y planificar las aventuras de tus personajes.
          </p>
          <p>Características que estarán disponibles próximamente:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Mapa interactivo con zoom y desplazamiento</li>
            <li>Marcadores para diferentes tipos de ubicaciones</li>
            <li>Información detallada de cada ubicación</li>
            <li>Notas del DM para cada punto de interés</li>
            <li>Misiones disponibles en cada ubicación</li>
          </ul>
          <div className="pt-4">
            <Button asChild>
              <Link href="/personajes">Ver Personajes</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
