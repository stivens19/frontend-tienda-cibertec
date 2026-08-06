import type { Order } from "../../types";


interface OrderDetailModalProps {
    order: Order | null;
    onClose: () => void;
}

export const OrderDetailModal = ({ order, onClose }: OrderDetailModalProps) => {
    if (!order) return null;

    return (
        <>
            <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>

            <div className="modal fade show d-block" tabIndex={-1} style={{ zIndex: 1050 }} onClick={onClose}>
                <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content border-0 shadow">
                        
                        <div className="modal-header bg-light">
                            <h5 className="modal-title fw-bold">
                                Detalle del Pedido #{order.id}
                            </h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        
                        <div className="modal-body">
                            <div className="row mb-4">
                                <div className="col-sm-6">
                                    <h6 className="fw-bold text-muted mb-1">Datos del Cliente</h6>
                                    <p className="mb-0">{order.customer_name}</p>
                                    <p className="mb-0 text-muted">{order.customer_email}</p>
                                    <p className="mb-0 text-muted">{order.customer_document ? `Doc: ${order.customer_document}` : 'Sin documento'}</p>
                                </div>
                                <div className="col-sm-6 text-sm-end mt-3 mt-sm-0">
                                    <h6 className="fw-bold text-muted mb-1">Resumen</h6>
                                    <p className="mb-0">Fecha: {new Date(order.created_at).toLocaleString()}</p>
                                    <p className="mb-0">
                                        Estado: <span className="badge bg-secondary text-capitalize">{order.status}</span>
                                    </p>
                                </div>
                            </div>

                            <h6 className="fw-bold text-muted mb-2">Artículos Comprados</h6>
                            <div className="table-responsive">
                                <table className="table table-sm table-bordered align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Producto</th>
                                            <th className="text-center">Precio Unit.</th>
                                            <th className="text-center">Cantidad</th>
                                            <th className="text-end">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.order_items?.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.product?.name || `Producto ID: ${item.product_id}`}</td>
                                                <td className="text-center">S/ {item.unit_price}</td>
                                                <td className="text-center">{item.quantity}</td>
                                                <td className="text-end fw-semibold">
                                                    S/ {(Number(item.unit_price) * item.quantity).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={3} className="text-end fw-bold">Total:</td>
                                            <td className="text-end fw-bold text-primary fs-5">S/ {order.total}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                        
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Cerrar
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
};