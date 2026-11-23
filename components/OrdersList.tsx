"use client";

import { useState } from "react";
import OrderCard from "@/components/OrderCard";
import OrderDetails from "./OrderDetails";
import { Order } from "@/types/order";

export default function OrdersList({ orders }: { orders: Order[] }) {
    
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-800">Pedidos</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Acompanhe e gerencie os pedidos da sua loja.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
              filter === item.value
                ? "bg-orange-500 text-white"
                : "bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-xl p-10 text-center">
          <p className="text-zinc-500">Nenhum pedido encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
  );
}
