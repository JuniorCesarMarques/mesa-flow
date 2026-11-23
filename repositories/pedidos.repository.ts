import { pool } from "@/lib/db";
import { Order, OrderDisplay, OrderItem } from "@/types/order";
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
      A.id,
      A.nome_cliente,
      A.status,
      A.criado_em,
      B.id AS item_id,
      B.nome,
      B.preco,
      B.quantidade,
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

  const orders: OrderDisplay[] = [];

  for (const row of res.rows) {
    let order = orders.find(o => o.id === row.id);

    if(!order){
      order = {
        id: row.id,
        nome_cliente: row.nome_cliente,
        status: row.status,
        criado_em: row.criado_em,
        items: [],
      }

      orders.push(order);

    }

    order.items.push({
      item_id: row.item_id,
      nome: row.nome,
      preco: row.preco,
      quantidade: row.quantidade,
    })

  }

  return orders;
}
