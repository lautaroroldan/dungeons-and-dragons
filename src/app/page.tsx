import Link from "next/link"
import { Button } from "@shared/components/ui/button"
import { Users, ScrollText, MapIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"


export default function HomePage() {

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Crónicas de Faerûn</h1>
        <p className="mt-2 text-muted-foreground">Gestiona tu campaña de D&D con facilidad</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Personajes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Gestiona los personajes de tu campaña, visualiza sus estadísticas y sigue su progreso.
            </p>
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link href="/personajes">Ver Personajes</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/personajes/crear">Crear Personaje</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapIcon className="h-5 w-5" />
              Mapa del Mundo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              El mapa interactivo está temporalmente deshabilitado. Estará disponible próximamente.
            </p>
            <Button disabled>Función en desarrollo</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScrollText className="h-5 w-5" />
              Notas de Campaña
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Organiza tus notas de campaña, misiones y secretos para tus jugadores.
            </p>
            <Button disabled>Próximamente</Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Próximas Funcionalidades</h2>
        <ul className="space-y-2 list-disc pl-5">
          <li>Sistema de combate para gestionar encuentros</li>
          <li>Biblioteca de hechizos y objetos mágicos</li>
          <li className="line-through">✅ Modo oscuro para sesiones nocturnas</li>
          <li>Edición de personajes existentes</li>
          <li>Mapa interactivo del mundo</li>
        </ul>
      </div>
    </div>
  )
}
