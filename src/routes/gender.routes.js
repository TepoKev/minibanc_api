import { Router } from "express";
const genderRoutes = Router();
import * as genderController from "../controllers/gender.controller";
import { tokenVerify } from "../middlewares/auth.middleware";

genderRoutes.get("/getall", genderController.getGenders);
genderRoutes.get("/getbyid/:id", genderController.getGenderById);
genderRoutes.post("/create", [tokenVerify], genderController.createGender);
export default genderRoutes;
