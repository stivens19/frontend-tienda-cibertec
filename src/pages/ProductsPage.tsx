import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductService } from '../services/ProductService';
import { ProductFormModal } from '../components/organisms/ProductFormModal';
import type { Product } from '../types';

export const ProductsPage = () => {
    const { products, loading, error, refetch } = useProducts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);

    const handleCreateNew = () => {
        setProductToEdit(null);
        setIsModalOpen(true);
    };

    const handleEdit = (product: Product) => {
        setProductToEdit(product);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            try {
                await ProductService.delete(id);
                refetch();
            } catch (err) {
                alert('No se pudo eliminar el producto. Podría estar vinculado a un pedido.');
            }
        }
    };

    if (loading) return <div className="p-4 text-center">Cargando catálogo...</div>;
    if (error) return <div className="p-4 alert alert-danger">{error}</div>;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="mb-0">Gestión de Productos</h3>
                <button className="btn btn-primary fw-semibold" onClick={handleCreateNew}>
                    + Nuevo Producto
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-hover align-middle border">
                    <thead className="table-light">
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-4 text-muted">No hay productos registrados.</td></tr>
                        ) : (
                            products.map(product => (
                                <tr key={product.id}>
                                    <td>
                                        <img 
                                            src={product.image_url || 'https://via.placeholder.com/50?text=Sin+Foto'} 
                                            alt={product.name} 
                                            className="rounded object-fit-cover"
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                    </td>
                                    <td className="fw-semibold">{product.name}</td>
                                    <td>S/ {Number(product.price).toFixed(2)}</td>
                                    <td>
                                        <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2 justify-content-center">
                                            <button className="btn btn-sm btn-outline-secondary" onClick={() => handleEdit(product)}>
                                                Editar
                                            </button>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(product.id)}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <ProductFormModal 
                    product={productToEdit} 
                    onClose={() => setIsModalOpen(false)} 
                    onSuccess={refetch} 
                />
            )}
        </div>
    );
};