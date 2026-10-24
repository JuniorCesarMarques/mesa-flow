
import Image from "next/image";
import { ShoppingBag, Store } from "lucide-react";

type MiniProduct = {
  id: string;
  nome: string;
  preco: number;
  imagem?: string | null;
};

type StoreMiniatureProps = {
  name: string;
  banner?: string | null;
  products: MiniProduct[];
};

export default function StoreMiniature({
  name,
  banner,
  products,
}: StoreMiniatureProps) {
  return (
    <div className="pointer-events-none w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      {/* Banner */}
      <div className="relative h-28 overflow-hidden bg-orange-100 sm:h-36">
        {banner ? (
          <Image
            src={banner}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 400px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Store size={36} className="text-orange-300" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-zinc-700">
          Loja online
        </span>
      </div>

      {/* Store header */}
      <div className="border-b border-zinc-100 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
            <Store size={20} />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-bold text-zinc-900">
              {name}
            </h3>

            <p className="mt-0.5 text-xs text-zinc-500">
              Confira nossos produtos
            </p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="px-4 py-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h4 className="text-sm font-bold text-zinc-800">
            Produtos em destaque
          </h4>

          <ShoppingBag size={16} className="shrink-0 text-orange-500" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="min-w-0 overflow-hidden rounded-lg border border-zinc-100"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                {product.imagem ? (
                  <Image
                    src={product.imagem}
                    alt=""
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ShoppingBag
                      size={24}
                      className="text-zinc-300"
                    />
                  </div>
                )}
              </div>

              <div className="p-2">
                <p className="truncate text-xs font-semibold text-zinc-800">
                  {product.nome}
                </p>

                <p className="mt-1 text-xs font-bold text-orange-600">
                  {product.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="rounded-lg bg-zinc-50 px-3 py-6 text-center text-xs text-zinc-400">
            Sua loja e seus produtos aparecerão aqui
          </div>
        )}

        {/* Decorative button: not interactive */}
        <div className="mt-4 rounded-lg bg-orange-500 py-2.5 text-center text-xs font-semibold text-white">
          Conhecer loja
        </div>
      </div>
    </div>
  );
}
