"use client"

import { SmartSelect } from "@/components/select"
import { useCharacterStore } from "@/stores/useCharacterStore"

interface SelectConfig {
    label: string
    id: string
    type: 'races' | 'classes' | 'backgrounds' | 'alignments'
    storeKey: 'race' | 'class' | 'background' | 'alignment'
}

const selectConfigs: SelectConfig[] = [
    { label: "Raza", id: "raza", type: "races", storeKey: "race" },
    { label: "Clase", id: "clase", type: "classes", storeKey: "class" },
    { label: "Trasfondo", id: "trasfondo", type: "backgrounds", storeKey: "background" },
    { label: "Alineamiento", id: "alineamiento", type: "alignments", storeKey: "alignment" }
]

export function CharacterSelectsGrid() {
    const character = useCharacterStore((state) => state.character)
    const setCharacter = useCharacterStore((state) => state.setCharacter)

    const getValue = (key: SelectConfig['storeKey']) => {
        return character[key].toString()
    }

    const handleValueChange = (key: SelectConfig['storeKey']) => (value: any) => {
        setCharacter({ [key]: value })
    }

    return (
        <div className="space-y-4">
            {/* Raza y Clase */}
            <div className="grid grid-cols-2 gap-4">
                {selectConfigs.slice(0, 2).map((config) => (
                    <SmartSelect
                        key={config.id}
                        label={config.label}
                        id={config.id}
                        type={config.type}
                        value={getValue(config.storeKey)}
                        onValueChange={handleValueChange(config.storeKey)}
                    />
                ))}
            </div>

            {/* Trasfondo y Alineamiento */}
            <div className="grid grid-cols-2 gap-4">
                {selectConfigs.slice(2, 4).map((config) => (
                    <SmartSelect
                        key={config.id}
                        label={config.label}
                        id={config.id}
                        type={config.type}
                        value={getValue(config.storeKey)}
                        onValueChange={handleValueChange(config.storeKey)}
                    />
                ))}
            </div>
        </div>
    )
} 