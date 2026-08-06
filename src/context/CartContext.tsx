import { createContext, useState,  useMemo, useEffect, type ReactNode } from 'react';
import type { Product } from '../types';


export interface CartItem extends Product {
    cartQuantity: number;
}

interface CartContextProps {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    decreaseQuantity: (productId: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    cartTotal: number;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        try {
            const savedCart = localStorage.getItem('shopping_cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error parseando el carrito de localStorage', error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('shopping_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            
            if (existingItem) {
                if (existingItem.cartQuantity >= product.stock) return prevCart;
                
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, cartQuantity: item.cartQuantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, cartQuantity: 1 }];
        });
    };

    const decreaseQuantity = (productId: number) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === productId);
            if (!existingItem) return prevCart;

            if (existingItem.cartQuantity === 1) {
                return prevCart.filter((item) => item.id !== productId);
            }

            return prevCart.map((item) =>
                item.id === productId
                    ? { ...item, cartQuantity: item.cartQuantity - 1 }
                    : item
            );
        });
    };

    const removeFromCart = (productId: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = useMemo(() => {
        return cart.reduce((total, item) => {
            return total + (Number(item.price) * item.cartQuantity);
        }, 0);
    }, [cart]);

    return (
        <CartContext.Provider 
            value={{ cart, addToCart, decreaseQuantity, removeFromCart, clearCart, cartTotal }}
        >
            {children}
        </CartContext.Provider>
    );
};