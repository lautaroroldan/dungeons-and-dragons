import { useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { AlertCircle, Loader2 } from "lucide-react"
import axios from "axios"
import { BasicTable } from "@/db/schema"
import { cn } from "@/lib/utils"
import { useRaces, useClasses, useBackgrounds, useAlignments } from "@/hooks/useStaticData"

interface BaseSelectProps {
    label: string
    id: string
    value: string
    onValueChange: (value: string) => void
    placeholder?: string
    className?: string
    disabled?: boolean
    required?: boolean
}

interface CachedSelectProps extends BaseSelectProps {
    type: 'races' | 'classes' | 'backgrounds' | 'alignments'
}

interface DynamicSelectProps extends BaseSelectProps {
    url: string
}

interface SmartSelectProps extends BaseSelectProps {
    /** Para datos estáticos cacheados */
    type?: 'races' | 'classes' | 'backgrounds' | 'alignments'
    /** Para datos dinámicos via API */
    url?: string
}

// Componente inteligente que decide automáticamente qué estrategia usar
export function SmartSelect(props: SmartSelectProps) {
    if (props.type) {
        // Usar caché para datos estáticos
        return <CachedSelect {...props} type={props.type} />
    } else if (props.url) {
        // Usar fetch para datos dinámicos
        return <DynamicSelect {...props} url={props.url} />
    } else {
        throw new Error("SmartSelect requiere 'type' o 'url'")
    }
}

// Nuevo componente optimizado con caché
export function CachedSelect({
    label,
    id,
    type,
    value,
    className,
    onValueChange,
    placeholder = "Selecciona una opción",
    disabled = false,
    required = false
}: CachedSelectProps) {
    const hooks = {
        races: useRaces,
        classes: useClasses,
        backgrounds: useBackgrounds,
        alignments: useAlignments
    }

    const { data: items, loading, error, refetch } = hooks[type]()

    return (
        <SelectComponent
            label={label}
            id={id}
            value={value}
            onValueChange={onValueChange}
            placeholder={placeholder}
            className={className}
            disabled={disabled}
            required={required}
            items={items}
            loading={loading}
            error={error}
            onRetry={refetch}
        />
    )
}

// Componente original mantenido para compatibilidad
export function DynamicSelect({
    label,
    id,
    url,
    value,
    className,
    onValueChange,
    placeholder = "Selecciona una opción",
    disabled = false,
    required = false
}: DynamicSelectProps) {
    const [items, setItems] = useState<BasicTable[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await axios.get(url)
            setItems(response.data)
        } catch (error) {
            console.error("Error fetching data:", error)
            setError("Error al cargar las opciones")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [url])

    return (
        <SelectComponent
            label={label}
            id={id}
            value={value}
            onValueChange={onValueChange}
            placeholder={placeholder}
            className={className}
            disabled={disabled}
            required={required}
            items={items}
            loading={loading}
            error={error}
            onRetry={fetchData}
        />
    )
}

// Componente base compartido para evitar duplicación
function SelectComponent({
    label,
    id,
    value,
    onValueChange,
    placeholder,
    className,
    disabled,
    required,
    items,
    loading,
    error,
    onRetry
}: {
    label: string
    id: string
    value: string
    onValueChange: (value: string) => void
    placeholder?: string
    className?: string
    disabled?: boolean
    required?: boolean
    items: BasicTable[]
    loading: boolean
    error: string | null
    onRetry: () => void
}) {
    return (
        <div className={cn("space-y-2", className)}>
            <Label htmlFor={id} className="flex items-center gap-1">
                {label}
                {required && <span className="text-red-500">*</span>}
            </Label>
            <Select
                value={value}
                onValueChange={onValueChange}
                disabled={disabled || loading}
            >
                <SelectTrigger id={id} className={error ? "border-red-300" : ""}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {loading ? (
                        <SelectItem value="loading" disabled>
                            <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Cargando...
                            </div>
                        </SelectItem>
                    ) : error ? (
                        <SelectItem value="error" disabled>
                            <div className="flex items-center gap-2 text-red-600">
                                <AlertCircle className="h-4 w-4" />
                                <span>{error}</span>
                            </div>
                        </SelectItem>
                    ) : items.length === 0 ? (
                        <SelectItem value="empty" disabled>
                            No hay opciones disponibles
                        </SelectItem>
                    ) : (
                        items.map((item: BasicTable) => (
                            <SelectItem key={item.id} value={item.id.toString()}>
                                {item.name}
                            </SelectItem>
                        ))
                    )}
                </SelectContent>
            </Select>
            {error && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                    <button
                        type="button"
                        onClick={onRetry}
                        className="underline hover:no-underline"
                    >
                        Reintentar
                    </button>
                </div>
            )}
        </div>
    )
}

