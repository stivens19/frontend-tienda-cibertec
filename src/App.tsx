import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; 

import { PrivateRoute } from './routes/PrivateRoute';
import { PublicRoute } from './routes/PublicRoute';

import { PublicLayout } from './components/templates/PublicLayout';
import { AdminLayout } from './components/templates/AdminLayout';

import { LoginPage } from './pages/LoginPage';
import { CatalogPage } from './pages/CatalogPage';
import { CheckoutPage } from './pages/CheckoutPage'; 
import { DashboardPage } from './pages/DashboardPage';
import { OrdersPage } from './pages/OrdersPage'; 
import { ProductsPage } from './pages/ProductsPage';


export const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<PublicRoute />}>
                            <Route element={<PublicLayout />}>
                                <Route path="/" element={<CatalogPage />} />
                                <Route path="/checkout" element={<CheckoutPage />} /> 
                            </Route>
                        </Route>

                        <Route element={<PublicRoute restricted={true} />}>
                            <Route path="/admin/login" element={<LoginPage />} />
                        </Route>

                        <Route element={<PrivateRoute />}>
                            <Route element={<AdminLayout />}>
                                <Route path="/admin/dashboard" element={<DashboardPage />} />
                                <Route path="/admin/orders" element={<OrdersPage />} /> 
                                <Route path="/admin/products" element={<ProductsPage />} />
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;