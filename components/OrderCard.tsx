import { OrderDisplay } from "@/types/order";
import OrderStatus from "./OrderStatus";

type OrderCardProps = {
  order: OrderDisplay;
  onViewDetails: () => void;
}

export default function OrderCard({ order, onViewDetails }: OrderCardProps) {
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(order.criado_em));
  const itemCount = order.items.reduce(
    (total, item) => total + item.quantidade,
    0,
  );

  return (
    <article className="flex h-full flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-orange-200 hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-zinc-400">
            Pedido #{order.id.slice(0, 8)}
          </p>
          <h3 className="font-semibold text-zinc-800 mt-1">
            {order.nome_cliente}
          </h3>
        </div>

        <OrderStatus status={order.status} />
      </div>

      <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
        <span className="text-sm text-zinc-500">{formattedDate}</span>
        <span className="text-sm font-medium text-zinc-700">
          {itemCount} {itemCount === 1 ? "item" : "itens"}
        </span>
      </div>

      <button
        onClick={onViewDetails}
        className="mt-auto w-full rounded-lg border border-orange-500 py-2 text-sm font-medium text-orange-600 transition hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
      >
        Ver detalhes
      </button>
    </article>
  );
}

