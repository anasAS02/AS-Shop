"use client"
import { createContext, useContext, useState, Dispatch, SetStateAction } from "react";

interface contextProps {
    isLoggedIn: boolean,
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>,
    isLoading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    successMsg: string | null,
    setSuccessMsg: Dispatch<SetStateAction<string | null>>,
    err: string | null,
    setErr: Dispatch<SetStateAction<string | null>>,
}

const StatusContext = createContext<contextProps>({
    isLoggedIn: false,
    setIsLoggedIn: (): boolean => false,
    isLoading: false,
    setIsLoading: (): boolean => false,
    successMsg: null,
    setSuccessMsg: (): string | null => null,
    err: null,
    setErr: (): string | null => null,
});

export const StatusContextProvider = ({ children }: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [err, setErr] = useState<string | null>(null);

    return(
        <StatusContext.Provider value={{isLoggedIn, setIsLoggedIn, isLoading, setIsLoading, successMsg, setSuccessMsg, err, setErr}}>
            { children }
        </StatusContext.Provider>
    )
}

export const useStatusContext = () => useContext(StatusContext);