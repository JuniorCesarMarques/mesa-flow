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
  useEffect,
  useReducer,
} from "react";

type CartContextType = {
  state: CartState;
  quantity: number;
  totalPrice: number;
  dispatch: React.ActionDispatch<[action: CartAction]>;
};

const CartContext = createContext<CartContextType | null>(null);

export default function CartProvider({ children }: { children: ReactNode }) {
  
  const [state, dispatch] = useReducer(
    cartReducer,
    JSON.parse(localStorage.getItem("cart") ?? '{"items": []}'),
  );

  const quantity = state.items.reduce(
    (accumulator, item) => accumulator + item.quantity,
    0,
  );

  const totalPrice = state.items.reduce(
    (accumulator, item) => accumulator + item.preco * item.quantity,
    0,
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, quantity, dispatch, totalPrice }}>
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
