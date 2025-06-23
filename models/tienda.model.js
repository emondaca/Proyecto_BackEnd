import "dotenv/config"
import format from "pg-format"

import { pool } from "../database/connection.js"

const deleteCart = async (cart_name) => {
    const del = await pool.query(`DROP TABLE IF EXISTS ${cart_name}`);
    return "Borrado";
};


const createCart = async (cart_name, carrito) => {
    const crea = await pool.query(`CREATE TABLE ${cart_name} (id SERIAL PRIMARY KEY, product_id VARCHAR(25), cantidad INTEGER)`);
    return "Creado"
}

const saveCart = async (cart_name, carrito) => {
    const insertar = `INSERT INTO ${cart_name} VALUES (DEFAULT, $1, $2)`;
    carrito.forEach(async (prod) => {
        const item = [prod.id, prod.cantidad]
        await pool.query(insertar, item);
    })
    return "Guardado"
}

const getCart = async (cart_name) => {
    const consulta = `SELECT ${cart_name}.product_id AS id, productos.imagen AS img, productos.nombre AS name, productos.precio AS price, ${cart_name}.cantidad AS count
    FROM ${cart_name} INNER JOIN productos ON ${cart_name}.product_id = productos.id`;
    const { rows } = await pool.query(consulta)
    return rows;
};

const getOneProduct = async (id) => {

};

const getProducts = async (limits, order_by, page) =>  {
    let filtros = [];
    if (order_by) {
        const [campo, direccion] = order_by.split("_");
        filtros.push(`ORDER BY ${campo}`);
        filtros.push(` ${direccion}`);
    }
    
    if (limits) filtros.push(`LIMIT ${limits}`);
    if (page) filtros.push(`OFFSET ${limits * page}`);

    let consulta = format("SELECT * FROM productos");

    let filtro = "";
    if (filtros.length > 0) {
        filtro = filtros.join(" ");
        consulta += ` ${filtro}`;
    };
    const { rows } = await pool.query(consulta);
    return rows;
    

};

export const tiendaModel = {
    createCart,
    saveCart,
    deleteCart,
    getCart,
    getOneProduct,
    getProducts
}
