import { Config } from "@/types/configs";

type ConfigCardProps = {
  config: Config;
  selected?: boolean;
  onClick?: () => void;
};

export default function ConfigCard({
  config,
  selected = false,
  onClick,
}: ConfigCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex h-40 w-60 flex-col items-center justify-center rounded-lg bg-white p-2 transition
        ${
          selected
            ? "border-2 border-blue-600"
            : "border border-slate-200 hover:border-blue-400"
        }`}
    >
      {selected && (
        <span className="absolute right-2 top-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
          ✓
        </span>
      )}

      <div className="mb-1 flex h-[70px] w-[90px] items-center justify-center">
        {config.imagem ? (
          <img
            src={config.imagem}
            alt={config.nome}
            className="h-full w-full object-contain"
          />
        ) : (
          <span className="text-xs text-slate-400">
            Sem imagem
          </span>
        )}
      </div>

      <strong className="text-[13px] text-blue-950">
        {config.nome}
      </strong>

      <span className="mt-1 text-xs text-slate-500">
        {config.limite}g
      </span>

      <span className="mt-1 text-sm font-bold text-blue-950">
        R$ {Number(config.preco).toFixed(2).replace(".", ",")}
      </span>
    </button>
  );
}