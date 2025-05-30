import { useCharacterStore } from "@/app/stores/useCharacterStore"
import { saveCharacter } from "@/lib/actions"
import { useSteps } from "@/hooks/useSteps"
import { TOTAL_STEPS } from "@/app/constants/formSteps"

export const useCharacterForm = () => {
    const { step, nextStep, previousStep, setStep } = useSteps(0, TOTAL_STEPS)
    const character = useCharacterStore((state) => state.character)

    const handleFormSubmit = async (formData: FormData) => {
        if (step === TOTAL_STEPS - 1) {
            await saveCharacter(character)
        }
    }

    const isLastStep = step === TOTAL_STEPS - 1
    const isFirstStep = step === 0

    return {
        // Estado
        step,
        character,
        isLastStep,
        isFirstStep,

        // Acciones
        nextStep,
        previousStep,
        setStep,
        handleFormSubmit,
    }
} 