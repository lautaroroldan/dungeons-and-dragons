"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormTabs } from "@/components/character/form/steps/FormTabs"
import { FormNavigationButtons } from "@/components/character/form/steps/FormNavigationButtons"
import { useCharacterStore } from "@/stores/useCharacterStore"
import { saveCharacter } from "@/lib/actions"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { attributesCharacterSchema, basicCharacterSchema, completeCharacterSchema, equipmentCharacterSchema, historyCharacterSchema, skillsCharacterSchema } from "@/lib/validations/character"
import { useSteps } from "@/hooks/useSteps"
import { TOTAL_STEPS } from "@/constants/formSteps"
import { Form } from "@/components/ui/form"

const useCharacterForm = () => {
    const basicCharacterForm = useForm<z.infer<typeof basicCharacterSchema>>({
        resolver: zodResolver(basicCharacterSchema),
    })

    const attributesCharacterForm = useForm<z.infer<typeof attributesCharacterSchema>>({
        resolver: zodResolver(attributesCharacterSchema),
    })

    const skillsCharacterForm = useForm<z.infer<typeof skillsCharacterSchema>>({
        resolver: zodResolver(skillsCharacterSchema),
    })

    const equipmentCharacterForm = useForm<z.infer<typeof equipmentCharacterSchema>>({
        resolver: zodResolver(equipmentCharacterSchema),
    })

    const historyCharacterForm = useForm<z.infer<typeof historyCharacterSchema>>({
        resolver: zodResolver(historyCharacterSchema),
    })

    const form = useForm<z.infer<typeof completeCharacterSchema>>({
        resolver: zodResolver(completeCharacterSchema),
    })

    return {
        basicCharacterForm,
        attributesCharacterForm,
        skillsCharacterForm,
        equipmentCharacterForm,
        historyCharacterForm,
        form,
    }
}

function CharacterForm() {

    const {
        step,
        isFirstStep,
        isLastStep,
        nextStep,
        previousStep,
        setStep,
    } = useSteps(0, TOTAL_STEPS)

    // const handleFormSubmit = async (formData: FormData) => {
    //     if (step === TOTAL_STEPS - 1) {
    //         await saveCharacter(character)
    //     }
    // }

    const {
        basicCharacterForm,
        attributesCharacterForm,
        skillsCharacterForm,
        equipmentCharacterForm,
        historyCharacterForm,
        form,
    } = useCharacterForm()


    const character = useCharacterStore((state) => state.character)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitResult, setSubmitResult] = useState<{ success?: boolean; error?: string } | null>(null)

    const onSubmit = async (values: z.infer<typeof completeCharacterSchema>) => {

        console.log('values', values)
        // Solo enviar si estamos en el último paso
        if (!isLastStep) return

        setIsSubmitting(true)
        setSubmitResult(null)

        try {
            console.log('📋 Datos del personaje desde Zustand:', character)

            // Validaciones básicas
            if (!character.name) {
                throw new Error('El nombre del personaje es requerido')
            }
            if (!character.race || !character.class) {
                throw new Error('Debes seleccionar una raza y clase')
            }

            // Llamar a la server action
            throw new Error('Error de prueba')
            const result = await saveCharacter(character)

            if (result?.error) {
                setSubmitResult({ success: false, error: result.error })
            } else {
                setSubmitResult({ success: true })
                // El redirect se maneja en saveCharacter
            }
        } catch (error) {
            console.error('❌ Error al guardar personaje:', error)
            setSubmitResult({
                success: false,
                error: error instanceof Error ? error.message : 'Error desconocido'
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
                console.log('❌ Submit falló por errores:', errors)
            })}>
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
                            form={form}
                        />
                    </CardContent>

                    <FormNavigationButtons
                        isFirstStep={isFirstStep}
                        isLastStep={isLastStep}
                        isSubmitting={isSubmitting}
                        submitResult={submitResult}
                        onNextStep={nextStep}
                        onPreviousStep={previousStep}
                    />
                </Card>
            </form>
        </Form>
    )
}

export function CreateCharacter() {

    return (
        <div className="container mx-auto px-4 py-8">
            <CharacterForm />
        </div>
    )
} 