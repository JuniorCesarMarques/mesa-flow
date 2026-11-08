"use client";

import { ShoppingBag } from "lucide-react";

type CartButtonProps = {
  quantity: number;
  onClick: () => void;
};

export default function CartButton({
  quantity,
  onClick,
}: CartButtonProps) {
  if (quantity <= 0) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Abrir carrinho com ${quantity} itens`}
      className="
        fixed bottom-6 right-6 z-40
        flex h-16 w-16 items-center justify-center
        rounded-full
        bg-orange-500 text-white
        shadow-[0_8px_30px_rgba(234,88,12,0.35)]
        transition-all duration-300
        hover:scale-110 hover:bg-orange-600
        hover:shadow-[0_10px_35px_rgba(234,88,12,0.45)]
        active:scale-95
        focus-visible:outline-none
        focus-visible:ring-4 focus-visible:ring-orange-300
      "
    >
      <ShoppingBag size={27} strokeWidth={1.8} />

      <span
        className="
          absolute -right-1 -top-1
          flex h-6 min-w-6 items-center justify-center
          rounded-full border-2 border-white
          bg-gray-900 px-1
          text-xs font-bold text-white
        "
      >
        {quantity}
      </span>
    </button>
  );
}
