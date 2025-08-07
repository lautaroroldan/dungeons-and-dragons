import React from 'react'
import { Control, Controller } from 'react-hook-form'
import CustomSelect, { CustomSelectProps } from '@shared/components/ui/custom-select/CustomSelect'

interface FormSelectProps extends Omit<CustomSelectProps, 'onValueChange' | 'value'> {
    name: string
    control: Control<any>
}


function FormSelect({ name, control, data, ...props }: FormSelectProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <CustomSelect
                    data={data}
                    value={field.value}
                    onValueChange={field.onChange}
                    {...props}
                />
            )}
        />
    )
}

export default FormSelect