import { Router } from "express";
const customerRoutes = Router();
import * as customerController from "../controllers/customer.controller";

customerRoutes.get("/getall", customerController.getCustomers);

export default customerRoutes;
