import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PublicRouteProps {
    restricted?: boolean;
}

export const PublicRoute = ({ restricted = false }: PublicRouteProps) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated && restricted) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <Outlet />;
};