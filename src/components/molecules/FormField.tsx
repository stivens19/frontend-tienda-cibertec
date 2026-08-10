import { forwardRef } from 'react';
import { Input } from '../atoms/Input';
import type { InputHTMLAttributes } from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
    ({ label, id, ...inputProps }, ref) => {
        return (
            <div className="mb-3">
                <label htmlFor={id} className="form-label fw-semibold">
                    {label}
                </label>
                <Input id={id} ref={ref} {...inputProps} />
            </div>
        );
    }
);

FormField.displayName = "FormField";