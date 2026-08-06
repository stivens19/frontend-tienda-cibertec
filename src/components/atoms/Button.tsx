import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline-primary';
}

export const Button = ({ children, variant = 'primary', ...props }: ButtonProps) => {
    return (
        <button className={`btn btn-${variant} w-100`} {...props}>
            {children}
        </button>
    );
};