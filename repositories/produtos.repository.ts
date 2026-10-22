import { pool } from "@/lib/db";
import { Product } from "@/types/product";

export const getAllProducts = async (slug: string) => {
  const res = await pool.query(
    `
    SELECT
     B.*
    FROM
      lojas AS A
    INNER JOIN
      produtos AS B
    ON
      A.id = B.loja_id
    WHERE A.slug = $1;`,
    [slug],
  );

  return res.rows;
};

export async function insertProduct(product: Product, storeId: string) {

  console.log("Loja ID:", storeId);

  const { nome, descricao, preco, imagem, disponivel } = product;

  const res = await pool.query(
    `
        INSERT INTO
            produtos (loja_id, nome, descricao, preco, imagem, disponivel)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *
        `,
    [storeId, nome, descricao, preco, imagem, disponivel],
  );

  return res.rows[0];
}

export const deleteProduct = (id: number) => {

  return pool.query(`DELETE FROM produtos WHERE id = $1`, [id]);
};

export const updateProduct = async (
  product: Product,
) => {
  const { id, nome, descricao, preco, imagem, disponivel } = product;

  const res = await pool.query(
    `UPDATE produtos
     SET 
        nome = $1,
        descricao = $2,
        preco = $3,
        imagem = $4,
        disponivel = $5
     WHERE id = $6`,
    [nome, descricao, preco, imagem, disponivel, id],
  );

  return res.rowCount;
};
