import StoresList from "@/components/platform/Painel";
import { getAllStores } from "@/repositories/lojas.repository";
import { getSession } from "@/services/auth.service";
import { redirect } from "next/navigation";

export default async function Painel(){

    const session = await getSession();

    const stores = await getAllStores(session.user_id);


    if(!session){
        redirect("/login");
    };


    return(
        <div>
            <StoresList stores={stores} />
        </div>
    )
}

