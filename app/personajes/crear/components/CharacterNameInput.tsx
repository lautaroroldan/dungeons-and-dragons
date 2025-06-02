"use client"

import { useState, useEffect, useCallback } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useCharacterStore } from "@/stores/useCharacterStore"
import { useDebouncedCallback } from 'use-debounce'

export function CharacterNameInput() {
    const storeName = useCharacterStore((state) => state.character.name)
    const setCharacter = useCharacterStore((state) => state.setCharacter)

    // Estado local para el input (para respuesta inmediata)
    const [localName, setLocalName] = useState(storeName)

    // Debounced function para actualizar el store
    const debouncedSetCharacter = useDebouncedCallback(
        (name: string) => {
            setCharacter({ name })
        },
        300
    )

    // Actualizar el store cuando cambie el valor local
    useEffect(() => {
        if (localName !== storeName) {
            debouncedSetCharacter(localName)
        }
    }, [localName, storeName, debouncedSetCharacter])

    // Sincronizar el estado local cuando cambie el store externamente
    useEffect(() => {
        setLocalName(storeName)
    }, [storeName])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalName(e.target.value)
    }, [])

    return (
        <div className="space-y-2">
            <Label htmlFor="nombre">Nombre del Personaje</Label>
            <Input
                id="nombre"
                value={localName}
                onChange={handleChange}
                placeholder="Ej. Thorian Martillo de Piedra"
            />
        </div>
    )
} 