import { useState, useEffect, useCallback } from 'react';
import { OrderService } from '../services/OrderService';
import type { Order } from '../types';


export const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await OrderService.getAll();
            setOrders(data.data || []);
        } catch (err) {
            setError('Error al cargar el historial de pedidos.');
        } finally {
            setLoading(false);
        }
    }, []);

    const changeStatus = async (id: number, status: string) => {
        try {
            await OrderService.updateStatus(id, status);
            await fetchOrders(); 
        } catch (err) {
            alert('No se pudo actualizar el estado del pedido.');
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return { orders, loading, error, changeStatus };
};