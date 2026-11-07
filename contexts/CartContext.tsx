import { CartAction, cartReducer, CartState, initialState } from "@/reducers/cartReducer";
import { createContext, ReactNode, useContext, useReducer, useState } from "react";

type CartContextType = {
    state: CartState;
    dispatch: React.ActionDispatch<[action: CartAction]>;
}

const CartContext = createContext<CartContextType | null>(null);


export default function CartProvider({children}: {children: ReactNode}){

    const [state, dispatch] = useReducer(cartReducer, initialState);


    return (
        <CartContext.Provider value={{state, dispatch}}>
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