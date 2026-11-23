import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ cep: string }> }
) {
  const { cep } = await params;

  if (!/^\d{8}$/.test(cep)) {
    return NextResponse.json(
      { error: "CEP inválido" },
      { status: 400 }
    );
  }

  const response = await fetch(
    `https://viacep.com.br/ws/${cep}/json/`
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Erro ao consultar CEP" },
      { status: 502 }
    );
  }

  const data = await response.json();

  if (data.erro) {
    return NextResponse.json(
      { error: "CEP não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}