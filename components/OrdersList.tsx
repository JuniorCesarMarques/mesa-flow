"use client";

import { useState } from "react";
import OrderCard from "@/components/OrderCard";
import OrderDetails from "./OrderDetails";
import { OrderDisplay } from "@/types/order";

export default function OrdersList({ orders }: { orders: OrderDisplay[] }) {
    
  const [selectedOrder, setSelectedOrder] = useState<OrderDisplay | null>(null);

  const [filter, setFilter] = useState("todos");

  const filteredOrders = orders.filter((order) => {
    return filter === "todos" || order.status === filter;
  });

  const filters = [
    { label: "Todos", value: "todos" },
    { label: "Novos", value: "pendente" },
    { label: "Em preparo", value: "preparando" },
    { label: "Concluídos", value: "concluido" },
    { label: "Cancelados", value: "cancelado" },
  ];

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-800">Pedidos</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Acompanhe e gerencie os pedidos da sua loja.
          </p>
        </div>

        <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          <div className="flex w-max gap-2">
            {filters.map((item) => (
              <button
                key={item.value}
                onClick={() => setFilter(item.value)}
                aria-pressed={filter === item.value}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${
                  filter === item.value
                    ? "bg-orange-500 text-white"
                    : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 bg-white p-10 text-center">
            <p className="text-zinc-500">Nenhum pedido encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredOrders.map((order) => (
              <OrderCard
                onViewDetails={() => setSelectedOrder(order)}
                key={order.id}
                order={order}
              />
            ))}
          </div>
        )}
        {selectedOrder && (
          <OrderDetails
            onClose={() => setSelectedOrder(null)}
            order={selectedOrder}
          />
        )}
      </section>
    </main>
  );
}
