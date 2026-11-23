export type OrderRow = {
  id: string;
  loja_id: string;
  nome_cliente: string;
  telefone_cliente: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  observacao: string;
  status: OrderStatusType;
  criado_em: string;

  item_id: string;
  item_pedido_id: string;
  item_nome: string;
  item_descricao: string;
  item_preco: number;
  item_quantidade: number;
  item_criado_em: string;
};

export type Order = {
  id: string;
  loja_id: string;
  nome_cliente: string;
  telefone_cliente: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  observacao: string;
  status: OrderStatusType;
  criado_em: string;
  items: OrderItem[];
};

export type OrderItem = {
  id: string;
  pedido_id: string;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  criado_em: string;
};

export type OrderStatusType = "pendente" | "preparando" | "concluido" | "cancelado";