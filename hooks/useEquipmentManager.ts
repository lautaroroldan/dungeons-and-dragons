import { Equipment, useCharacterStore } from "@/stores/useCharacterStore"
import { useCallback, useMemo } from "react"

export const useEquipmentManager = () => {
    const { equipment } = useCharacterStore((state) => state.character)
    const setCharacter = useCharacterStore((state) => state.setCharacter)

    const addEquipment = useCallback((item: Equipment) => {
        const newEquipment = [...equipment, item]
        setCharacter({ equipment: newEquipment })
    }, [equipment, setCharacter])

    const removeEquipment = useCallback((index: number) => {
        const newEquipment = equipment.filter((_, i) => i !== index)
        setCharacter({ equipment: newEquipment })
    }, [equipment, setCharacter])

    const equipmentByType = useMemo(() => {
        return equipment.reduce((acc, item, index) => {
            if (!acc[item.type]) {
                acc[item.type] = []
            }
            acc[item.type].push({ ...item, index })
            return acc
        }, {} as Record<string, (Equipment & { index: number })[]>)
    }, [equipment])

    return {
        equipment,
        addEquipment,
        removeEquipment,
        equipmentByType,
        totalItems: equipment.length
    }
}