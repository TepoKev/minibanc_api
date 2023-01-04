import { Router } from "express";
const countryRoutes = Router();
import * as countryController from "../controllers/country.controller";

countryRoutes.get("/getall", countryController.getCountries);

export default countryRoutes;
