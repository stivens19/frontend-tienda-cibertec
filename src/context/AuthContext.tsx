import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        !!localStorage.getItem('access_token')
    );

    const login = (token: string) => {
        localStorage.setItem('access_token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};