"use client"

import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Save, Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"

interface FormNavigationButtonsProps {
    step: number
    isFirstStep: boolean
    isLastStep: boolean
    onNextStep: () => void
    onPreviousStep: () => void
}

function SaveButton() {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" disabled={pending}>
            {pending ? (
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
    )
}

export function FormNavigationButtons({
    step,
    isFirstStep,
    isLastStep,
    onNextStep,
    onPreviousStep
}: FormNavigationButtonsProps) {
    const { pending } = useFormStatus()

    return (
        <CardFooter className="flex justify-between">
            <Button
                type="button"
                variant="outline"
                onClick={onPreviousStep}
                disabled={isFirstStep || pending}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Anterior
            </Button>

            {isLastStep ? (
                <SaveButton />
            ) : (
                <Button type="button" onClick={onNextStep} disabled={pending}>
                    Siguiente
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            )}
        </CardFooter>
    )
} 