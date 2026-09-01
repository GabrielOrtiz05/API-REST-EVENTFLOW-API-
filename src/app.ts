import express from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { authRoutes } from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";
import { categoryRoutes } from "./routes/category.routes";
import { logger } from "./utils/logger";
import { eventRoutes } from "./routes/event.routes";

export const app = express();

// 1. Middlewares globais (DEVEM vir antes das rotas)
app.use(helmet());
app.use(cors());
app.use(express.json()); // <-- Faz o parse do body JSON
app.use(pinoHttp({ logger }));

// 2. Rotas da aplicação
app.use("/events", eventRoutes);
app.use("/categories", categoryRoutes);
app.use("/auth", authRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// 3. Error Handler (DEVE ser sempre o último)
app.use(errorHandler);