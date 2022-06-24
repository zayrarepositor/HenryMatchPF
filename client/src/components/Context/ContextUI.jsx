import { createContext, useContext, useState } from "react";

export const UIContext = createContext();
export const useUIContext = () => useContext(UIContext)

export const UIProvider = ({ children }) => {

    const[showDetailBox, setshowDetailBox] = useState(false);

    const value = {
        showDetailBox,
        setshowDetailBox
    }

    return <UIContext.Provider value= {value}>{children}</UIContext.Provider>
}