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

export async function insertProduct(product: Product) {
  const { nome, descricao, preco, imagem, disponivel } = product;

  const res = await pool.query(
    `
        INSERT INTO
            produtos (nome, descricao, preco, imagem, disponivel)
        VALUES(?, ?, ?, ?, ?)`,
    [nome, descricao, preco, imagem, disponivel],
  );

  return res.rowCount;
}

export const deleteProducts = (ids: number[]) => {
  const placeholders = ids.map((id) => "?").join(",");

  return pool.query(`DELETE FROM products WHERE id IN (${placeholders})`, ids);
};

export const updateProduct = async (
  product: Product,
  user_id: string,
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
