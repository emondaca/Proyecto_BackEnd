import { Router } from "express";



import { clientController } from "../controllers/client.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { reportarConsulta } from "../middlewares/report.middleware.js"
import { tiendaController } from "../controllers/tienda.controller.js";

const router = Router();

// POST /clientes

/**
 * @swagger
 * 
 * POST /clientes
 *  summary: Crear nuevo cliente
 *  request: 
 *      payload: {
 *          nombres: String,
 *          apellido1: String,
 *          apelldio2: String,
 *          email: String,
 *          rut: String,
 *      }
 * response:
 *      body: {
 *          code: Integer,
 *          message: String
 *      }
 * 
 * 
 * GET /clients/:id
 *  summary: Solicitar datos del cliente id
 *  response:
 *      body: {
 *          nombres: String,
 *          apellido1: String,
 *          apelldio2: String,
 *          email: String,
 *          rut: String,
 *      }
 * 
 * 
 * GET /clients/:id/compras
 *  summary: Solicita listado de compras realizadas por cliente id
 *  response: 
 *      body: {
 *          productos: Object
 *      }
 * 
 * 
 * POST /login
 *  summary: Solicita ingreso (login)
 *  request:
 *      payload: {
 *          email: String,
 *          password: String,
 *      }
 *  response:
 *      body: {
 *          token: String,
 *          cliente: {
 *              id: Integer,
 *              email: String,
 *          }
 *      }
 * 
 * 
 * GET /products
 *  summary: Solicita productos por pagina para presentar en tienda
 *  response:
 *      body: {
 *          productos: Array of Objects,
 *      }
 * 
 * 
 * GET /products/:id
 *  summary: Solicita información de producto id.
 *      body: {
 *          idproduct: Integer,
 *          productname: String,
 *          imagenes: Array of String,
 *          precio: Number,
 *          stock: Integer,
 *      }
 * 
 * 
 * GET /products/:id/comentarios
 *  summary: Solicita los comentarios del producto id
 *  response:
 *      body: {
 *          comentarios: Array of String,
 *      }
 * 
 * 
 * POST /carrito
 *  summary: Agrega producto a carrito
 *  request:
 *      body:{
 *          idproduct: Integer,
 *          cantidad: Integer, 
 *      }
 *  response:
 *      body: {
 *          code: String,
 *          message: String
 *      }
 * 
 * 
 * GET /carrito
 *  summary: Solicita carrito actualizado
 *  response:
 *      body: {
 *          carrito: Array of Objects,
 *      }
 */


router.post("/clientes/registrar", reportarConsulta, clientController.registrar);

router.post("/clientes/login", reportarConsulta, clientController.login);

router.get("/clientes/perfil", reportarConsulta, authMiddleware, clientController.traer);

router.post("/tienda/carrito", reportarConsulta, authMiddleware, tiendaController.guardarCarrito)

router.get("/tienda/carrito", reportarConsulta, tiendaController.traerCarrito)

router.get("/tienda/:id", reportarConsulta, tiendaController.traerProducto)

router.get("/tienda/", reportarConsulta, tiendaController.traerLista)

export default router;