import { Router } from "express";
const creditRoutes = Router();
import * as creditController from "../controllers/credit.controller";
import { tokenVerify } from "../middlewares/auth.middleware";

creditRoutes.post("/create", [tokenVerify], creditController.createCredit);
creditRoutes.get("/getall", [tokenVerify], creditController.getCredits);

export default creditRoutes;
