import request from 'supertest'
import app from "../index.js"
import assert from 'assert/strict'

describe("Operaciones CRUD de MOV Creaciones", () => {

    /* Test de ruta GET /clientes/perfil */
    it("No se envia perfil de usuario sin autenticación", async () => {
        const response = await request(app).get("/clientes/perfil").send();
        const status = response.statusCode; 
        assert.strictEqual(status, 401);
        assert.strictEqual(response.body.error, 'No token provided');
    });

    /* Test de ruta POST /clientes/login */
     it("Intento de ingreso con usuario no registrado", async () => {
        const user = {email: "juan.perez@gmail.com", password: "123456" }
        const response = await request(app).post("/clientes/login").send(user);
        const status = response.statusCode; 
        assert.strictEqual(status, 400);
        assert.strictEqual(response.body.message, 'Cliente no encontrado');
    });

    /* Test de ruta POST /clientes/registrar */
    it("Ingreso de nuevo usuario", async () => {
        const cliente = {
            email: "prueba003@hotmail.com",
            password: "123456",
            telefono: "9876574",
            nombres: "Mario Luis",
            apellido_paterno: "Gonzalez",
            apellido_materno: "Rojas",
            rut: "9867584-7",
            fecha_nacimiento: "02/05/1960"
        };
        const response = await request(app).post("/clientes/registrar").send(cliente);
        const status = response.statusCode; 
        assert.strictEqual(status, 201);
        assert.strictEqual(response.body.message, 'Cliente creado exitosamente');
    });

     it("Intento de ingreso de usuario ya existente", async () => {
        const cliente = {
            email: "prueba003@hotmail.com",
            password: "123456",
            telefono: "9876574",
            nombres: "Mario Luis",
            apellido_paterno: "Gonzalez",
            apellido_materno: "Rojas",
            rut: "9867584-7",
            fecha_nacimiento: "02/05/1960"
        };
        const response = await request(app).post("/clientes/registrar").send(cliente);
        const status = response.statusCode; 
        assert.strictEqual(status, 400);
        assert.strictEqual(response.body.message, 'email ya existe');
    });
})