import { getStoreAppearence } from "@/repositories/loja-config.repository";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    const res = await getStoreAppearence(slug);

    if (!res.length) {
      return Response.json(
        { message: "Parametros não encontrados" },
        { status: 404 },
      );
    }

    return Response.json(res[0]);
  } catch (err) {
    return Response.json(
      { message: "Erro interno do servidor:" },
      { status: 500 },
    );
  }
}
