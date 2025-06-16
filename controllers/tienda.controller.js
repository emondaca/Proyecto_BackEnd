import { tiendaModel } from "../models/tienda.model.js";

const guardarCarrito = async (req, res) => {
    try {
        const cart_name = `carro_${req.client.id_client}` 

        const borrar_carrito = await tiendaModel.deleteCart(cart_name);
        console.log(borrar_carrito);

        const crear_carrito = await tiendaModel.createCart(cart_name, req.body);
        console.log(crear_carrito);

        const guardar_carrito = await tiendaModel.saveCart(cart_name, req.body);
        console.log(guardar_carrito);
        
    } catch (error) {

    }

}

const traerCarrito = async (req, res) => {
    
}

const traerProducto = async (req, res) => {


}

const traerLista = async (req, res) => {
    const limits = '';
    const page = '';
    const order_by = 'id_ASC';
    try {
        const products = await tiendaModel.getProducts(limits, order_by, page);
        if (!products) {
            return res.status(400).json({ message: "No se encuentran productos registrados"});
        }
        return res.status(200).json(products);
    } catch (error) {


    }
}


export const tiendaController = {
    guardarCarrito,
    traerCarrito,
    traerProducto,
    traerLista
} 