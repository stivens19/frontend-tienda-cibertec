import { Outlet, Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

export const PublicLayout = () => {
    const { cart } = useCart();
    
    const totalItems = cart.reduce((acc, item) => acc + item.cartQuantity, 0);

    return (
        <div className="d-flex flex-column min-vh-100">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/">Tienda Virtual</Link>
                    
                    <div className="ms-auto d-flex gap-3 align-items-center">
    
                        <Link className="btn btn-warning position-relative" to="/checkout">
                            Carrito
                            {totalItems > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                        
                        <Link className="btn btn-outline-light" to="/admin/login">Admin</Link>
                    </div>
                </div>
            </nav>

            <main className="flex-grow-1 container py-4">
                <Outlet />
            </main>

            <footer className="bg-light text-center py-3 mt-auto border-top">
                <p className="mb-0 text-muted">© 2026 - Todos los derechos reservados</p>
            </footer>
        </div>
    );
};