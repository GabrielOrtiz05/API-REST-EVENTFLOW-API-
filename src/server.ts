// src/server.ts
import "dotenv/config";
import { app } from "./app";

console.log("JWT_SECRET carregado:", process.env.JWT_SECRET);
console.log("Pasta atual (cwd):", process.cwd());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`EventFlow API rodando em http://localhost:${PORT}`);
});