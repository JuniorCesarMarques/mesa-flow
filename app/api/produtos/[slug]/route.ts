import { getStoreBySlug } from "@/repositories/lojas.repository";
import {
  deleteProduct,
  getAllProducts,
  insertProduct,
  updateProduct,
} from "@/repositories/produtos.repository";
import { getSession } from "@/services/auth.service";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    const produtos = await getAllProducts(slug);

    console.log(produtos);

    return Response.json(produtos, { status: 200 });
  } catch (err) {
    console.log("Erro interno do servidor:", err);

    return Response.json(
      { message: "Erro interno do servidor:" },
      { status: 500 },
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const session = await getSession();

    const { slug } = await params;

    const store = await getStoreBySlug(slug);

    if (!session) {
      return Response.json({ error: "Não autenticado" }, { status: 401 });
    }

    if (session.user_id !== store.user_id) {
      return Response.json(
        { error: "Sem permissão para acessar esta loja" },
        { status: 403 },
      );
    }

    const body = await req.json();

    const product = await insertProduct(body, store.id);

    if (!product) {
      return Response.json(
        { error: "Não foi possivel cadastrar o produto!" },
        { status: 500 },
      );
    }

    return Response.json(
      { message: "Produto cadastrado com sucesso", product },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
    return Response.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    const session = await getSession();

    if (!session) {
      return Response.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await req.json();

    const store = await getStoreBySlug(slug);

    if (store.user_id !== session.user_id) {
      return Response.json(
        { error: "Sem permissão para acessar esta loja" },
        { status: 403 },
      );
    }

    const updated = await updateProduct(body);

    if (updated === 0) {
      return Response.json(
        { error: "Produto não encontrado" },
        { status: 404 },
      );
    }

    return Response.json({ message: "Produto editado com sucesso" });
  } catch (err) {
    console.log(err);
    return Response.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return Response.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { id } = await req.json();

    console.log("Deleting product with ID:", id);

    await deleteProduct(id);

    return Response.json(
      { message: "Produto deletado com sucesso" },
      { status: 200 },
    );
  } catch (err) {
    console.log("Erro interno no servidor:", err);

    return Response.json(
      { message: "Erro interno do servidor:" },
      { status: 500 },
    );
  }
}
