import StorePage from "@/components/StorePage";
import { getStoreBySlug } from "@/repositories/lojas.repository";
import { getSession } from "@/services/auth.service";
import { notFound } from "next/navigation";

export default async function StorePageServer({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [session, store] = await Promise.all([
    getSession(),
    getStoreBySlug(slug)
  ]);

  if(!store){
    notFound();
  }


  const canManageStore = !!session;

  return <StorePage canManageStore={canManageStore} storeSlug={slug} />;
}
