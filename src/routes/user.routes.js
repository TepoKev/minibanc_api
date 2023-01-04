import { Router } from "express";
const userRoutes = Router();
import * as userController from "../controllers/user.controller";
import { tokenVerify } from "../middlewares/auth.middleware";

userRoutes.get("/getall", [tokenVerify], userController.getUsers);

export default userRoutes;
