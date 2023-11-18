'use client';
import { useContext, createContext, useState, useCallback } from 'react';
import { CartProductType } from './page';
import Cookies from 'js-cookie';

const email = Cookies.get('email');

type CartContextType = {
  cartProducts: CartProductType[] | null;
  handleAddToCart: (product: CartProductType) => void;
  handleDeleteFromCart: (product: CartProductType) => void;
  handleDecreaseQty: (product: CartProductType) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(() => {
    const storedCart = window.localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart).products : null;
  });

  const handleAddToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
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

      const totalAmount = updatedCart.reduce((acc: any, productInfo) => {
        acc += productInfo.total * (productInfo.quantity || 1);
        return acc;
      }, 0);

      const cart = { products: updatedCart, totalAmount: totalAmount, email: email };
      window.localStorage.setItem('cart', JSON.stringify(cart));
      return updatedCart as CartProductType[];
    });
  }, []);

  const handleDeleteFromCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart: CartProductType[] = [];
      if (prev) {
        updatedCart = prev.filter((pro) => pro._id !== product._id);
      }

      const totalAmount = updatedCart.reduce((acc: any, productInfo) => {
        acc += productInfo.total * (productInfo.quantity || 1);
        return acc;
      }, 0);

      const cart = { products: updatedCart, totalAmount: totalAmount, email: email };
      if (updatedCart.length > 0) {
        window.localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        window.localStorage.removeItem('cart');
      }

      return updatedCart as CartProductType[];
    });
  }, []);

  const handleDecreaseQty = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart: CartProductType[] = [];
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

      const cart = { products: updatedCart, totalAmount: totalAmount, email: email };
      if (updatedCart.length > 0) {
        window.localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        window.localStorage.removeItem('cart');
      }

      return updatedCart as CartProductType[];
    });
  }, []);

  const value: CartContextType = {
    cartProducts,
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
