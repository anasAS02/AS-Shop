'use client'
import {useContext, createContext, useState, useCallback} from 'react';
import { CartProductType } from './page';

type CartContextType = {
    cartTotalQuantity: number;
    cartProducts: CartProductType[] | null;
    handleAddToCart: (product: CartProductType) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string]: any;
}


export const CartContextProvider = (props: Props) => {
    const [cartTotalQuantity, setCartTotalQuantity] = useState(10);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

    const handleAddToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;
            if (prev) {
                const findProduct = prev.findIndex((pro) => pro._id === product._id);
                if(findProduct !== -1){
                    const updatedProduct = {
                        ...prev[findProduct],
                        quantity: prev[findProduct].quantity + 1,
                    };
                    updatedCart = [...prev];
                    updatedCart[findProduct] = updatedProduct;
                }else{
                    updatedCart = [...prev, product];
                }
            } else {
                updatedCart = [product];
            }
            window.localStorage.setItem('cart', JSON.stringify(updatedCart))
            return updatedCart as CartProductType[];
        });
    }, []);

    const value: CartContextType = {
        cartTotalQuantity,
        cartProducts,
        handleAddToCart
    };

    return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartContextProvider');
    }
    return context;
}