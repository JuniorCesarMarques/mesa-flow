
"use client";

import { useState } from "react";
import { Button } from "antd";
import Image from "next/image";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Product } from "@/types/product";

type ProductDetailsProps = {
  product: Product;
  key: string | undefined;
  onAddToCart: (product: Product, quantity: number) => void;
};

export default function ProductDetails({
  product,
  onAddToCart,
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);

  const price = Number(product.preco);
  const subtotal = price * quantity;

  const formatPrice = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function increaseQuantity() {
    setQuantity((current) => Math.min(99, current + 1));
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Imagem do produto */}
      <div className="relative h-40 sm:h-48 w-full overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={product.imagem || "/imagens/product-fallback.png"}
          alt={product.nome}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 520px"
        />
      </div>

      {/* Informações */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-bold tracking-tight text-gray-800">
            {product.nome}
          </h2>

          <span className="shrink-0 rounded-lg bg-orange-50 px-3 py-1.5 text-sm font-bold text-orange-600">
            {formatPrice(price)}
          </span>
        </div>

        {product.descricao && (
          <p className="text-sm leading-6 text-gray-500">
            {product.descricao}
          </p>
        )}
      </div>

      {/* Separador */}
      <div className="h-px bg-gray-100" />

      {/* Quantidade */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-gray-800">
            Quantidade
          </p>
          <p className="mt-0.5 text-xs text-gray-400">
            Escolha as unidades desejadas
          </p>
        </div>

        <div className="flex h-10 items-center gap-3 rounded-xl border border-gray-200 bg-white px-2">
          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            aria-label="Diminuir quantidade"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-600 transition hover:bg-orange-50 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Minus size={16} strokeWidth={2.5} />
          </button>

          <span className="min-w-5 text-center text-sm font-bold tabular-nums text-gray-800">
            {quantity}
          </span>

          <button
            type="button"
            onClick={increaseQuantity}
            disabled={quantity >= 99}
            aria-label="Aumentar quantidade"
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500 text-white transition hover:bg-orange-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Rodapé / Resumo */}
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Subtotal
            </p>
            <p className="mt-0.5 text-xs text-gray-400">
              {quantity} {quantity === 1 ? "unidade" : "unidades"}
            </p>
          </div>

          <span className="text-xl font-bold tracking-tight text-gray-800">
            {formatPrice(subtotal)}
          </span>
        </div>

        <Button
          type="primary"
          block
          size="large"
          icon={<ShoppingBag size={18} />}
          onClick={() => onAddToCart(product, quantity)}
          className="!h-11 !rounded-xl !bg-orange-500 !font-semibold !shadow-sm hover:!bg-orange-600"
        >
          Adicionar ao carrinho
        </Button>
      </div>
    </div>
  );
}
