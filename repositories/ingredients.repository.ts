import { pool } from "@/lib/db";

export async function getConfigsBySlug(slug: string) {
  const res = await pool.query(
    `
    SELECT 
      A.id,
      B.slug,
      A.nome,
      A.limite,
      A.preco,
      A.imagem,
      A.descricao
    FROM
      config_produto AS A
    INNER JOIN
      lojas AS B
    ON
      A.loja_id = B.id
    WHERE
      B.slug = $1`,
    [slug],
  );

  return res.rows;
}

export async function getIngredientsBySlug(slug: string) {
  const res = await pool.query(
    ` 
    SELECT 
      A.id,
      A.nome,
      A.preco
    FROM 
      ingredientes AS A
    INNER JOIN
      lojas AS B
    ON
      A.loja_id = B.id
    WHERE
      B.slug = $1
    `,
    [slug],
  );

  return res.rows;
}

