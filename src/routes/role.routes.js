import { Router } from "express";
const roleRoutes = Router();
import * as roleController from "../controllers/role.controller";
import { tokenVerify } from "../middlewares/auth.middleware";

roleRoutes.get("/getall", [tokenVerify], roleController.getRoles);

export default roleRoutes;
