"use client";

import CTAComponent from "@/components/CTAComponent";
import HomeHero from "@/components/Banner";
import ProductFormModal, { ProductForm } from "@/components/ProductFormModal";
import OpenModalButton from "@/components/OpenModalButton";
import PratoCard from "@/components/PratoCard";
import Skeleton from "@/components/PratosSkeleton";
import Sobre from "@/components/Sobre";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteImage, uploadImage } from "@/services/storage";

import { useParams } from "next/navigation";

export type FormMode = "creating" | "editing";

export default function Home() {
  const { slug } = useParams();

  const [modalState, setModalState] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const onSubmit = async (data: ProductForm) => {
    if (selectedProduct) {
      try {
        const imgFromData =
          data.imagem instanceof FileList ? data.imagem?.[0] : data.imagem;

        const imagem =
          imgFromData instanceof File
            ? await uploadImage(
                imgFromData,
                "store-platform-assets",
                `${slug}/products`,
              )
            : imgFromData;

        const isNewImage = !(typeof imagem === "string" || imagem === null);

        const updatedProduct = {
          ...data,
          id: selectedProduct.id,
          imagem: isNewImage ? imagem.publicUrl : imagem,
        };

        const res = await fetch("/api/produtos", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        });

        const result = await res.json();

        if (!res.ok) {
          if (isNewImage) {
            await deleteImage(imagem.publicUrl);
          }

          throw new Error(result.message);
        }

        if (isNewImage && selectedProduct.imagem) {
          await deleteImage(selectedProduct.imagem);
        }

        setProducts((prev) =>
          prev.map((p) => (p.id === selectedProduct.id ? updatedProduct : p)),
        );

        setSelectedProduct(null);
        setModalState(false);
        toast.success(result.message);
      } catch (err) {
        toast.error(err as string);
      }
    } else {
      const res = await fetch(``);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/produtos");

        if (!res.ok) return;

        const products = await res.json();

        setProducts(products);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const openFormModal = (product?: Product) => {
    setSelectedProduct(product ?? null);
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  return (
    <main>
      {/* HERO */}

      <HomeHero logoPath=""/>
      {/* DESTAQUES */}
      <OpenModalButton onOpen={openFormModal} />

      <ProductFormModal
        product={selectedProduct}
        open={modalState}
        onClose={closeModal}
        onSubmit={onSubmit}
      />

      {/* Pratos */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold">Produtos em Destaque</h2>

          <p className="mt-3 text-gray-500">
            Receitas preparadas diariamente com ingredientes frescos.
          </p>
        </div>

        {/* <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4"> */}
        <div className="flex flex-wrap justify-center gap-10">
          {products.length ? (
            products.map((product) => (
              <PratoCard
                key={product.id}
                handleEditClick={openFormModal}
                product={product}
              />
            ))
          ) : (
            <Skeleton items={6} />
          )}
        </div>
      </section>

      {/* SOBRE */}
      <Sobre />

      {/* CTA */}
      <CTAComponent />
    </main>
  );
}
