"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Save, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InformacionBasica } from "./components/informacion-basica"
import { Atributos } from "./components/atributos"
import { Habilidades } from "./components/habilidades"
import { Equipamiento } from "./components/equipamiento"
import { Historia } from "./components/historia"
import { Resumen } from "./components/resumen"

// Pasos del formulario
const pasos = [
  { id: "basico", titulo: "Información Básica" },
  { id: "atributos", titulo: "Atributos" },
  { id: "habilidades", titulo: "Habilidades" },
  { id: "equipamiento", titulo: "Equipamiento" },
  { id: "historia", titulo: "Historia" },
  { id: "resumen", titulo: "Resumen" },
]

export default function CrearPersonajePage() {
  const router = useRouter()
  const [pasoActual, setPasoActual] = useState("basico")
  const [guardando, setGuardando] = useState(false)

  // Estado para almacenar los datos del personaje
  const [personaje, setPersonaje] = useState({
    nombre: "",
    raza: "",
    clase: "",
    nivel: 1,
    trasfondo: "",
    alineamiento: "",
    experiencia: 0,
    imagen: "/placeholder.svg?height=400&width=400",
    atributos: {
      fuerza: 10,
      destreza: 10,
      constitucion: 10,
      inteligencia: 10,
      sabiduria: 10,
      carisma: 10,
    },
    habilidades: [
      { nombre: "Acrobacias", valor: 0, competente: false },
      { nombre: "Arcanos", valor: 0, competente: false },
      { nombre: "Atletismo", valor: 0, competente: false },
      { nombre: "Engaño", valor: 0, competente: false },
      { nombre: "Historia", valor: 0, competente: false },
      { nombre: "Interpretación", valor: 0, competente: false },
      { nombre: "Intimidación", valor: 0, competente: false },
      { nombre: "Investigación", valor: 0, competente: false },
      { nombre: "Juego de Manos", valor: 0, competente: false },
      { nombre: "Medicina", valor: 0, competente: false },
      { nombre: "Naturaleza", valor: 0, competente: false },
      { nombre: "Percepción", valor: 0, competente: false },
      { nombre: "Perspicacia", valor: 0, competente: false },
      { nombre: "Persuasión", valor: 0, competente: false },
      { nombre: "Religión", valor: 0, competente: false },
      { nombre: "Sigilo", valor: 0, competente: false },
      { nombre: "Supervivencia", valor: 0, competente: false },
      { nombre: "Trato con Animales", valor: 0, competente: false },
    ],
    equipamiento: [],
    historia: "",
    rasgos: [],
    personalidad: "",
    ideales: "",
    vinculos: "",
    defectos: "",
  })

  // Función para actualizar el personaje
  const actualizarPersonaje = (datos: any) => {
    setPersonaje((prev) => ({ ...prev, ...datos }))
  }

  // Función para ir al siguiente paso
  const siguientePaso = () => {
    const indiceActual = pasos.findIndex((paso) => paso.id === pasoActual)
    if (indiceActual < pasos.length - 1) {
      setPasoActual(pasos[indiceActual + 1].id)
    }
  }

  // Función para ir al paso anterior
  const pasoAnterior = () => {
    const indiceActual = pasos.findIndex((paso) => paso.id === pasoActual)
    if (indiceActual > 0) {
      setPasoActual(pasos[indiceActual - 1].id)
    }
  }

  // Función para guardar el personaje
  const guardarPersonaje = async () => {
    setGuardando(true)

    // Aquí iría la lógica para guardar el personaje en una base de datos
    // Por ahora, simularemos un retraso y redirigiremos a la página de personajes
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setGuardando(false)
    router.push("/personajes")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="ghost" className="gap-2">
          <Link href="/personajes">
            <ArrowLeft className="h-4 w-4" />
            Volver a todos los personajes
          </Link>
        </Button>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Crear Nuevo Personaje</CardTitle>
          <CardDescription>Completa la información para crear tu personaje de Dungeons & Dragons</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={pasoActual} onValueChange={setPasoActual} className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
              {pasos.map((paso) => (
                <TabsTrigger key={paso.id} value={paso.id} className="text-xs md:text-sm">
                  {paso.titulo}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="basico">
              <InformacionBasica personaje={personaje} actualizarPersonaje={actualizarPersonaje} />
            </TabsContent>

            <TabsContent value="atributos">
              <Atributos personaje={personaje} actualizarPersonaje={actualizarPersonaje} />
            </TabsContent>

            <TabsContent value="habilidades">
              <Habilidades personaje={personaje} actualizarPersonaje={actualizarPersonaje} />
            </TabsContent>

            <TabsContent value="equipamiento">
              <Equipamiento personaje={personaje} actualizarPersonaje={actualizarPersonaje} />
            </TabsContent>

            <TabsContent value="historia">
              <Historia personaje={personaje} actualizarPersonaje={actualizarPersonaje} />
            </TabsContent>

            <TabsContent value="resumen">
              <Resumen personaje={personaje} />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={pasoAnterior} disabled={pasoActual === "basico" || guardando}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>

          {pasoActual === "resumen" ? (
            <Button onClick={guardarPersonaje} disabled={guardando}>
              {guardando ? (
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
          ) : (
            <Button onClick={siguientePaso} disabled={guardando}>
              Siguiente
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
