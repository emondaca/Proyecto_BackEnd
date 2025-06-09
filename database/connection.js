import pg from "pg";
import "dotenv/config"

const { Pool } = pg;
export const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '@EMmc1890',
    database: 'creaciones_mov',
    port: 5433,
    allowExitOnIdle: true
});

try {
    await pool.query("SELECT NOW()");
    console.log("Database connected");
} catch (error) {
    console.log(error);
}