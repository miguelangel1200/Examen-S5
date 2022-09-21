import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

////////////////////////////// Observación
export const findQueryNameCharacter = async (req, res) => {
    console.log("estoy aqui")
    try {
        console.log("estoy aqui")
        const nom = JSON.parse(req.query.nombre)
        console.log(nom)

        await prisma.personaje.findMany({
            where: {nombre: req.query.nombre},
            select: {
                imagen:true,
                nombre:true,
                edad: true,
                historia: true,
            }
        })
        res.status(200).json({
            ok: true,
            data: characters,
        })
    } catch (error) {
        res.status(401).json({
            ok: false,
            data: error.message
        })
    }
}
////////////////////////////// Fin de observación

export const findAllCharacters = async (req, res) => {
    try {
        const characters = await prisma.personaje.findMany({
            select: {
                imagen: true,
                nombre: true
            }
        })
        res.json({
            ok: true,
            data: characters,
        })
    } catch (error) {
        res.json({
            ok: false,
            data: error.message,
        })
    }
}

export const findDetailCharacter = async (req, res) => {
    try {
        const id = req.params.id

        //No se puede utilizar include y select al mismo tiempo
        const character = await prisma.personaje.findUnique({
            where: {id: Number(id)},
            select: {
                imagen:true,
                nombre:true,
                edad: true,
                historia: true,
                pelicula: {
                    select:{
                        titulo: true
                    }
                }
            }
        })
        res.json({
            ok: true,
            data: character,
        })
    } catch (error) {
        res.json({
            ok: false,
            data: error.message,
        })
    }
}

export const createCharacter = async (req, res) => {
    try {
        const {imagen, nombre, edad, historia} = req.body
        const result = await prisma.personaje.create({
            data: {
                imagen,
                nombre,
                edad,
                historia
            }
        })
        res.status(200).json(result)

    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

export const updateCharacter = async (req, res) => {
    try {
        const id = req.params.id
        const {imagen, nombre, edad, historia} = req.body
        

        const character = await prisma.personaje.update({
            where: {id: Number(id)},
            data: {
                imagen,
                nombre,
                edad,
                historia,
            }
        })
        res.status(200).json("personaje editado")
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

export const deleteCharacter = async (req, res) => {
    try {
        const id = req.params.id
        const d_charater = await prisma.personaje.delete({
            where: {id: Number(id)}
        })
        res.status(200).json({message: "Personaje eliminado"})
    } catch (error) {
        res.status(401).json(error)
    }
}