import "dotenv/config";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    } 
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.client = payload;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({ error: "Invalid token" });
    }   
};