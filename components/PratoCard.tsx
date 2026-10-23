"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { FaEllipsisV } from "react-icons/fa";
import ProductMenuActions from "./ProductMenuActions";

type PratoCardProps = {
  product: Product;
  handleEditClick: (product: Product) => void;
  onDelete: (id: string) => Promise<void>;
  canManageStore: boolean;
};

export default function PratoCard({
  product,
  handleEditClick,
  onDelete,
  canManageStore,
}: PratoCardProps) {
  const menuRef = useRef<HTMLUListElement>(null);

  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <article
      key={product.id}
      className="relative w-80 flex flex-col items-between justify-between overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
    >
      {canManageStore && (
        <div
          onClick={() => {
            setOpenDropdown((prev) => !prev);
          }}
          className="absolute top-2 right-2 bg-white p-2 rounded-full z-10"
        >
          <FaEllipsisV />
        </div>
      )}

      {openDropdown && (
        <ProductMenuActions
          onDelete={() => onDelete(product.id)}
          menuRef={menuRef}
          onEdit={() => handleEditClick(product)}
        />
      )}

      <div className="relative h-64 w-full">
        <Image
          src={product.imagem ?? "/imagens/product-fallback.png"}
          alt={product.nome}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold">{product.nome}</h3>

        <p className="mt-3 text-gray-600">{product.descricao}</p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-500">
            R$ {product.preco.replace(".", ",")}
          </span>

          <button className="rounded-lg bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-600">
            <a
              href="https://wa.me/5515996124612?text=Olá,%20gostaria%20de%20fazer%20um%20pedido."
              target="_blank"
              rel="noopener noreferrer"
            >
              Fazer Pedido
            </a>
          </button>
        </div>
      </div>
    </article>
  );
}
