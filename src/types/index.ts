export interface Product {
    id: number;
    name: string;
    description: string | null;
    price: number | string; 
    stock: number;
    image_url: string | null;
}

export interface OrderItem {
    id: number;
    product_id: number;
    quantity: number;
    unit_price: string;
    product?: Product;
}

export interface Order {
    id: number;
    customer_name: string;
    customer_email: string;
    customer_document: string | null;
    customer_phone: string | null;
    total: string;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    created_at: string;
    order_items?: OrderItem[];
}