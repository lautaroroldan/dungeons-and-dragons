"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/components/ui/card"
import { FormTabs } from "@characters/components/form/steps/FormTabs"
import { FormNavigationButtons } from "@characters/components/form/steps/FormNavigationButtons"
import { submitForm } from "@characters/utils/characterForm"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { attributesCharacterSchema, basicCharacterSchema, CompleteCharacterFormType, completeCharacterSchema, equipmentCharacterSchema, historyCharacterSchema, skillsCharacterSchema } from "@characters/types/character"
import { useSteps } from "@shared/hooks/useSteps"
import { TOTAL_STEPS } from "@characters/utils/formSteps"
import { Form } from "@shared/components/ui/form"
import { FormDebugger } from "@characters/components/form/FormDebugger"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const ERROR_MESSAGE = "Ocurrió un error al guardar el personaje."

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

    const form = useForm<CompleteCharacterFormType>({
        resolver: zodResolver(completeCharacterSchema),
        defaultValues: {
            name: "",
            equipment: [],
        }
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

    const router = useRouter()

    const {
        basicCharacterForm,
        attributesCharacterForm,
        skillsCharacterForm,
        equipmentCharacterForm,
        historyCharacterForm,
        form,
    } = useCharacterForm()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitResult, setSubmitResult] = useState<{ success?: boolean; error?: string } | null>(null)

    const onSubmit: SubmitHandler<CompleteCharacterFormType> = async (values) => {

        setIsSubmitting(true)
        setSubmitResult(null)

        try {
            console.log("formData")
            const formData = new FormData()
            formData.append("name", values.name)
            formData.append("race", values.race)
            formData.append("class", values.class)
            formData.append("background", values.background)
            formData.append("alignment", values.alignment)
            formData.append("skills", JSON.stringify(values.skills))
            formData.append("attributes", JSON.stringify(values.attributes))
            formData.append("equipment", JSON.stringify(values.equipment))
            formData.append("history", JSON.stringify(values.history))
            formData.append("image", values.image)
            const { data, errors } = await submitForm(formData)

            if (errors) {
                const errorsArray = await errors
                if (Array.isArray(errorsArray)) {
                    toast.error('Ha ocurrido un error', {
                        description: errorsArray.map((error) => error.message).join(', ')
                    })
                } else {
                    toast.error('Ha ocurrido un error', {
                        description: errorsArray.message
                    })
                }
            } else {
                router.push("/personajes")
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
                setStep(0)
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
                <FormDebugger form={form} />
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