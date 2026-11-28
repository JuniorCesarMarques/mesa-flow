
import { consumeOAuthAttempt } from "@/repositories/oauth.repository";
import { savePaymentIntegration } from "@/repositories/pagamento-integracao-repository";

type MercadoPagoTokenResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  user_id: number;
  public_key: string;
  live_mode: boolean;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  // 1. Verifica o state
  if (!state) {
    return Response.json(
      { error: "State ausente" },
      { status: 400 }
    );
  }

  // 2. Recupera e consome a tentativa
  const attempt = await consumeOAuthAttempt(state);

  if (!attempt) {
    return Response.json(
      { error: "Tentativa inválida ou expirada" },
      { status: 400 }
    );
  }

  // 3. Verifica se o usuário negou a autorização
  if (error) {
    return Response.json(
      { error: "Autorização não concedida" },
      { status: 400 }
    );
  }

  if (!code) {
    return Response.json(
      { error: "Código de autorização ausente" },
      { status: 400 }
    );
  }

  // 4. Recupera as credenciais da aplicação
  const clientId = process.env.MERCADO_PAGO_CLIENT_ID;
  const clientSecret = process.env.MERCADO_PAGO_CLIENT_SECRET;
  const redirectUri = process.env.MERCADO_PAGO_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return Response.json(
      { error: "Configuração do Mercado Pago ausente" },
      { status: 500 }
    );
  }

  // 5. Troca o código pelos tokens
  const response = await fetch(
    "https://api.mercadopago.com/oauth/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: attempt.code_verifier,
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    console.error("Erro Mercado Pago OAuth:", {
      status: response.status,
      error: errorData.error,
    });

    return Response.json(
      { error: "Não foi possível obter os tokens" },
      { status: 502 }
    );
  }

  const tokenData =
    (await response.json()) as MercadoPagoTokenResponse;

  await savePaymentIntegration(attempt.loja_id, tokenData);

  return Response.json({
    message: "Autorização realizada com sucesso",
    storeId: attempt.loja_id,
    providerUserId: tokenData.user_id,
  });
}
