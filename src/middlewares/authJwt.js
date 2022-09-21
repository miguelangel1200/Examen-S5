import jwt from "jsonwebtoken";
import config from "../../config";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
//función que verifica que el usuario exista
export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]

        //Confirma si hay un token
        if (!token) return res.status(403).json({message: "Token no comprobado"})

        //verifica si el token de usuario existe y recupera el id del usuario
        const decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.id
        
        //obtiene los datos del usuario por el token, menos la contraseña

        //const user = await User.findById(req.userId, {password: 0})
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId,
            }
        })
        if (!user) return res.status(404).json({message: "Usuario no encontrado"})
        next()
    } catch (error) {
        return res.status(401).json({message: "No autorizado"})
    }
}

//Funcion que verifica si es moderador el usuario
