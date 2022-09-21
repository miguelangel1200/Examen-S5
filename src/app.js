
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import express from "express";
import cors from "cors";
import { routes } from "./router";
import { movie } from "./components"

export const app = express();

app.use(cors());
app.use(express.json());

//app.use("/api/v1/movie", movie)
routes(app);
//////////////////////////////////
//prueba
////////////////////////////////////
app.post("/create", async (req, res ) =>{
    const {imagen, titulo, calificacion} = req.body
    const result = await prisma.post.creat({
        data:{
            imagen,titulo,calificacion
        }
    })
    res.json(result)
})
/////////////////////////////////////////