"use client"
import { createContext, ReactNode, useContext, useState, Dispatch, SetStateAction } from 'react';

interface ContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: (): boolean => false,
});

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <GlobalContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);