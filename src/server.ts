// src/server.ts
import "dotenv/config";
import { app } from "./app";
import { logger } from "./utils/logger";

if (!process.env.JWT_SECRET) {
  logger.error("JWT_SECRET não está definido no .env — a API não pode iniciar com segurança.");
  process.exit(1);
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`EventFlow API rodando em http://localhost:${PORT}`);
});