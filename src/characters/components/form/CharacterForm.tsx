"use client"

import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/components/ui/card"
import { Form } from "@shared/components/ui/form"
import { FormTabs } from "@characters/components/form/steps/FormTabs"
import { FormNavigationButtons } from "@characters/components/form/steps/FormNavigationButtons"
import { FormDebugger } from "@characters/components/form/FormDebugger"
import { useSteps } from "@shared/hooks/useSteps"
import { TOTAL_STEPS } from "@characters/utils/formSteps"
import {
    attributesCharacterSchema,
    basicCharacterSchema,
    CompleteCharacterFormType,
    completeCharacterSchema,
    equipmentCharacterSchema,
    historyCharacterSchema,
    skillsCharacterSchema
} from "@characters/types/character"

interface CharacterFormProps {
    mode: 'create' | 'edit'
    initialData?: Partial<CompleteCharacterFormType>
    onSubmit: (data: CompleteCharacterFormType) => Promise<void>
    title: string
    description: string
    isSubmitting?: boolean
    submitResult?: { success?: boolean; error?: string } | null
}

const useCharacterForm = (initialData?: Partial<CompleteCharacterFormType>) => {
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
            race: "",
            class: "",
            background: "",
            alignment: "",
            level: 1,
            experience: 0,
            attributes: {
                strength: 10,
                dexterity: 10,
                constitution: 10,
                intelligence: 10,
                wisdom: 10,
                charisma: 10
            },
            skills: [],
            equipment: [],
            history: {
                backstory: "",
                ideals: "",
                bonds: "",
                flaws: "",
                specialAbilities: []
            },
            image: "",
            ...initialData
        }
    })

    // Reset form cuando cambien los initialData
    React.useEffect(() => {
        if (initialData) {
            console.log("🔄 Resetting form with initialData:", initialData)
            const completeData = {
                name: "",
                race: "",
                class: "",
                background: "",
                alignment: "",
                level: 1,
                experience: 0,
                attributes: {
                    strength: 10,
                    dexterity: 10,
                    constitution: 10,
                    intelligence: 10,
                    wisdom: 10,
                    charisma: 10
                },
                skills: [],
                equipment: [],
                history: {
                    backstory: "",
                    ideals: "",
                    bonds: "",
                    flaws: "",
                    specialAbilities: []
                },
                image: "",
                ...initialData
            }
            console.log("🔄 Complete data being passed to form.reset:", completeData)
            form.reset(completeData)
        }
    }, [initialData, form])

    return {
        basicCharacterForm,
        attributesCharacterForm,
        skillsCharacterForm,
        equipmentCharacterForm,
        historyCharacterForm,
        form,
    }
}

export function CharacterForm({
    mode,
    initialData,
    onSubmit,
    title,
    description,
    isSubmitting = false,
    submitResult = null
}: CharacterFormProps) {
    const {
        step,
        isFirstStep,
        isLastStep,
        nextStep,
        previousStep,
        setStep,
    } = useSteps(0, TOTAL_STEPS)

    const {
        basicCharacterForm,
        attributesCharacterForm,
        skillsCharacterForm,
        equipmentCharacterForm,
        historyCharacterForm,
        form,
    } = useCharacterForm(initialData)

    const handleSubmit: SubmitHandler<CompleteCharacterFormType> = async (values) => {
        await onSubmit(values)
    }

    const handleSubmitError = (errors: any) => {
        console.log('❌ Submit falló por errores:', errors)
        setStep(0) // Volver al primer paso si hay errores
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit, handleSubmitError)}>
                <Card className="max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl">{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
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