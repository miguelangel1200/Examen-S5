import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const data = [];

//listado 
export const findAll = async() =>{
    return await prisma.pelicula.findMany();
}

//crear
export const store = async (pelicula) => {
   await prisma.pelicula.create({data:pelicula})
}