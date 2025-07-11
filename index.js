import express from 'express';
import cors from 'cors';
import "dotenv/config";

import router from './routes/routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

import swagger_ui from 'swagger-ui';
import swagger_doc from 'swagger-jsdoc';
import SwaggerUI from 'swagger-ui';

const { swaggerUI } = swagger_ui;
const { swaggerJSDoc } = swagger_doc
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT

const app = express();
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node Proyecto API",
            version: "1.0.0"
        },
        servers: [
            {
                /*Desarrollo*/
                /*url: "http://localhost: 3000"*/
                /*Producción*/
                url: `https://proyecto-backend-h0h6.onrender.com: ${port}`
            },
        ],
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`]
}

app.listen(port, console.log(`app listening on port ${port}`))

app.use(express.json());
app.use(cors());

app.use("/", router);

export default app;
/*app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerSpec)));*/