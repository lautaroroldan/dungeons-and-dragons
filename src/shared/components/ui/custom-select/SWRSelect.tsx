import React from 'react'
import CustomSelect from '@shared/components/ui/custom-select/CustomSelect'
import { SWRResponse } from 'swr'

interface SWRSelectProps {
    query: SWRResponse<any, any>
    valueKey?: string
    labelKey?: string
    placeholder?: string
    onValueChange?: (value: string) => void
    value?: string
    disabled?: boolean
    errorMessage?: string
}

function SWRSelect({
    query,
    valueKey,
    labelKey,
    placeholder = 'Selecciona una opción',
    onValueChange,
    value,
    disabled = false,
    errorMessage = 'Error al cargar las opciones',
}: SWRSelectProps) {

    const { data: values, isLoading, error } = query
    const data = values?.map((item: any) => ({
        value: String(item[valueKey || 'value']),
        label: item[labelKey || 'label'],
        disabled: item.disabled || false
    }))

    return (
        <CustomSelect
            data={data}
            placeholder={placeholder}
            onValueChange={onValueChange}
            disabled={disabled}
            loading={isLoading}
            error={error}
            value={value}
            errorMessage={errorMessage}
        />
    )
}

export default SWRSelect