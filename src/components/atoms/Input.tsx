import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = (props: InputProps) => {
    return <input className="form-control" {...props} />;
};