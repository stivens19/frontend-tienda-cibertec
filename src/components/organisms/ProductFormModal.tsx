import { useState, useEffect } from 'react';
import { ProductService } from '../../services/ProductService';
import type { Product } from '../../types';

interface ProductFormModalProps {
    product: Product | null;
    onClose: () => void;
    onSuccess: () => void;
}

export const ProductFormModal = ({ product, onClose, onSuccess }: ProductFormModalProps) => {
    const isEditing = !!product;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('0');
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescription(product.description || '');
            setPrice(product.price.toString());
            setStock(product.stock.toString());
        }
    }, [product]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock', stock);
        
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            if (isEditing) {
                await ProductService.update(product.id, formData);
            } else {
                await ProductService.create(formData);
            }
            onSuccess(); 
            onClose();  
        } catch (err) {
            setError('Error al guardar el producto. Verifica los datos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
            <div className="modal fade show d-block" tabIndex={-1} style={{ zIndex: 1050 }} onClick={onClose}>
                <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content border-0 shadow">
                        <form onSubmit={handleSubmit}>
                            
                            <div className="modal-header bg-light">
                                <h5 className="modal-title fw-bold">
                                    {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
                                </h5>
                                <button type="button" className="btn-close" onClick={onClose}></button>
                            </div>
                            
                            <div className="modal-body">
                                {error && <div className="alert alert-danger">{error}</div>}
                                
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Nombre</label>
                                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Descripción</label>
                                    <textarea className="form-control" rows={3} value={description} onChange={e => setDescription(e.target.value)}></textarea>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-6">
                                        <label className="form-label fw-semibold">Precio (S/)</label>
                                        <input type="number" step="0.01" className="form-control" value={price} onChange={e => setPrice(e.target.value)} required />
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label fw-semibold">Stock Inicial</label>
                                        <input type="number" className="form-control" value={stock} onChange={e => setStock(e.target.value)} required />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Imagen del Producto</label>
                                    <input type="file" className="form-control" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />
                                    {isEditing && !imageFile && (
                                        <div className="form-text">Deja este campo vacío si no deseas cambiar la imagen actual.</div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="modal-footer border-0">
                                <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Guardando...' : 'Guardar Producto'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};