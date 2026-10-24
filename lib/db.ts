import { Pool } from "pg";

const globalForPg = globalThis as typeof globalThis & {
  pool?: Pool;
};

export const pool =
  globalForPg.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });

globalForPg.pool = pool;
