import { FormControl, FormField } from '@shared/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { completeCharacterSchema } from '@/lib/validations/character'
import { FormItem, FormLabel, FormMessage } from '@shared/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/components/ui/select'
import { BasicTable } from '@/db/schema'
import useSWR from 'swr'

interface SelectFormProps {
    form: UseFormReturn<z.infer<typeof completeCharacterSchema>>
    name: keyof z.infer<typeof completeCharacterSchema>
    fetcher: () => Promise<BasicTable[]>
    fetchKey: string
    label: string
    placeholder?: string
}

export function SelectForm({ form, name, label, fetcher, fetchKey, placeholder = "Selecciona una opción" }: SelectFormProps) {

    const { data: options, isLoading } = useSWR(fetchKey, fetcher)

    return (
        <div>
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
                                {isLoading ? <SelectItem value="loading">Cargando...</SelectItem> : options?.map((option) => (
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
        </div>
    )
}