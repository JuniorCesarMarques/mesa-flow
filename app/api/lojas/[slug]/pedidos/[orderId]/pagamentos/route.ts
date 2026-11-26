import { getOrderById } from "@/repositories/pedidos.repository";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string, orderId: string }> },
) {
  try {

    const { slug, orderId } = await params;

    const { formData } = await req.json();

    const order = await getOrderById(orderId, slug);

    if (!order) {
      return Response.json(
        { error: "Pedido não pertence a loja" },
        { status: 404 },
      );
    }

    console.log(formData);
    return Response.json({});
  } catch (err) {
    return Response.json({error: "Erro interno do servidor"});
  }
}
