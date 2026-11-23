import { pool } from "@/lib/db";
import { Store } from "@/types/Store";

export async function getAllStores(userId: string){
    const res = await pool.query<Store>("SELECT * FROM lojas WHERE user_id = $1", [userId]);

    return res.rows ?? null;
}

export async function getStoreBySlug(slug: string){
    const res = await pool.query(`
        SELECT 
            A.id,
            A.user_id,
            A.name,
            C.logo_path,
            C.banner_path,
            B.estado,
            B.cidade,
            b.numero,
            B.logradouro,
            B.bairro
        FROM lojas AS A
            INNER JOIN enderecos AS B
        ON
            A.id = B.loja_id
            INNER JOIN store_appearence AS C
        ON
            A.id = C.store_id
        WHERE A.slug = $1`, [slug]);

    return res.rows[0] ?? null;
}