'use client'
import React, { useContext, createContext, useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import { ProductData } from '@/Components/Products/Product/ProductCard';

type CartContextType = {
  cartItems: ProductData[] | null;
  handleAddToCart: (product: ProductData) => void;
  handleDeleteFromCart: (product: ProductData) => void;
  handleDecreaseQty: (product: ProductData) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartItems, setCartItems] = useState<ProductData[] | null>(() => {
    const storedCart = window.localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart).products : null;
  });

  const handleAddToCart = useCallback((product: ProductData) => {
    setCartItems((prev) => {
      let updatedCart;
      if (prev) {
        const findProduct = prev.findIndex((pro) => pro._id === product._id);
        if (findProduct !== -1) {
          const updatedProduct = {
            ...prev[findProduct],
            quantity: prev[findProduct].quantity + 1,
          };
          updatedCart = [...prev];
          updatedCart[findProduct] = updatedProduct;
        } else {
          updatedCart = [...prev, product];
        }
      } else {
        updatedCart = [product];
      }
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'The product has been added to your cart',
        showConfirmButton: false,
        timer: 1500,
      });
      const totalAmount = updatedCart.reduce((acc: any, productInfo) => {
        acc += productInfo.total * (productInfo.quantity || 1);
        return acc;
      }, 0);
      const cart = { products: updatedCart, totalAmount: totalAmount };
      window.localStorage.setItem('cart', JSON.stringify(cart));
      return updatedCart as ProductData[];
    });
  }, []);

  const handleDeleteFromCart = useCallback((product: ProductData) => {
    setCartItems((prev) => {
      let updatedCart: ProductData[] = [];
      if (prev) {
        updatedCart = prev.filter((pro) => pro._id !== product._id);
      }

      const totalAmount = updatedCart.reduce((acc: any, productInfo) => {
        acc += productInfo.total * (productInfo.quantity || 1);
        return acc;
      }, 0);

      const cart = { products: updatedCart, totalAmount: totalAmount };
      if (updatedCart.length > 0) {
        window.localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        window.localStorage.removeItem('cart');
      }

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'The product has been removed from your cart',
        showConfirmButton: false,
        timer: 1500,
      });

      return updatedCart as ProductData[];
    });
  }, []);

  const handleDecreaseQty = useCallback((product: ProductData) => {
    setCartItems((prev) => {
      let updatedCart: ProductData[] = [];
      if (prev) {
        const findProduct = prev.findIndex((pro) => pro._id === product._id);
        if (findProduct !== -1) {
          const updatedProduct = {
            ...prev[findProduct],
            quantity: Math.max(0, prev[findProduct].quantity - 1),
          };

          if (updatedProduct.quantity > 0) {
            updatedCart = [...prev];
            updatedCart[findProduct] = updatedProduct;
          } else {
            updatedCart = prev.filter((pro) => pro._id !== product._id);
          }
        }
      }

      const totalAmount = updatedCart.reduce((acc: any, productInfo) => {
        acc += productInfo.total * (productInfo.quantity || 1);
        return acc;
      }, 0);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'The product has been removed from your cart',
        showConfirmButton: false,
        timer: 1500,
      });

      const cart = { products: updatedCart, totalAmount: totalAmount };
      if (updatedCart.length > 0) {
        window.localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        window.localStorage.removeItem('cart');
      }

      return updatedCart as ProductData[];
    });
  }, []);

  const value: CartContextType = {
    cartItems,
    handleAddToCart,
    handleDeleteFromCart,
    handleDecreaseQty,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartContextProvider');
  }
  return context;
};