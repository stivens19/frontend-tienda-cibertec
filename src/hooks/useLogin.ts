import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { useAuth } from './useAuth';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login: authenticateUser } = useAuth();
    const navigate = useNavigate();

    const login = async (credentials: Record<string, string>) => {
        setLoading(true);
        setError(null);

        try {
            const data = await AuthService.login(credentials);
            authenticateUser(data.access_token);
            navigate('/admin/dashboard', { replace: true });
        } catch (err) {
            setError('Credenciales inválidas o error de conexión.');
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};