import { FormControl, FormField } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { completeCharacterSchema } from '@/lib/validations/character'
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useStaticData } from '@/hooks/useStaticData'
import { BasicTable } from '@/db/schema'

interface SelectFormProps {
    form: UseFormReturn<z.infer<typeof completeCharacterSchema>>
    name: keyof z.infer<typeof completeCharacterSchema>
    url: () => Promise<BasicTable[]>
    label: string
    placeholder?: string
}

export function SelectForm({ form, name, label, url, placeholder = "Selecciona una opción" }: SelectFormProps) {

    const { data: options, loading } = useStaticData(url, 'id')

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value?.toString()}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {loading ? <SelectItem value="loading">Cargando...</SelectItem> : options?.map((option) => (
                                <SelectItem key={option.id} value={option.id.toString()}>
                                    {option.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}