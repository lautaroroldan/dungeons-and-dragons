"use client"

import { Button } from "@shared/components/ui/button"
import { CardFooter } from "@shared/components/ui/card"
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@shared/components/ui/alert"
import { SaveButton } from "@shared/components/SaveButton"

interface FormNavigationButtonsProps {
    isFirstStep: boolean
    isLastStep: boolean
    isSubmitting?: boolean
    submitResult?: { success?: boolean; error?: string } | null
    onNextStep: () => void
    onPreviousStep: () => void
}


export function FormNavigationButtons({
    isFirstStep,
    isLastStep,
    isSubmitting = false,
    submitResult,
    onNextStep,
    onPreviousStep
}: FormNavigationButtonsProps) {

    return (
        <>
            {/* Mostrar resultado del submit */}
            {submitResult && (
                <div className="px-6 pb-2">
                    <Alert variant={submitResult.success ? "default" : "destructive"}>
                        {submitResult.success ? (
                            <CheckCircle className="h-4 w-4" />
                        ) : (
                            <AlertCircle className="h-4 w-4" />
                        )}
                        <AlertDescription>
                            {submitResult.success
                                ? "Personaje guardado correctamente"
                                : submitResult.error || "Error al guardar el personaje"
                            }
                        </AlertDescription>
                    </Alert>
                </div>
            )}

            <CardFooter className="flex justify-between">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onPreviousStep}
                    disabled={isFirstStep || isSubmitting}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Anterior
                </Button>

                {isLastStep ? (
                    <SaveButton isSubmitting={isSubmitting} />
                ) : (
                    <Button type="button" onClick={onNextStep} disabled={isSubmitting}>
                        Siguiente
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </CardFooter>
        </>
    )
} 