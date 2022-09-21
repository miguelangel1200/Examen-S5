import { prisma } from "@prisma/client"
import * as DB from "../../db/index"


export const findAll = async (req,res) => {
    const data = await DB.findAll();
    return res.json({
        ok:true,
        data,
    });
}

export const create = async(req, res) =>{
    const { body } = req;
    await DB.store(body);
    return res.status(201).json({
        ok: true,
        data: "Pelicula creada"
    });
};