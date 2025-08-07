"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/components/ui/form"
import { Input } from "@shared/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui/select"
import { CompleteCharacterFormType } from "@characters/types/character"
import { UseFormReturn } from "react-hook-form"

interface LevelExperienceInputsProps {
    form: UseFormReturn<CompleteCharacterFormType>
}

export function LevelExperienceInputs({ form }: LevelExperienceInputsProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nivel</FormLabel>
                        <Select 
                            value={field.value?.toString() || "1"} 
                            onValueChange={(value) => field.onChange(Number.parseInt(value))}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un nivel" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {Array.from({ length: 20 }, (_, i) => i + 1).map((nivel) => (
                                    <SelectItem key={nivel} value={nivel.toString()}>
                                        Nivel {nivel}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Experiencia</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                placeholder="0"
                                {...field}
                                value={field.value || 0}
                                onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
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