"use client"
import { createContext, ReactNode, useContext, useState, Dispatch, SetStateAction } from "react";

interface contextProps {
    isLoggedIn: boolean,
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>,
}

const GlobalContext = createContext<contextProps>({
    isLoggedIn: false,
    setIsLoggedIn: (): boolean => false,
});

export const GlobalContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return(
        <GlobalContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            { children }
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);