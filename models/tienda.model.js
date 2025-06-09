import "dotenv/config"
import format from "pg-format"

import { pool } from "../database/connection.js"

const saveCart = async (cart) => {

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
    console.log(consulta);

};

export const tiendaModel = {
    saveCart,
    getOneProduct,
    getProducts
}
