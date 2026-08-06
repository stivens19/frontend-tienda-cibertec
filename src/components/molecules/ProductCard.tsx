import type { Product } from '../../types';
import { Button } from '../atoms/Button';

interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
    const placeholderImg = 'https://via.placeholder.com/300x200?text=Sin+Imagen';

    return (
        <div className="card h-100 shadow-sm border-0">
            <img 
                src={product.image_url || placeholderImg} 
                className="card-img-top" 
                alt={product.name}
                style={{ objectFit: 'cover', height: '200px' }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate" title={product.name}>
                    {product.name}
                </h5>
                
                <p className="card-text text-muted small flex-grow-1">
                    {product.description || 'Sin descripción disponible.'}
                </p>
                
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="fs-5 fw-bold text-primary">
                        S/ {Number(product.price).toFixed(2)}
                    </span>
                    <span className="badge bg-secondary">
                        Stock: {product.stock}
                    </span>
                </div>

                <Button 
                    variant="primary" 
                    onClick={() => onAddToCart && onAddToCart(product)}
                    disabled={product.stock <= 0}
                >
                    {product.stock > 0 ? 'Agregar al carrito' : 'Agotado'}
                </Button>
            </div>
        </div>
    );
};