import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@shared/components/ui/select'
import { AlertCircle, Loader2 } from 'lucide-react'
import React from 'react'

export interface SelectOption {
    value: string
    label: string
    disabled?: boolean
}

export interface CustomSelectProps {
    data: SelectOption[]
    placeholder?: string
    defaultValue?: string
    value?: string
    onValueChange?: (value: string) => void
    disabled?: boolean
    loading?: boolean
    error?: boolean
    errorMessage?: string
}

function SelectMessage({ children }: { children: React.ReactNode }) {
    return (<div className="flex items-center justify-center py-2 text-sm text-muted-foreground gap-2">
        {children}
    </div>)
}

function SelectLoading() {
    return (
        <SelectMessage>
            <Loader2 className="h-4 w-4 animate-spin" />
            Cargando...
        </SelectMessage>
    )
}

function SelectEmpty() {
    return (
        <SelectMessage>
            No hay opciones disponibles
        </SelectMessage>
    )
}

function SelectError({ errorMessage }: { errorMessage: string }) {
    return (
        <SelectMessage>
            <AlertCircle className="h-4 w-4" />
            {errorMessage}
        </SelectMessage>
    )
}
function CustomSelect({
    data,
    placeholder = "Selecciona una opción",
    defaultValue,
    value,
    onValueChange,
    disabled = false,
    loading = false,
    error = false,
    errorMessage = 'Error al cargar las opciones'
}: CustomSelectProps) {

    const isLoading = loading
    const isEmpty = data?.length === 0

    return (
        <Select
            onValueChange={onValueChange}
            defaultValue={defaultValue}
            value={value}
            disabled={disabled}
        >
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {isLoading ? (
                    <SelectLoading />
                ) : isEmpty ? (
                    <SelectEmpty />
                ) : error ? (
                    <SelectError errorMessage={errorMessage} />
                ) : (
                    data.map((item) => (
                        <SelectItem
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                        >
                            {item.label}
                        </SelectItem>
                    ))
                )}
            </SelectContent>
        </Select>
    )
}

export default CustomSelect