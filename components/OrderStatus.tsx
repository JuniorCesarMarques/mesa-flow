import { OrderStatusType } from "@/types/order";

const statusConfig: Record<
  OrderStatusType,
  { label: string; className: string }
> = {
  pendente: {
    label: "Novo pedido",
    className: "bg-blue-50 text-blue-700",
  },
  preparando: {
    label: "Em preparo",
    className: "bg-orange-50 text-orange-700",
  },
  concluido: {
    label: "Concluído",
    className: "bg-green-50 text-green-700",
  },
  cancelado: {
    label: "Cancelado",
    className: "bg-red-50 text-red-700",
  },
};

export default function OrderStatus({ status }: { status: OrderStatusType }) {
  const config = statusConfig[status];

  return (
    <span
      className={`text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap ${config.className}`}
    >
      {config.label}
    </span>
  );
}
