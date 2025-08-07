"use client"

import React from "react"
import { Control, Controller } from "react-hook-form"
import AvatarUpload, { AvatarUploadProps } from "@shared/components/AvatarUpload"

export interface FormAvatarUploadProps extends Omit<AvatarUploadProps, "onChange"> {
    name: string
    control: Control<any>
}

export default function FormAvatarUpload({ name, control, ...props }: FormAvatarUploadProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <AvatarUpload
                    value={field.value}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    )
}


