import { calcularFrete } from "@/lib/calcularFrete";
import { getStoreBySlug } from "@/repositories/lojas.repository";
import { createOrder, createOrderItem, createOrderWithItems, getOrdersBySlug } from "@/repositories/pedidos.repository";
import { getSession } from "@/services/auth.service";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    const store = await getStoreBySlug(slug);

    const {
      nome_cliente,
      telefone_cliente,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      observacao,
      items
    } = await req.json();

    const enderecoCliente = {
      logradouro: rua,
      numero,
      bairro,
      localidade: cidade,
      uf: "SP",
      cep,
      pais: "Brasil",
    };

    const enderecoLoja = {
      logradouro: store.logradouro,
      numero: store.numero,
      bairro: store.bairro,
      localidade: store.cidade,
      uf: store.uf,
      cep: store.cep,
      pais: store.pais
    };

    const frete = await calcularFrete(enderecoCliente, enderecoLoja);

    const novoPedido = {
      loja_id: store.id,
      nome_cliente,
      telefone_cliente,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      observacao,
      items
    }

    await createOrderWithItems(novoPedido)


    return Response.json({message: "Pedido criado com sucesso"}, {status: 200});
  } catch (err) {
    console.log("Algo deu errado", err);
    return Response.json({});
  }
}

export async function GET({params}: {params: Promise<{slug: string}>}){
  try{

    const { slug } = await params;

    const loja = await getStoreBySlug(slug);

    if(!loja){
      console.log("Loja não encontrada");
      return Response.json({error: "Loja não encontrada"}, {status: 404})
    }

    const session = await getSession();

    const autorizado = loja.user_id === session.user_id;

    if(!autorizado){
      return Response.json(
        { error: "Sem permissão para acessar esta loja" },
        { status: 403 },
      );
    }

    const orders = await getOrdersBySlug(slug);

    return Response.json(orders, {status: 200});


  }catch(err){
    console.log("Erro ao buscar pedidos")
    return Response.json({error: "Erro ao buscar pedidos"}, {status: 500})
  }
}
