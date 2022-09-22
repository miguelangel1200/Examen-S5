import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const findAllMovies = async (req, res) =>{
    try {
        const {name,order,gender} = req.query
        let almacenar;
        console.log(name)
        if(name){
            const searchname = await prisma.pelicula.findMany({
                where: {titulo: name, },
                select: {
                    titulo:true,
                    imagen:true,
                    calificacion:true
                }
            })
            almacenar = searchname

        }else if(order){
            const searchorder = await prisma.pelicula.findMany({
                orderBy: {fecha_creacion: order, },
                
            })
            almacenar = searchorder
        }else if(gender){
            const searchgender = await prisma.pelicula.findMany({
                where: {generoId: Number(gender),},
                select: {
                    titulo:true,
                    imagen:true,
                    calificacion:true,
                    generoId:true
                }
                
            })
            almacenar = searchgender
        }else{
            const movies = await prisma.pelicula.findMany({
                select:{
                    imagen: true,
                    titulo: true,
                    fecha_creacion:true
                }
            })
            almacenar = movies
        }

        return res.json(
          almacenar
        )
    } catch (error){
        res.json({
            ok:false,
            data:error.message,
        })
    }
}
export const findDetailMovie = async(req,res)=>{
    try{
        const id = req.params.id
        const movie = await prisma.pelicula.findUnique({
            where: { id: Number(id)},
            select: {
                imagen:true,
                titulo:true,
                personaje:{
                    select:{
                        nombre:true
                    }
                }
            }
        })
        res.json({
            ok: true,
            data: movie
        })
    } catch (error){
        res.json({
            ok:false,
            data:error.message,
        })
    }
}

export const createMovie = async (req,res) => {
    try {
        const {imagen,titulo,calificacion,generoId} = req.body
        const result = await prisma.pelicula.create({
            data: {
                imagen,
                titulo,
                calificacion,
                generoId
            },
        
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}

export const updateMovie = async (req, res) =>{
    try {
        const id = req.params.id
        const {imagen,titulo,calificacion} = req.body

        const movie = await prisma.pelicula.update({
            where: {id: Number(id)},
            data: {
                imagen,titulo,calificacion,
            }
        })
        res.status(200).json("Pelicula editada")
    }catch (error){
        res.status(401).json({
            message: error
        })
    }
}

export const deleteMovie = async (req, res ) =>{
    try{
        const id = req.params.id
        const d_movie = await prisma.pelicula.delete({
            where: {id: Number(id)}
        })
        res.staus(200).json({message: "Pelicula eliminada"})
    } catch (error) {
        res.status(401).json(error)
    }
}

////////////////////////////// Observación
export const searchQueryNameCharacter = async (req, res) => {
    console.log("estoy aqui")
    try {
        const name = req.query.titulo
        
        const searchname = await prisma.pelicula.findMany({
            where: {titulo: name },
            select: {
                titulo:true,
                imagen:true,
                calificacion:true
            }
        })
        res.status(200).json({
            ok: true,
            data: searchname,
        })
    } catch (error) {
        res.status(401).json({
            ok: false,
            data: error.message
        })
    }
}
////////////////////////////// Fin de observación