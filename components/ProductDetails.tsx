"use client";

import { useState } from "react";
import { Button, InputNumber } from "antd";
import Image from "next/image";
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

  console.log(product.id);

  return (
    <div className="space-y-6">
      <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={product.imagem || "/imagens/product-fallback.png"}
          alt={product.nome}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 520px"
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700">
          {product.nome}
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          {product.descricao}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Preço unitário</span>

        <span className="text-lg font-semibold text-gray-700">
          {price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">
          Quantidade
        </span>

        <InputNumber
          min={1}
          max={99}
          value={quantity}
          onChange={(value) => setQuantity(value ?? 1)}
        />
      </div>

      <div className="border-t border-gray-100 pt-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-medium text-gray-600">Subtotal</span>

          <span className="text-xl font-bold text-gray-700">
            {subtotal.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>

        <Button
          type="primary"
          block
          size="large"
          onClick={() => onAddToCart(product, quantity)}
        >
          Adicionar ao carrinho
        </Button>
      </div>
    </div>
  );
}