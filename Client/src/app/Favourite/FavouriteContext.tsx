'use client'
import { useContext, createContext, useState, useCallback } from 'react';
import { EMAIL } from '@/Utils/Cookies';

type FavouritesContextType = {
  favouriteItems: string[] | null;
  handleAddToFavourites: (productId: string) => void;
  handleRemoveFromFavourites: (productId: string) => void;
  isProductFavorited: (productId: string) => boolean;
};

export const FavouritesContext = createContext<FavouritesContextType | null>(null);

interface FavouritesProviderProps {
  children: React.ReactNode;
}

export const FavouritesProvider: React.FC<FavouritesProviderProps> = ({ children }) => {
  const [favouriteItems, setFavouriteItems] = useState<string[] | null>(() => {
    const storedFavourites = window.localStorage.getItem('favourites');
    return storedFavourites ? JSON.parse(storedFavourites).products : null;
  });

  const handleAddToFavourites = useCallback((productId: string) => {
    setFavouriteItems((prev) => {
      const updatedFavourites = prev ? [...prev, productId] : [productId];
      const favouritesData = { products: updatedFavourites, email: EMAIL };
      window.localStorage.setItem('favourites', JSON.stringify(favouritesData));
      return updatedFavourites;
    });
  }, []);

  const handleRemoveFromFavourites = useCallback((productId: string) => {
    setFavouriteItems((prev) => {
      const updatedFavourites = prev ? prev.filter((id) => id !== productId) : [];
      const favouritesData = { products: updatedFavourites, email: EMAIL };
      if (updatedFavourites.length > 0) {
        window.localStorage.setItem('favourites', JSON.stringify(favouritesData));
      } else {
        window.localStorage.removeItem('favourites');
      }
      return updatedFavourites;
    });
  }, []);

  const isProductFavorited = useCallback((productId: string) => {
    return favouriteItems ? favouriteItems.includes(productId) : false;
  }, [favouriteItems]);

  const value: FavouritesContextType = {
    favouriteItems,
    handleAddToFavourites,
    handleRemoveFromFavourites,
    isProductFavorited,
  };

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>;
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
};