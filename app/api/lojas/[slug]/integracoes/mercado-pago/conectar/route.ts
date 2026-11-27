
import { getSession } from "@/services/auth.service";
import { getStoreOwnerBySlug } from "@/repositories/lojas.repository";
import { generatePKCE, generateOAuthState } from "@/lib/mercadopago/oauth"
import { createOAuthAttempt } from "@/repositories/oauth.repository";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: Request, { params }: Props) {
  const { slug } = await params;

  // 1. Verifica autenticação
  const session = await getSession();

  if (!session) {
    return Response.json(
      { error: "Não autenticado" },
      { status: 401 }
    );
  }

  // 2. Verifica propriedade da loja
  const store = await getStoreOwnerBySlug(slug);

  if (!store || store.user_id !== session.user_id) {
    return Response.json(
      { error: "Loja não encontrada" },
      { status: 404 }
    );
  }

  // 3. Verifica configurações
  const clientId = process.env.MERCADO_PAGO_CLIENT_ID;
  const redirectUri = process.env.MERCADO_PAGO_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return Response.json(
      { error: "Configuração do Mercado Pago ausente" },
      { status: 500 }
    );
  }

  // 4. Gera state e PKCE
  const state = generateOAuthState();
  const { codeVerifier, codeChallenge } = generatePKCE();

  // 5. Persiste os dados da tentativa
await createOAuthAttempt({storeId: store.id, state, codeVerifier});

  // 6. Monta URL de autorização
  const authorizationUrl = new URL(
    "https://auth.mercadopago.com/authorization"
  );

  authorizationUrl.searchParams.set("client_id", clientId);
  authorizationUrl.searchParams.set("response_type", "code");
  authorizationUrl.searchParams.set("redirect_uri", redirectUri);
  authorizationUrl.searchParams.set("state", state);
  authorizationUrl.searchParams.set("code_challenge", codeChallenge);
  authorizationUrl.searchParams.set("code_challenge_method", "S256");
  authorizationUrl.searchParams.set("platform_id", "mp");

  return Response.redirect(authorizationUrl);
}
