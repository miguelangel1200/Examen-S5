import {Router} from "express";
import * as Controller from "./controller"
import { authJwt } from "../../middlewares"

const movieRouter = Router();


movieRouter.get("/", Controller.findAllMovies);
movieRouter.get("/:id", Controller.findDetailMovie);
movieRouter.post("/",[authJwt.verifyToken],Controller.createMovie);
movieRouter.put("/:id",[authJwt.verifyToken], Controller.updateMovie);
movieRouter.delete("/:id", [authJwt.verifyToken], Controller.deleteMovie);

//////
//movieRouter.get("/", Controller.searchQueryNameCharacter);

export default movieRouter;