"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function Cart() {
  const { state, dispatch, totalPrice } = useCart();

  const { items } = state;

  const formatPrice = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  if (items.length === 0) {
    return (
      <div className="flex min-h-[380px] flex-col items-center justify-center px-6 text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-orange-50">
          <ShoppingBag
            size={34}
            className="text-orange-500"
            strokeWidth={1.6}
          />
        </div>

        <h3 className="text-lg font-bold text-gray-800">
          Seu carrinho está vazio
        </h3>

        <p className="mt-2 max-w-[240px] text-sm leading-relaxed text-gray-400">
          Que tal escolher algo delicioso para adicionar ao seu pedido?
        </p>
      </div>
    );
  }

  console.log("Render");

  return (
    <div className="flex h-full flex-col">
      {/* Lista de produtos */}
      <div className="flex-1 space-y-5 overflow-y-auto pb-5">
        {items.map((item) => {
          const price = Number(item.preco);
          const subtotal = price * item.quantity;

          return (
            <div
              key={item.id}
              className="flex gap-3 border-b border-gray-100 pb-5"
            >
              {/* Imagem */}
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src={item.imagem || "/imagens/product-fallback.png"}
                  alt={item.nome}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              {/* Informações */}
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-gray-800">
                    {item.nome}
                  </h3>

                  <button
                    type="button"
                    onClick={() => {
                      console.log("Remove cart")
                      dispatch({ type: "REMOVE_ITEM", payload: item.id });
                    }}
                    aria-label={`Remover ${item.nome}`}
                    className="shrink-0 rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex items-end justify-between gap-2">
                  {/* Quantidade */}
                  <div className="flex h-8 items-center gap-3 rounded-lg border border-gray-200 px-1">
                    <button
                      type="button"
                      onClick={() => {
                        dispatch({
                          type: "DECREASE_QUANTITY",
                          payload: item.id,
                        });
                      }}
                      aria-label="Diminuir quantidade"
                      className="flex h-6 w-6 items-center justify-center rounded-md text-gray-500 transition hover:bg-orange-50 hover:text-orange-600"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="min-w-3 text-center text-xs font-bold text-gray-800 tabular-nums">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        dispatch({
                          type: "ADD_ITEM",
                          payload: { ...item, quantity: 1 },
                        })
                      }
                      aria-label="Aumentar quantidade"
                      className="flex h-6 w-6 items-center justify-center rounded-md text-gray-500 transition hover:bg-orange-50 hover:text-orange-600"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <span className="text-sm font-bold text-gray-800">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumo */}
      <div className="border-t border-gray-100 bg-white pt-5">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">
            Total do pedido
          </span>

          <span className="text-2xl font-bold tracking-tight text-gray-800">
            {formatPrice(totalPrice)}
          </span>
        </div>

        <button
          type="button"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 active:scale-[0.99]"
        >
          <ShoppingCart size={19} />
          Continuar pedido
        </button>
      </div>
    </div>
  );
}
