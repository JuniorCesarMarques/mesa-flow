export type Product = {
    id: string;
    nome: string;
    descricao: string;
    categoria: string;
    imagem: string | null;
    preco: number;
    disponivel: boolean;
}