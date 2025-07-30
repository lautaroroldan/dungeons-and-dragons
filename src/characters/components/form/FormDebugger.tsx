"use client"

import { UseFormReturn, useWatch } from "react-hook-form"
import { z } from "zod"
import { completeCharacterSchema } from "@/lib/validations/character"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card"
import { useState } from "react"
import { Button } from "@shared/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

interface FormDebuggerProps {
    form: UseFormReturn<z.infer<typeof completeCharacterSchema>>
}

export function FormDebugger({ form }: FormDebuggerProps) {
    const [isVisible, setIsVisible] = useState(false)
    const formValues = useWatch({ control: form.control })

    if (!isVisible) {
        return (
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsVisible(true)}
                className="fixed bottom-4 right-4 z-50"
            >
                <Eye className="mr-2 h-4 w-4" />
                Ver Formulario
            </Button>
        )
    }

    return (
        <Card className="fixed bottom-4 right-4 w-96 max-h-96 overflow-auto z-50 bg-background border shadow-lg">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-sm">Debug: Valores del Formulario</CardTitle>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsVisible(false)}
                    >
                        <EyeOff className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <pre className="text-xs overflow-auto">
                    {JSON.stringify(formValues, null, 2)}
                </pre>
            </CardContent>
        </Card>
    )
}