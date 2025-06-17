import pg from "pg";
import "dotenv/config"

const { Pool } = pg;
export const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    allowExitOnIdle: true
});

try {
    await pool.query("SELECT NOW()");
    console.log("Database connected");
} catch (error) {
    console.log(error);
}