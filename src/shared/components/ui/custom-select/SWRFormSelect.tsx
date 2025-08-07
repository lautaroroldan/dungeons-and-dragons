import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { SWRResponse } from 'swr'
import SWRSelect from '@shared/components/ui/custom-select/SWRSelect'

interface SWRFormSelectProps {
    name: string
    control: Control<any>
    query: SWRResponse<any, any>
    valueKey?: string
    labelKey?: string
    placeholder?: string
    disabled?: boolean
    errorMessage?: string
}

function SWRFormSelect({
    name,
    control,
    query,
    valueKey,
    labelKey,
    placeholder = 'Selecciona una opción',
    disabled = false,
    errorMessage = 'Error al cargar las opciones',
}: SWRFormSelectProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <SWRSelect
                    query={query}
                    valueKey={valueKey}
                    labelKey={labelKey}
                    placeholder={placeholder}
                    disabled={disabled}
                    errorMessage={errorMessage}
                    value={field.value}
                    onValueChange={field.onChange}
                />
            )}
        />
    )
}

export default SWRFormSelect