import { pool } from "@/lib/db";
import { Store } from "@/types/Store";

export async function getAllStores(userId: string){
    const res = await pool.query<Store>("SELECT * FROM lojas WHERE user_id = $1", [userId]);

    return res.rows ?? null;
}

export async function getStoreBySlug(slug: string){
    const res = await pool.query(`
        SELECT 
            A.name,
            B.logo_path,
            B.banner_path
        FROM lojas AS A
            INNER JOIN store_appearence AS B
        ON
            A.id = B.store_id
        WHERE slug = $1`, [slug]);

    return res.rows[0] ?? null;
}