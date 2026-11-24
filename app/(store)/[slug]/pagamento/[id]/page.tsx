


export default async function Pagamento({params}: {params: Promise<{id: string}>}){

    const { id } = await params;

    console.log(id);

    return <div>Página de pagamento</div>
}