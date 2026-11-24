export type CreateOrder =  Omit<Order, "id" | "status" | "criado_em">;

export type OrderDisplay = {
  id: string;
  nome_cliente: string;
  status: OrderStatusType;
  criado_em: string;
  items: {
    item_id: string;
    nome: string;
    preco: number;
    quantidade: number;
  }[];
}


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