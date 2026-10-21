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

export type FormMode = "creating" | "editing";

type StorePage = {
  canManageStore: boolean;
  slugStore: string;
};

export default function StorePage({ canManageStore, slugStore }: StorePage) {
  const [modalState, setModalState] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [storeAppearence, setStoreAppearence] =
    useState<StoreAppearence | null>(null);

  const [bannerLoading, setBannerLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);

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
                `${slugStore}/products`,
              )
            : imgFromData;

        const isNewImage = !(typeof imagem === "string" || imagem === null);

        const updatedProduct = {
          slugStore,
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

          throw new Error(result.error);
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
        toast.error(err instanceof Error ? err.message : "Erro inesperado");
      }
    } else {
      const res = await fetch(``);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setProductsLoading(true);
        const res = await fetch(`/api/produtos/${slugStore}`);

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
      setBannerLoading(true);
      try {
        const res = await fetch(`/api/appearence/${slugStore}`);

        setBannerLoading(false);

        if (!res.ok) return;

        const appearence = await res.json();

        setStoreAppearence(appearence);
      } catch (err) {
        setBannerLoading(false);
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
      {bannerLoading ? (
        <BannerSkeleton />
      ) : storeAppearence && storeAppearence.banner_path ? (
        <Banner logoPath={storeAppearence.banner_path} />
      ) : null}

      {canManageStore && <OpenModalButton onOpen={openFormModal} />}

      <ProductFormModal
        product={selectedProduct}
        open={modalState}
        onClose={closeModal}
        onSubmit={onSubmit}
      />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold">Produtos em Destaque</h2>

          <p className="mt-3 text-gray-500">
            Receitas preparadas diariamente com ingredientes frescos.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-10">
          {productsLoading ? (
            <Skeleton items={6} />
          ) : products.length ? (
            products.map((product) => (
              <PratoCard
                key={product.id}
                handleEditClick={openFormModal}
                product={product}
              />
            ))
          ) : <EmptyProducts />}
        </div>
      </section>

      <Sobre />

      <CTAComponent />
    </main>
  );
}
