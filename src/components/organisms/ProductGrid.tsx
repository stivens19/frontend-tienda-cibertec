import { useCart } from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProducts";
import { ProductCard } from "../molecules/ProductCard";

export const ProductGrid = () => {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="alert alert-info text-center" role="alert">
        No hay productos disponibles en el catálogo en este momento.
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
      {products.map((product) => (
        <div className="col" key={product.id}>
          <ProductCard
            product={product}
            onAddToCart={(p) => addToCart(p)}
          />
        </div>
      ))}
    </div>
  );
};
