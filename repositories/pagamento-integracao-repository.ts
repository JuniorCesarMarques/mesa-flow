import { pool } from "@/lib/db";
import type { TokenData } from "@/types/payment";

export async function savePaymentIntegration(
  storeId: string,
  tokenData: TokenData
) {
  const expiresAt = new Date(
    Date.now() + tokenData.expires_in * 1000
  );

  const query = `
    INSERT INTO integracoes_pagamento (
      loja_id,
      provider,
      access_token,
      refresh_token,
      public_key,
      mp_user_id,
      expires_at
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (loja_id, provider)
    DO UPDATE SET
      access_token = EXCLUDED.access_token,
      refresh_token = EXCLUDED.refresh_token,
      public_key = EXCLUDED.public_key,
      mp_user_id = EXCLUDED.mp_user_id,
      expires_at = EXCLUDED.expires_at,
      updated_at = NOW()
    RETURNING id;
  `;

  const values = [
    storeId,
    "mercado_pago",
    tokenData.access_token,
    tokenData.refresh_token,
    tokenData.public_key,
    tokenData.user_id,
    expiresAt,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
}