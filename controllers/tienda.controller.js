import { tiendaModel } from "../models/tienda.model.js";

const guardarCarrito = async (req, res) => {


}

const traerCarrito = async (req, res) => {

}

const traerProducto = async (req, res) => {


}

const traerLista = async (req, res) => {
    try {
        await tiendaModel.getProducts(req.body.limits, req.body.order_by, req.body.page);
    } catch (error) {


    }
}


export const tiendaController = {
    guardarCarrito,
    traerCarrito,
    traerProducto,
    traerLista
} 