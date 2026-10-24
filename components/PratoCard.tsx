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
      className="relative w-80 flex items-between justify-between overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
    >
      {canManageStore && (
        <div
          onClick={() => {
            setOpenDropdown((prev) => !prev);
          }}
          className="absolute top-2 right-2 bg-white p-2 rounded-full z-5"
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



      <div className="p-6">
        <h3 className="text-sm font-bold sm:text-md">{product.nome}</h3>

        <p className="mt-3 text-gray-600 text-sm">{product.descricao}</p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm font-bold text-orange-500">
            R$ {product.preco.replace(".", ",")}
          </span>
        </div>
      </div>
      <div className="relative h-30 w-64">
        <Image
          src={product.imagem ?? "/imagens/product-fallback.png"}
          alt={product.nome}
          fill
          unoptimized
          className="object-cover"
        />
      </div>
    </article>
  );
}
