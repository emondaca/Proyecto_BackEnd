import "dotenv/config";
import format from "pg-format";

import { pool } from "../database/connection.js";

const findOneEmail = async (email) => {
    const consulta = "SELECT * FROM clientes WHERE email = $1";
    const { rows } = await pool.query(consulta, [email]);
    return rows[0];
};

const createClient = async( email, password, telefono, nombres, apellido_paterno, apellido_materno, rut, fecha_nacimiento) => {
    const registrar = "INSERT INTO clientes VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8)";
    const cliente = [email, password, telefono, nombres, apellido_paterno, apellido_materno, rut, fecha_nacimiento];
    const resp = await pool.query(registrar, cliente);
    return resp;
};

const getClient =async (id) => {
    const consulta = "SELECT * FROM clientes WHERE id = $1";
    const { rows } = await pool.query(consulta, [id]);
    return rows[0];
};

export const clientModel = {
    findOneEmail,
    createClient,
    getClient
}


