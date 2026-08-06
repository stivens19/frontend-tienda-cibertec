import api from './api';
import type { Product } from '../types';

export const ProductService = {
    getAll: async () => {
        const response = await api.get('/products');
        return response.data; 
    },

    getById: async (id: number) => {
        const response = await api.get<Product>(`/products/${id}`);
        return response.data;
    },

    create: async (formData: FormData) => {
        const response = await api.post('/products', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    update: async (id: number, formData: FormData) => {
        formData.append('_method', 'PUT'); 
        const response = await api.post(`/products/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    delete: async (id: number) => {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    }
};