import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { submitForm } from "@characters/utils/characterForm"
import { CompleteCharacterFormType } from "@characters/types/character"

export function useCharacterSubmit(mode: 'create' | 'edit', characterId?: string) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitResult, setSubmitResult] = useState<{ success?: boolean; error?: string } | null>(null)
    const router = useRouter()

    const handleSubmit = async (values: CompleteCharacterFormType) => {
        setIsSubmitting(true)
        setSubmitResult(null)

        try {
            console.log(`${mode === 'create' ? 'Creating' : 'Updating'} character...`)

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

            // Si es edición, agregar el ID
            if (mode === 'edit' && characterId) {
                formData.append("id", characterId)
            }

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
                toast.success(
                    mode === 'create' ? 'Personaje creado exitosamente' : 'Personaje actualizado exitosamente'
                )
                router.push("/personajes")
            }

        } catch (error) {
            console.error(`❌ Error al ${mode === 'create' ? 'crear' : 'actualizar'} personaje:`, error)
            setSubmitResult({
                success: false,
                error: error instanceof Error ? error.message : 'Error desconocido'
            })
            toast.error(`Error al ${mode === 'create' ? 'crear' : 'actualizar'} el personaje`)
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        handleSubmit,
        isSubmitting,
        submitResult
    }
}