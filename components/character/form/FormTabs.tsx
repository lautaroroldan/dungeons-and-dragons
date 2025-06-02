"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FORM_STEPS, type FormStep } from "@/constants/formSteps"

interface FormTabsProps {
    currentStep: number
    onStepChange: (step: number) => void
}

export function FormTabs({ currentStep, onStepChange }: FormTabsProps) {
    return (
        <Tabs
            value={currentStep.toString()}
            onValueChange={(step) => onStepChange(Number(step))}
            className="w-full"
        >
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
                {FORM_STEPS.map((step) => (
                    <TabsTrigger
                        key={step.id}
                        value={step.id.toString()}
                        className="text-xs md:text-sm"
                    >
                        {step.title}
                    </TabsTrigger>
                ))}
            </TabsList>

            {FORM_STEPS.map((step) => {
                const Component = step.component
                return (
                    <TabsContent key={step.id} value={step.id.toString()}>
                        <Component />
                    </TabsContent>
                )
            })}
        </Tabs>
    )
} 