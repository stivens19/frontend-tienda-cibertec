import { ProductGrid } from '../components/organisms/ProductGrid';

export const CatalogPage = () => {
    return (
        <div className="container">
            <header className="mb-4 text-center">
                <h1 className="fw-bold">Nuestros Productos</h1>
                <p className="text-muted">Explora nuestra colección y encuentra lo que necesitas.</p>
            </header>
            
            <ProductGrid />
        </div>
    );
};