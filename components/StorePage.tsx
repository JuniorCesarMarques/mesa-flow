"use client";

import CTAComponent from "@/components/CTAComponent";
import ProductFormModal, { ProductForm } from "@/components/ProductFormModal";
import OpenModalButton from "@/components/OpenModalButton";
import PratoCard from "@/components/PratoCard";
import Skeleton from "@/components/PratosSkeleton";
import Sobre from "@/components/Sobre";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteImage, uploadImage } from "@/services/storage";
import { StoreAppearence } from "@/types/appearence";
import Banner from "@/components/Banner";
import { BannerSkeleton } from "./BannerSkeleton";
import { EmptyProducts } from "./EmptyProducts";
import WhatsAppButton from "./WhatsAppButton";

export type FormMode = "creating" | "editing";

type StorePage = {
  canManageStore: boolean;
  storeSlug: string;
};

export default function StorePage({ canManageStore, storeSlug }: StorePage) {
  const [modalState, setModalState] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [storeAppearence, setStoreAppearence] =
    useState<StoreAppearence | null>(null);

  const [appearenceLoading, setAppearenceLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);

  const onSubmit = async (data: ProductForm) => {
    try {
      const imgFromData =
        data.imagem instanceof FileList ? data.imagem?.[0] : data.imagem;

      const imagem =
        imgFromData instanceof File
          ? await uploadImage(
              imgFromData,
              "store-platform-assets",
              `${storeSlug}/products`,
            )
          : imgFromData;

      const newImage = !(typeof imagem === "string" || imagem === null);

      const method = selectedProduct ? "PUT" : "POST";

      const product = {
        ...data,
        imagem: newImage ? imagem.publicUrl : imagem,
      };

      const res = await fetch(`/api/produtos/${storeSlug}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          selectedProduct ? { ...product, id: selectedProduct.id } : product,
        ),
      });

      const result = await res.json();

      if (!res.ok) {
        if (newImage) {
          await deleteImage(imagem.publicUrl);
        }

        throw new Error(result.error);
      }

      const onSuccess = () => {
        setSelectedProduct(null);
        setModalState(false);
        toast.success(result.message);
      };

      if (selectedProduct) {
        if (newImage && selectedProduct.imagem) {
          await deleteImage(selectedProduct.imagem);
        }

        const updatedProduct = {
          id: selectedProduct.id,
          ...data,
          imagem: newImage ? imagem.publicUrl : imagem,
        };

        setProducts((prev) =>
          prev.map((p) => (p.id === selectedProduct.id ? updatedProduct : p)),
        );

        onSuccess();
      } else {
        setProducts((prev) => [...prev, result.product]);
        onSuccess();
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro inesperado");
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    const res = await fetch(`/api/produtos/${storeSlug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: productId }),
    });

    const result = await res.json();

    console.log(result);

    if (!res.ok) {
      toast.error(result.message);
      return;
    }

    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setSelectedProduct(null);
    toast.success(result.message);
  };

  useEffect(() => {
    (async () => {
      try {
        setProductsLoading(true);
        const res = await fetch(`/api/produtos/${storeSlug}`);

        setProductsLoading(false);

        if (!res.ok) return;

        const produtos = await res.json();

        setProducts(produtos);
      } catch (err) {
        setProductsLoading(false);
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/appearence/${storeSlug}`);

        if (!res.ok) return;

        const appearence = await res.json();

        setAppearenceLoading(false);

        setStoreAppearence(appearence);
      } catch (err) {
        setAppearenceLoading(false);
        console.log(err);
      }
    })();
  }, []);

  const openFormModal = (product: Product | undefined) => {
    setSelectedProduct(product ?? null);
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };


  return (
    <main>
      {appearenceLoading ? (
        <BannerSkeleton />
      ) : storeAppearence && storeAppearence.banner_path ? (
        <Banner logoPath={storeAppearence.banner_path} />
      ) : null}

      {canManageStore && <OpenModalButton onOpen={openFormModal} />}

      {modalState && (
        <ProductFormModal
          product={selectedProduct}
          onClose={closeModal}
          onSubmit={onSubmit}
        />
      )}

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold">Produtos em Destaque</h2>

          <p className="mt-3 text-gray-500">
            Receitas preparadas diariamente com ingredientes frescos.
          </p>
        </div>

        <div className="flex flex-wrap gap-5 justify-center">
          {productsLoading ? (
            <Skeleton items={6} />
          ) : products.length ? (
            products.map((product) => (
              <PratoCard
                canManageStore={canManageStore}
                key={product.id}
                handleEditClick={openFormModal}
                onDelete={handleDeleteProduct}
                product={product}
              />
            ))
          ) : (
            <EmptyProducts />
          )}
        </div>
      </section>
      <WhatsAppButton phone="15996124612" message="Olá, gostaria de fazer um pedido." />
      <Sobre />

      <CTAComponent />
    </main>
  );
}
