import type { Order } from '../types';
import api from './api';


export interface CheckoutPayload {
    customer_name: string;
    customer_email: string;
    customer_document?: string;
    customer_phone?: string;
    items: {
        product_id: number;
        quantity: number;
    }[];
}

export const OrderService = {
    checkout: async (payload: CheckoutPayload) => {
        const response = await api.post('/orders', payload);
        return response.data;
    },

    getAll: async () => {
        const response = await api.get('/orders');
        return response.data;
    },

    getById: async (id: number) => {
        const response = await api.get<Order>(`/orders/${id}`);
        return response.data;
    },

    updateStatus: async (id: number, status: string) => {
        const response = await api.patch(`/orders/${id}/status`, { status });
        return response.data;
    }
};