interface AttributeItemProps {
    name: string
    value: number
    label: string
}

export function AttributeItem({ name, value, label }: AttributeItemProps) {
    // Función para calcular el modificador de atributo
    const calcularModificador = (valor: number): string => {
        const mod = Math.floor((valor - 10) / 2)
        return mod >= 0 ? `+${mod}` : mod.toString()
    }

    return (
        <div className="bg-muted rounded-lg p-3 text-center">
            <div className="text-xs uppercase text-muted-foreground mb-1">
                {label}
            </div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-sm font-medium">{calcularModificador(value)}</div>
        </div>
    )
} 