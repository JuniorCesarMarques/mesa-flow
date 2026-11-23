import { Order, OrderDisplay } from "@/types/order";
import OrderStatus from "./OrderStatus";


type OrderCardProps = {
    order: OrderDisplay;
    onViewDetails: () => void;
}



export default function OrderCard({ order, onViewDetails }: OrderCardProps) {


//   const formattedPrice = new Intl.NumberFormat("pt-BR", {
//     style: "currency",
//     currency: "BRL",
//   }).format(order.total);

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(order.criado_em));

  return (
    <article className="bg-white border border-zinc-200 rounded-xl p-4 space-y-4 hover:shadow-sm transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-zinc-400">Pedido #{order.id.slice(0, 8)}</p>
          <h3 className="font-semibold text-zinc-800 mt-1">
            {order.nome_cliente}
          </h3>
        </div>

        <OrderStatus status={order.status} />
      </div>

      <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
        <span className="text-sm text-zinc-500">{formattedDate}</span>
        <span className="font-semibold text-zinc-800">
          {1}
        </span>
      </div>

      <button onClick={onViewDetails} className="w-full border border-orange-500 text-orange-600 hover:bg-orange-50 rounded-lg py-2 text-sm font-medium transition">
        Ver detalhes
      </button>
    </article>
  );
}

