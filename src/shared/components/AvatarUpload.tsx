"use client"

import React, { useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@shared/components/ui/card"
import { Camera } from "lucide-react"
import { Input } from "@shared/components/ui/input"
import { toast } from "sonner"

export interface AvatarUploadProps {
    value?: string
    onChange: (value: string) => void
    title?: string
    description?: string
    sizeClass?: string
    accept?: string
    maxSizeMB?: number
    disabled?: boolean
}

// TODO: POR EL MOMENTO SE VA A USAR FILEREADER, PERO LUEGO SE VA A MODIFICAR PARA COMPRIMIR IMAGEN Y SUBIR A CLOUDINARY U OTRA PLATAFORMA DE STORAGE

export default function AvatarUpload({
    value,
    onChange,
    title = "Avatar del Personaje",
    description = "Sube una imagen para tu personaje",
    sizeClass = "w-48 h-48",
    accept = "image/*",
    maxSizeMB = 2,
    disabled = false,
}: AvatarUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageClick = () => {
        if (!disabled) fileInputRef.current?.click()
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith("image/")) {
            toast.error("Por favor selecciona un archivo de imagen válido")
            return
        }

        if (file.size > maxSizeMB * 1024 * 1024) {
            toast.error(`El archivo es demasiado grande. Máximo ${maxSizeMB}MB`)
            return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
            const result = e.target?.result as string
            onChange(result)
        }
        reader.readAsDataURL(file)
    }

    return (
        <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center">
                <div className="text-center mb-4">
                    <h3 className="font-medium">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>

                <div
                    className={`relative ${sizeClass} mb-4 cursor-pointer group`}
                    onClick={handleImageClick}
                    aria-disabled={disabled}
                >
                    <Image
                        src={value || "/placeholder.svg"}
                        alt="Avatar"
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

                <Input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={disabled}
                />

                <div className="text-center text-sm text-muted-foreground">
                    <p>Formatos aceptados: JPG, PNG</p>
                    <p>Tamaño máximo: {maxSizeMB}MB</p>
                </div>
            </CardContent>
        </Card>
    )
}


