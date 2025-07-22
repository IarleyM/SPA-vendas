import { createContext, useCallback, useContext, useState } from "react";

interface IDrawerContext {
    isDrawerOpen: boolean;  
    toggleDrawerOpen: () => void;
}

export const useDrawerContext = () => {
    return useContext(DrawerContext);
}

export const DrawerContext = createContext({} as IDrawerContext); 


export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawerOpen = useCallback(()=>{
        setIsDrawerOpen(prevState => !prevState);
    }, [])

    return (
     <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
        {children}
     </DrawerContext.Provider>
    )
}