import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

// Modificar los datos de personajes para que solo incluya a "Cabezon Porongon"
const personajes = [
  {
    id: 7,
    nombre: "Cabezon Porongon",
    raza: "Goblin",
    clase: "Pícaro",
    nivel: 5,
    imagen: "/placeholder.svg?height=200&width=200",
  },
]

export default function PersonajesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Personajes de la Campaña</h1>
        <Button asChild>
          <Link href="/personajes/crear" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Crear Personaje
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {personajes.map((personaje) => (
          // Actualizar el enlace para que apunte a la nueva ruta
          <Link href={`/personajes/cabezon-porongon`} key={personaje.id}>
            <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="aspect-square relative">
                <Image
                  src={personaje.imagen || "/placeholder.svg"}
                  alt={personaje.nombre}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h2 className="text-xl font-bold">{personaje.nombre}</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline">{personaje.raza}</Badge>
                  <Badge variant="secondary">{personaje.clase}</Badge>
                  <Badge>Nivel {personaje.nivel}</Badge>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 p-4">
                <span className="text-sm text-muted-foreground">Ver perfil completo</span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
