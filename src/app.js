import express from "express";
import pkg from "../package.json";
import cors from "cors";
import morgan from "morgan";
import { initialSetup } from "./utils/initialSetup";
import authRoutes from "./routes/auth.routes";
import genderRoutes from "./routes/gender.routes";
import roleRoutes from "./routes/role.routes";
import countryRoutes from "./routes/country.routes";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import fixedassetRoutes from "./routes/fixedasset.routes";
import creditRoutes from "./routes/credit.routes";
import customerRoutes from "./routes/customer.routes";
import typeCreditRoutes from "./routes/typecredit.routes";
import quotaRoutes from "./routes/quota.routes";

const app = express();

app.set("pkg", pkg);
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/gender", genderRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/country", countryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/fixedasset", fixedassetRoutes);
app.use("/api/credit", creditRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/typecredit", typeCreditRoutes);
app.use("/api/quota", quotaRoutes);


export default app;
