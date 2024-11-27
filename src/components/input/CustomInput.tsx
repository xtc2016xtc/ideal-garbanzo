import React from 'react'
import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'
import { FormControl, FormField, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = authFormSchema('sign-up')

interface CustomInputProps {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string
}

const CustomInput: React.FC<CustomInputProps> = ({ control, name, label, placeholder }) => {
    const inputId = `form-item-${name}`; // Generate a unique id based on the name
    const autocomplete = name === 'password' ? 'current-password' : 'off'

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="form-item">
                    <FormLabel className="form-label" htmlFor={inputId}>
                        {label}
                    </FormLabel>
                    <div className="flex w-full flex-col">
                        <FormControl>
                            <Input
                                id={inputId} // Assign the generated id here
                                placeholder={placeholder}
                                className="input-class"
                                type={name === 'password' ? 'password' : 'text'}
                                autoComplete={autocomplete}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className="form-message mt-2" />
                    </div>
                </div>
            )}
        />
    )
}

export default CustomInput

