"use client"

import { Label } from "@shared/components/ui/label"
import { Input } from "@shared/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui/select"
// import { useCharacterStore } from "@/app/stores/useCharacterStore"

interface LevelExperienceInputsProps {
    level: number
    experience: number
    onLevelChange: (level: number) => void
    onExperienceChange: (experience: number) => void
}

export function LevelExperienceInputs({
    level,
    experience,
    onLevelChange,
    onExperienceChange
}: LevelExperienceInputsProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="nivel">Nivel</Label>
                <Select
                    value={level.toString()}
                    onValueChange={(value) => onLevelChange(Number.parseInt(value))}
                >
                    <SelectTrigger id="level">
                        <SelectValue placeholder="Selecciona un nivel" />
                    </SelectTrigger>
                    <SelectContent>
                        {Array.from({ length: 20 }, (_, i) => i + 1).map((nivel) => (
                            <SelectItem key={nivel} value={nivel.toString()}>
                                {nivel}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="experiencia">Experiencia</Label>
                <Input
                    id="experience"
                    type="number"
                    value={experience}
                    onChange={(e) => onExperienceChange(Number.parseInt(e.target.value) || 0)}
                    placeholder="0"
                />
            </div>
        </div>
    )
}

// Versión conectada al store (para cuando esté listo)
// export function ConnectedLevelExperienceInputs() {
//   const level = useCharacterStore((state) => state.character.level)
//   const experience = useCharacterStore((state) => state.character.experience)
//   const setCharacter = useCharacterStore((state) => state.setCharacter)

//   return (
//     <LevelExperienceInputs
//       level={level}
//       experience={experience}
//       onLevelChange={(level) => setCharacter({ level })}
//       onExperienceChange={(experience) => setCharacter({ experience })}
//     />
//   )
// } 