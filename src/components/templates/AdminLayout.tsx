import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AuthService } from '../../services/AuthService';

export const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await AuthService.logout();
        logout();
        navigate('/admin/login', { replace: true });
    };

    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            <nav className="navbar navbar-expand-lg navbar-primary bg-primary shadow-sm">
                <div className="container">
                    <Link className="navbar-brand text-white fw-bold" to="/admin/dashboard">
                        Panel de Control
                    </Link>
                    <div className="d-flex gap-3 align-items-center">
                        <Link className="text-white text-decoration-none" to="/admin/products">Productos</Link>
                        <Link className="text-white text-decoration-none" to="/admin/orders">Pedidos</Link>
                        <button onClick={handleLogout} className="btn btn-sm btn-light text-primary fw-semibold">
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </nav>
            <main className="container py-4 bg-white shadow-sm mt-4 rounded flex-grow-1 mb-4">
                <Outlet />
            </main>
        </div>
    );
};