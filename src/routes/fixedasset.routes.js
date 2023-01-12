import { Router } from "express";
const fixedassetRoutes = Router();
import * as fixedassetController from "../controllers/fixedasset.controller";

fixedassetRoutes.post("/create", fixedassetController.createFixedAsset);
fixedassetRoutes.get("/getall", fixedassetController.getFixedAssets);

export default fixedassetRoutes;
