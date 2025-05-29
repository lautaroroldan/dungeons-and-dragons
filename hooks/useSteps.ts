import { useState, useEffect } from "react"

export const useSteps = (initialStep: number, maxSteps: number) => {
    const [step, setStep] = useState(initialStep)

    useEffect(() => {
        console.log(step)
    }, [step])

    const nextStep = () => {
        setStep((prev) => {
            if (prev < maxSteps - 1) {
                return prev + 1
            }
            return prev
        })
    }
    const previousStep = () => {
        setStep((prev) => {
            if (prev > 0) {
                return prev - 1
            }
            return prev
        })
    }

    return { step, nextStep, previousStep, setStep }
}
