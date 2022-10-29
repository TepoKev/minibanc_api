import express from "express";
import pkg from "../package.json";
import cors from "cors";
import morgan from "morgan";
import { initialSetup } from "./utils/initialSetup";
import authRoutes from "./routes/auth.routes";

const app = express();

initialSetup();

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

export default app;
