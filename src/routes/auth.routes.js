import { Router } from "express";
const authRoutes = Router();
import * as authController from "../controllers/auth.controller";

authRoutes.post("/signin", authController.sigin);
authRoutes.post("/login", authController.login);

export default authRoutes;