import { Router } from "express";
const categoryRoutes = Router();
import * as categoryController from "../controllers/category.controller";

categoryRoutes.get("/getall", categoryController.getCategories);

export default categoryRoutes;
