import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface TextAreaFormProps<T extends FieldValues> {
    form: UseFormReturn<T>
    name: Path<T>
    label: string
    description?: string
    placeholder?: string
    TextAreaClassName?: string
}

export function TextAreaForm<T extends FieldValues>({ form, name, label, description, placeholder = "", TextAreaClassName = "" }: TextAreaFormProps<T>) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder={placeholder}
                            className={cn("resize-none", TextAreaClassName)}
                            {...field}
                        />
                    </FormControl>
                    {description && (
                        <FormDescription>
                            {description}
                        </FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}