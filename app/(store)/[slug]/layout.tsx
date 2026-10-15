import Header from "@/components/Header";
import { getStoreBySlug } from "@/repositories/lojas.repository";
import { getSession } from "@/services/auth.service";
import { notFound } from "next/navigation";
import { Toaster } from "react-hot-toast";

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
      <Header storeName={storeInfo.name} session={session} />
      {children}
      <Toaster />
    </>
  );
}
