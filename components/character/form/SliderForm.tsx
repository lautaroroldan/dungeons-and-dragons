import type { FieldValues, UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";
import { Slider } from "@/components/ui/slider";
type SliderProps = React.ComponentProps<typeof Slider>

export type SliderFormProps<T extends FieldValues> =
    UseControllerProps<T> & Omit<SliderProps, "value" | "defaultValue">;


export function SliderForm<T extends FieldValues>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
    onChange,
    ...props
}: SliderFormProps<T>) {
    const {
        field: { value, onChange: fieldOnChange, ...field },
        fieldState,
    } = useController<T>({
        name,
        control,
        defaultValue,
        rules,
        shouldUnregister,
    });
    return (
        <Slider
            value={Array.isArray(value) ? value : [value || 0]}
            onValueChange={(values) => {
                const newValue = values[0];
                fieldOnChange(newValue);
            }}
            aria-errormessage={fieldState.error?.message}
            {...field}
            {...props}
        />
    );
}