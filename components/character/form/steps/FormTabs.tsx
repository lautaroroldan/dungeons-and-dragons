"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FORM_STEPS } from "@/constants/formSteps"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { completeCharacterSchema } from "@/lib/validations/character"

interface FormTabsProps {
    currentStep: number
    onStepChange: (step: number) => void
    form: UseFormReturn<z.infer<typeof completeCharacterSchema>>
}

function StepNavigationTabs({ children }: { children: React.ReactNode }) {
    return (
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8 h-full">
            {children}
        </TabsList>
    )
}

export function FormTabs({ currentStep, onStepChange, form }: FormTabsProps) {
    return (
        <Tabs
            value={currentStep.toString()}
            onValueChange={(step) => onStepChange(Number(step))}
            className="w-full"
        >
            <StepNavigationTabs>
                {FORM_STEPS.map((step) => (
                    <TabsTrigger
                        key={step.id}
                        value={step.id.toString()}
                        className="text-xs md:text-sm"
                    >
                        {step.title}
                    </TabsTrigger>
                ))}
            </StepNavigationTabs>

            {FORM_STEPS.map((step) => {
                const Component = step.component
                return (
                    <TabsContent key={step.id} value={step.id.toString()}>
                        <Component form={form} />
                    </TabsContent>
                )
            })}
        </Tabs>
    )
} 