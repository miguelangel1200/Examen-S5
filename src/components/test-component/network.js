import { Router } from "express";
import * as Controller from "./controller";
import { authJwt } from "../../middlewares"

const testRouter = Router();

testRouter.route("/").get(Controller.findAll);
testRouter.route("/signup").post(Controller.create);
testRouter.route("/signin").post(Controller.login);

testRouter.route("/prueba",[authJwt.verifyToken]).get(Controller.prueba);

export default testRouter;
