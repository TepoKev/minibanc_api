import { Router } from "express";
const quotaRoutes = Router();
import * as quotaController from "../controllers/quota.controller";
import { tokenVerify } from "../middlewares/auth.middleware";

quotaRoutes.get("/get/:id", [tokenVerify], quotaController.getQuotasByCreditId);

export default quotaRoutes;
