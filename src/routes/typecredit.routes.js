import { Router } from "express";
const typeCreditRoutes = Router();
import * as typeCreditController from "../controllers/typecredit.controller";

typeCreditRoutes.get("/getall", typeCreditController.getTypesCredit);

export default typeCreditRoutes;
