import { useState, useEffect, useCallback } from 'react';
import type { Product } from '../types';
import { ProductService } from '../services/ProductService';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await ProductService.getAll();
            setProducts(data.data || []); 
        } catch (err) {
            setError('No se pudo cargar el catálogo. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return { products, loading, error, refetch: fetchProducts };
};