import express from "express";
import cors from "cors";
import { authRoutes } from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";
import { authMiddleware } from "./middlewares/auth.middleware";
import { categoryRoutes } from "./routes/category.routes";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/categories", categoryRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRoutes);

// O error handler deve ser o ÚLTIMO
app.use(errorHandler);