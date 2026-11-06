import { createContext, ReactNode, useContext, useState } from "react";


const CartContext = createContext(null);


export default function CartProvider({children}: {children: ReactNode}){

    const [] = useState();


    return (
        <CartContext.Provider value={null}>
            {children}
        </CartContext.Provider>
    )

}

export const useCart = () => {
    const context = useContext(CartContext);

    if(!context){
        throw new Error("CartContext deve ser usado dentro CartProvider");
    };

    return context;
}