import { pool } from "@/lib/db";

export async function createOAuthAttempt({
  storeId,
  state,
  codeVerifier,
}: {
  storeId: string;
  state: string;
  codeVerifier: string;
}) {
  await pool.query(
    `INSERT INTO oauth_tentativas
    (
        loja_id,
        state,
        code_verifier,
        expires_at
    )
     VALUES ($1, $2, $3, NOW() + INTERVAL '10 minutes')`,
    [storeId, state, codeVerifier]
  );
}

export async function consumeOAuthAttempt(state: string) {
  const res = await pool.query(
    `DELETE FROM oauth_tentativas
     WHERE state = $1
       AND expires_at > NOW()
     RETURNING loja_id, code_verifier`,
    [state]
  );

  return res.rows[0] ?? null;
}