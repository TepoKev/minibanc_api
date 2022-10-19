import express from "express";
import pkg from "../package.json";
import cors from "cors";
import morgan from "morgan";

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

export default app;
