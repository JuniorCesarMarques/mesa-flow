import Header from "@/components/Header";
import { getStoreBySlug } from "@/repositories/lojas.repository";
import { getSession } from "@/services/auth.service";
import { notFound } from "next/navigation";
import { Toaster } from "react-hot-toast";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loja = await getStoreBySlug(slug);

  return {
    title: loja.name,
  };
}

export default async function PlatformLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [session, storeInfo] = await Promise.all([
    getSession(),
    getStoreBySlug(slug),
  ]);

  if (!storeInfo) {
    notFound();
  }

  return (
    <>
      <Header
        storeName={storeInfo.name}
        storeLogo={storeInfo.logo_path}
        session={session}
      />
      {children}
      <Toaster />
    </>
  );
}
