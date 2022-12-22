import { Router } from "express";
const authRoutes = Router();
import * as authController from "../controllers/auth.controller";
import { tokenVerify } from "../middlewares/auth.middleware";

authRoutes.post("/signin", [tokenVerify], authController.sigin);
authRoutes.post("/login", authController.login);
authRoutes.post("/validationToken", authController.validationToken);
authRoutes.post("/checkEmail", authController.checkEmail);

export default authRoutes;
