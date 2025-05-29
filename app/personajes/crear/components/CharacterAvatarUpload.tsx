"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Camera } from "lucide-react"
import { useCharacterStore } from "@/app/stores/useCharacterStore"

export function CharacterAvatarUpload() {
    const image = useCharacterStore((state) => state.character.image)
    const setCharacter = useCharacterStore((state) => state.setCharacter)
    const [avatarPreview, setAvatarPreview] = useState(image)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            // Validar tipo de archivo
            if (!file.type.startsWith('image/')) {
                alert('Por favor selecciona un archivo de imagen válido')
                return
            }

            // Validar tamaño (2MB máximo)
            if (file.size > 2 * 1024 * 1024) {
                alert('El archivo es demasiado grande. Máximo 2MB')
                return
            }

            const reader = new FileReader()
            reader.onload = (e) => {
                const result = e.target?.result as string
                setAvatarPreview(result)
                setCharacter({ image: result })
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center">
                <div className="text-center mb-4">
                    <h3 className="font-medium">Avatar del Personaje</h3>
                    <p className="text-sm text-muted-foreground">Sube una imagen para tu personaje</p>
                </div>

                <div
                    className="relative w-48 h-48 mb-4 cursor-pointer group"
                    onClick={handleImageClick}
                >
                    <Image
                        src={avatarPreview || "/placeholder.svg"}
                        alt="Avatar del personaje"
                        fill
                        className="object-cover rounded-lg border"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="text-white text-center">
                            <Camera className="mx-auto h-8 w-8 mb-2" />
                            <span className="text-sm">Cambiar imagen</span>
                        </div>
                    </div>
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                <div className="text-center text-sm text-muted-foreground">
                    <p>Formatos aceptados: JPG, PNG</p>
                    <p>Tamaño máximo: 2MB</p>
                </div>
            </CardContent>
        </Card>
    )
} 