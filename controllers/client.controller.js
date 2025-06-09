import bcript from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { clientModel } from "../models/client.model.js";

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const cliente = await clientModel.findOneEmail(email);
        if (!cliente) {
        return res.status(400).json({ message: "Cliente no encontrado" });
        } 
        console.log(cliente);
        const isMatch = bcript.compareSync(password, cliente.pass_word);
        if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
        } 

        const payload = { email, id_client: cliente.id };

        const token = jwt.sign(payload, process.env.JWT_SECRET);
        console.log(token, payload)
        return res.status(200).json({ message: "User logged successfully", token, email });

    } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
    }
};

const registrar = async (req, res) => {  
    try {
        const emailExist = await clientModel.findOneEmail(req.body.email);
        if (!emailExist) {
            await clientModel.createClient(
                req.body.email,
                bcript.hashSync(req.body.password, 10),
                req.body.telefono,
                req.body.nombres,
                req.body.apellido_paterno,
                req.body.apellido_materno,
                req.body.rut,
                req.body.fecha_nacimiento
            ); 
            return res.status(201).json({ message: "Cliente creado exitosamente" });  
        }
        return res.status(400).json({message: "email ya existe"});
        
    } catch (error) {
        console.log(error);
        if (error.code) {
            const { code, message} = getDatabaseError(error.code);
            return( {code, message });  
        } 
        return res.status(500).json({ message: "Internal server error" });
    }
};
    
const traer = async (req, res) => {
    try {
        const cliente = await clientModel.getClient(req.client.id_client);
        if (!cliente) {
        return res.status(400).json({ message: "Client not found" });
        } 
        const perfil = {
            email: cliente.email,
            telefono: cliente.telefono,
            nombres: cliente.nombres,
            apellido_paterno: cliente.apellido_paterno,
            apellido_materno: cliente.apellido_materno,
            rut: cliente.rut,
            fecha_nacimiento: cliente.fecha_nacimiento
        }
        return res.status(200).json({ perfil});
        
    } catch (error) {
        console.log(error);
        if (error.code === "23505") {
        return res.status(400).json({ message: "User already exists" });
        } 
        return res.status(500).json({ message: "Internal server error" });
    }

};

export const clientController = {
    login,
    registrar, 
    traer
};