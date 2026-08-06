import { useState } from 'react';
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';
import { useLogin } from '../../hooks/useLogin';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useLogin();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login({ email, password });
    };

    return (
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm border-0">
            <h4 className="mb-4 text-center">Iniciar Sesión</h4>
            
            {error && <div className="alert alert-dark text-center">{error}</div>}
            
            <FormField 
                id="email"
                label="Correo Electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            
            <FormField 
                id="password"
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            
            <div className="mt-4">
                <Button type="submit" disabled={loading}>
                    {loading ? 'Ingresando...' : 'Acceder'}
                </Button>
            </div>
        </form>
    );
};