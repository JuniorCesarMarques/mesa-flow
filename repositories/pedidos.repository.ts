import { pool } from "@/lib/db";
import { Order, OrderItem } from "@/types/order";
import { PoolClient } from "pg";

export const createOrder = async (data: Order, client: PoolClient) => {
  const res = await client.query(
    `
        INSERT INTO pedidos (
            loja_id,
            nome_cliente,
            telefone_cliente,
            cep,
            rua,
            numero,
            complemento,
            bairro,
            cidade,
            valor_frete,
            observacao
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id`,
    [
      data.loja_id,
      data.nome_cliente,
      data.telefone_cliente,
      data.cep,
      data.rua,
      data.numero,
      data.complemento,
      data.bairro,
      data.cidade,
      10,
      data.observacao,
    ],
  );

  return res.rows[0];
};

export async function createOrderItem(data: OrderItem, client: PoolClient) {
  await client.query(
    `
    INSERT INTO itens_pedido (
      pedido_id,
      nome,
      descricao, 
      quantidade,
      preco
    ) VALUES ($1, $2, $3, $4, $5)
    `,
    [data.pedido_id, data.nome, data.descricao, data.quantidade, data.preco],
  );
}

export async function createOrderWithItems(data: Order) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const pedido = await createOrder(data, client);

    for (const item of data.items) {
      await createOrderItem({ ...item, pedido_id: pedido.id }, client);
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function getOrdersBySlug(slug: string) {
  const res = await pool.query(
    `
    SELECT 
      A.*,
      B.*,
      C.slug
    FROM pedidos AS A
      INNER JOIN
    itens_pedido AS B
      ON
    A.id = B.pedido_id
      INNER JOIN lojas AS C
    ON
      A.loja_id = C.id
    WHERE C.slug = $1;
      `,
    [slug],
  );

  const orders = new Map<string, Order>();

  for (const row of res.rows) {
    if (!orders.has(row.id)) {
      orders.set(row.id, {
        id: row.id,
        loja_id: row.loja_id,
        nome_cliente: row.nome_cliente,
        telefone_cliente: row.telefone_cliente,
        cep: row.cep,
        rua: row.rua,
        numero: row.numero,
        complemento: row.complemento,
        bairro: row.bairro,
        cidade: row.cidade,
        observacao: row.observacao,
        status: row.status,
        criado_em: row.criado_em,
        items: [],
      });
    }


    orders.get(row.id)!.items.push({
      id: row.item_id,
      pedido_id: row.item_pedido_id,
      nome: row.item_nome,
      descricao: row.item_descricao,
      quantidade: row.item_quantidade,
      preco: row.item_preco,
      criado_em: row.item_criado_em,
    });
  }

  return Array.from(orders.values());
}
