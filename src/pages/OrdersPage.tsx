import { useState } from 'react';
import { useOrders } from '../hooks/useOrders';
import { OrderDetailModal } from '../components/organisms/OrderDetailModal';
import type { Order } from '../types';

export const OrdersPage = () => {
    const { orders, loading, error, changeStatus } = useOrders();
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const getStatusBadge = (status: string) => { 
        const badges: Record<string, string> = { pending: 'bg-warning text-dark', processing: 'bg-info text-dark', completed: 'bg-success', cancelled: 'bg-danger' };
        return badges[status] || 'bg-secondary';
    };

    const getStatusName = (status: string) => { 
        const names: Record<string, string> = { pending: 'Pendiente', processing: 'En Proceso', completed: 'Completado', cancelled: 'Cancelado' };
        return names[status] || status;
    };

    if (loading) return <div className="p-4 text-center">Cargando pedidos...</div>;
    if (error) return <div className="p-4 alert alert-danger">{error}</div>;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="mb-0">Gestión de Pedidos</h3>
            </div>

            <div className="table-responsive">
                <table className="table table-hover align-middle border">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th><th>Fecha</th><th>Cliente</th><th>Total</th><th>Estado</th>
                            <th className="text-center">Acciones</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr><td colSpan={6} className="text-center py-4 text-muted">Aún no hay pedidos registrados.</td></tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="fw-bold">#{order.id}</td>
                                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                    <td>{order.customer_name}</td>
                                    <td className="fw-semibold text-primary">S/ {order.total}</td>
                                    <td>
                                        <span className={`badge ${getStatusBadge(order.status)}`}>
                                            {getStatusName(order.status)}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2 justify-content-center">
                                            <select 
                                                className="form-select form-select-sm w-auto"
                                                value={order.status}
                                                onChange={(e) => changeStatus(order.id, e.target.value)}
                                            >
                                                <option value="pending">Pendiente</option>
                                                <option value="processing">En Proceso</option>
                                                <option value="completed">Completado</option>
                                                <option value="cancelled">Cancelado</option>
                                            </select>
                                            
                                            <button 
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => setSelectedOrder(order)}
                                            >
                                                Ver
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <OrderDetailModal 
                order={selectedOrder} 
                onClose={() => setSelectedOrder(null)} 
            />
        </div>
    );
};