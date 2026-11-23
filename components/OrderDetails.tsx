"use client";

import { Order } from "@/types/order";

export default function OrderDetails({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  const currency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-zinc-800">
              Pedido #{order.id.slice(0, 8)}
            </h2>
            <p className="text-sm text-zinc-500">
              {order.nome_cliente}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 text-xl"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-zinc-800">Itens do pedido</h3>

          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between gap-4 text-sm"
            >
              <div>
                <p className="font-medium text-zinc-700">
                  {item.quantidade}x {item.nome}
                </p>
                <p className="text-zinc-400">
                  {currency(item.preco)} cada
                </p>
              </div>

              <p className="font-medium text-zinc-700">
                {currency(item.preco * item.quantidade)}
              </p>
            </div>
          ))}

          {/* <div className="border-t border-zinc-200 pt-4 flex justify-between">
            <span className="font-semibold text-zinc-800">Total</span>
            <span className="font-bold text-lg text-zinc-800">
              {currency(order.total)}
            </span>
          </div> */}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-3 font-medium transition"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
