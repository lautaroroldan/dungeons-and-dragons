"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { FormTabs, FormNavigationButtons } from "@/components/character/form"
import { useCharacterForm } from "@/hooks/useCharacterForm"

export function CreateCharacterClient() {
    const {
        step,
        isFirstStep,
        isLastStep,
        nextStep,
        previousStep,
        setStep,
        handleFormSubmit,
    } = useCharacterForm()

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

            <form action={handleFormSubmit}>
                <Card className="max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl">Crear Nuevo Personaje</CardTitle>
                        <CardDescription>
                            Completa la información para crear tu personaje de Dungeons & Dragons
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormTabs
                            currentStep={step}
                            onStepChange={setStep}
                        />
                    </CardContent>

                    <FormNavigationButtons
                        step={step}
                        isFirstStep={isFirstStep}
                        isLastStep={isLastStep}
                        onNextStep={nextStep}
                        onPreviousStep={previousStep}
                    />
                </Card>
            </form>
        </div>
    )
} 