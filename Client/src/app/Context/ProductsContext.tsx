'use client'
import { useState, createContext, Dispatch, SetStateAction, useContext } from "react";

interface ContextProps{
    grid: boolean,
    setGrid: Dispatch<SetStateAction<boolean>>,

    lowest: boolean | null,
    setLowest: Dispatch<SetStateAction<boolean | null>>,

    min: string,
    setMin: Dispatch<SetStateAction<string>>,

    max: string,
    setMax: Dispatch<SetStateAction<string>>,
}

const ProductsContext = createContext<ContextProps>({
    grid: true,
    setGrid: (): boolean => true,

    lowest: null,
    setLowest: (): boolean | null => null,

    min: '',
    setMin: (): string => '',
    
    max: '',
    setMax: (): string => '',
})

export const ProductsContextProvider = ({ children }: any) => {
    const [grid, setGrid] = useState<boolean>(true);
    const [lowest, setLowest] = useState<boolean | null>(null);
    const [min, setMin] = useState<string>('');
    const [max, setMax] = useState<string>('');

    return(
        <ProductsContext.Provider  value={{grid, setGrid, lowest, setLowest, min, setMin, max, setMax}}>
            {children}
        </ProductsContext.Provider>
    )
}

export const useProductsContext = () => useContext(ProductsContext);