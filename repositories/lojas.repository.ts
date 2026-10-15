import { pool } from "@/lib/db";

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