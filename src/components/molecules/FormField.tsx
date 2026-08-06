import { Input } from '../atoms/Input';
import type { InputHTMLAttributes } from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
}

export const FormField = ({ label, id, ...inputProps }: FormFieldProps) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label fw-semibold">
                {label}
            </label>
            <Input id={id} {...inputProps} />
        </div>
    );
};