
type Filter = "todos" | "novo" | "preparando" | "concluido" | "cancelado";

const filters: { label: string; value: Filter }[] = [
  { label: "Todos", value: "todos" },
  { label: "Novos", value: "novo" },
  { label: "Em preparo", value: "preparando" },
  { label: "Concluídos", value: "concluido" },
  { label: "Cancelados", value: "cancelado" },
];

export default function OrdersFilters({
  filter,
  onChange,
}: {
  filter: Filter;
  onChange: (value: Filter) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {filters.map((item) => (
        <button
          key={item.value}
          onClick={() => onChange(item.value)}
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
  );
}
