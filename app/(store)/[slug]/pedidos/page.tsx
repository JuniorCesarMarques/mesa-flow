import OrdersList from "@/components/OrdersList";
import { getStoreBySlug } from "@/repositories/lojas.repository";
import { getOrdersBySlug } from "@/repositories/pedidos.repository"
import { getSession } from "@/services/auth.service";
import { redirect } from "next/navigation";


export default async function Pedidos({params}: {params: Promise<{slug: string}>}){

    const { slug } = await params;

    const session = await getSession();

    if(!session){
        redirect("/login");
    }

    const loja = await getStoreBySlug(slug);

    const autorizado = session?.user_id === loja.user_id;

    if(!autorizado){
        redirect(`/${slug}`);
    }

    const pedidos = await getOrdersBySlug(slug);


    return (
        <OrdersList orders={pedidos} />
    )
}