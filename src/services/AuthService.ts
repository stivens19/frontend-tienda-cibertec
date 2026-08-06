import api from './api';

export const AuthService = {
    login: async (credentials: Record<string, string>) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },
    logout: async () => {
        try {
            await api.post('/auth/logout');
        } finally {
            localStorage.removeItem('access_token');
        }
    },
    me: async () => {
        const response = await api.post('/auth/me');
        return response.data;
    }
};