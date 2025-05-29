"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Save, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BasicInformationPanel } from "@/app/personajes/crear/components/basic-information-panel"
import { Attributes } from "@/app/personajes/crear/components/attributes"
import { Skills } from "@/app/personajes/crear/components/skills"
import { AddCharacterEquipment } from "@/app/personajes/crear/components/equipment"
import { History } from "@/app/personajes/crear/components/history"
import { Resumen } from "@/app/personajes/crear/components/summary"
import axios from "axios"
import { useSteps } from "@/hooks/useSteps"
import { useCharacterStore } from "@/app/stores/useCharacterStore"


const totalSteps = [
  { id: 0, titulo: "Información Básica" },
  { id: 1, titulo: "Atributos" },
  { id: 2, titulo: "Habilidades" },
  { id: 3, titulo: "Equipamiento" },
  { id: 4, titulo: "Historia" },
  { id: 5, titulo: "Resumen" },
]

export default function CrearPersonajePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const { step, nextStep, previousStep, setStep } = useSteps(0, totalSteps.length)
  const { name, race, class: characterClass, level, background, alignment, experience, image, attributes, skills, equipment, history } = useCharacterStore((state) => state.character)

  // Función para guardar el personaje
  const saveCharacter = async () => {
    setSaving(true)
    await axios.post("/api/characters", {
      name,
      race,
      class: characterClass,
      level,
      image,
      background,
      alignment: parseInt(alignment),
      experience,
      attributes,
      skills,
      equipment,
      history,
    })
    setSaving(false)
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
          <Tabs value={step.toString()} onValueChange={(_step) => { setStep(Number(_step)) }} className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
              {totalSteps.map((step) => (
                <TabsTrigger key={step.id} value={step.id.toString()} className="text-xs md:text-sm">
                  {step.titulo}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent key={totalSteps[0].id} value={totalSteps[0].id.toString()}>
              <BasicInformationPanel
              />
            </TabsContent>

            <TabsContent key={totalSteps[1].id} value={totalSteps[1].id.toString()}>
              <Attributes />
            </TabsContent>

            <TabsContent key={totalSteps[2].id} value={totalSteps[2].id.toString()}>
              <Skills />
            </TabsContent>

            <TabsContent key={totalSteps[3].id} value={totalSteps[3].id.toString()}>
              <AddCharacterEquipment />
            </TabsContent>

            <TabsContent key={totalSteps[4].id} value={totalSteps[4].id.toString()}>
              <History />
            </TabsContent>

            <TabsContent key={totalSteps[5].id} value={totalSteps[5].id.toString()}>
              <Resumen />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={previousStep} disabled={step === 0 || saving}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>

          {step === totalSteps.length - 1 ? (
            <Button onClick={saveCharacter} disabled={saving}>
              {saving ? (
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
            <Button onClick={nextStep} disabled={saving}>
              Siguiente
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
