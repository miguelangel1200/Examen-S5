import { Router } from "express";
import * as Controller from "./controller";
import { authJwt } from "../../middlewares"

const characterRouter = Router()


characterRouter.get("/", Controller.findAllCharacters);
characterRouter.get("/:id", Controller.findDetailCharacter);
characterRouter.post("/" ,[authJwt.verifyToken], Controller.createCharacter);
characterRouter.put("/:id" ,[authJwt.verifyToken], Controller.updateCharacter);
characterRouter.delete("/:id" ,[authJwt.verifyToken], Controller.deleteCharacter);

//Filtros Query
characterRouter.get("/query", Controller.findQueryNameCharacter);

export default characterRouter