"use client";

import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CloseButton from "./CLoseButton";

type Props = {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  onSubmit: (product: ProductForm) => void;
};

export type ProductForm = Omit<Product, "imagem" | "id"> & {
  imagem: string | FileList | null;
};

export default function ProductFormModal({
  open,
  onClose,
  product,
  onSubmit,
}: Props) {

  if(typeof window === "undefined") return;

  const { register, reset, setValue, watch, handleSubmit } =
    useForm<ProductForm>();

  const [preview, setPreview] = useState<string | null>(null);

  const imagemValue = watch("imagem");

  const imagem =
    imagemValue instanceof FileList ? (imagemValue[0] ?? null) : imagemValue;

  const removeImage = () => {
    setValue("imagem", null);
    setPreview(null);
  };

  useEffect(() => {
    setPreview(imagem instanceof File ? URL.createObjectURL(imagem) : imagem);
  }, [imagem, product]);

  useEffect(() => {
    reset({
      nome: product?.nome ?? "",
      descricao: product?.descricao ?? "",
      disponivel: product?.disponivel ?? false,
      imagem: product?.imagem ?? null,
      preco: product?.preco ?? "",
    });
  }, [product, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-bold">
            {product ? "Editar Prato" : "Novo Prato"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-400 transition hover:text-black"
          >
            ×
          </button>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-5">
            <div className="relative">
              {preview && <CloseButton onClose={removeImage} />}

              {!preview ? (
                <label className="flex h-44 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed text-gray-500 transition hover:border-orange-500">
                  Clique para enviar uma imagem
                  <input
                    {...register("imagem")}
                    type="file"
                    className="hidden"
                  />
                </label>
              ) : (
                <img src={preview} alt="" />
              )}
            </div>

            <div>
              <label className="mb-2 block font-medium">Nome</label>

              <input
                {...register("nome")}
                className="w-full rounded-lg border p-3 outline-none focus:border-orange-500"
                placeholder="Ex: Risoto de Camarão"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Categoria</label>

              <select
                {...register("categoria")}
                className="w-full rounded-lg border p-3 outline-none focus:border-orange-500"
              >
                <option value="">Selecione</option>
                <option>Pratos Principais</option>
                <option>Massas</option>
                <option>Bebidas</option>
                <option>Sobremesas</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">Descrição</label>

              <textarea
                rows={4}
                {...register("descricao")}
                className="w-full rounded-lg border p-3 outline-none focus:border-orange-500"
                placeholder="Descreva o prato..."
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Preço</label>

              <input
                {...register("preco")}
                className="w-full rounded-lg border p-3 outline-none focus:border-orange-500"
                placeholder="R$ 0,00"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                id="disp"
                type="checkbox"
                {...register("disponivel")}
              />

              <label htmlFor="disp">Produto disponível</label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t p-6">
          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2 transition hover:bg-gray-100"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit(onSubmit)}
            className="rounded-lg bg-orange-500 px-5 py-2 font-medium text-white transition hover:bg-orange-600"
          >
            {product ? "Editar Prato" : "Salvar Prato"}
          </button>
        </div>
      </div>
    </div>
  );
}
