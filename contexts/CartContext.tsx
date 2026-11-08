"use client";

import {
  CartAction,
  cartReducer,
  CartState,
  initialState,
} from "@/reducers/cartReducer";
import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
} from "react";

type CartContextType = {
  state: CartState;
  quantity: number;
  dispatch: React.ActionDispatch<[action: CartAction]>;
};

const CartContext = createContext<CartContextType | null>(null);

export default function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const quantity = state.items.reduce(
    (accumulator, item) => accumulator + item.quantity,
    0,
  );

  return (
    <CartContext.Provider value={{ state, quantity, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("CartContext deve ser usado dentro CartProvider");
  }

  return context;
};
