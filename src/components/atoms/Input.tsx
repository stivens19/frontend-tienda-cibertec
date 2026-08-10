import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (props, ref) => {
        return <input ref={ref} className="form-control" {...props} />;
    }
);

Input.displayName = 'Input';