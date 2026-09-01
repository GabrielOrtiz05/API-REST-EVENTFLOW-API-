// src/utils/params.ts
import { AppError } from "../middlewares/error.middleware";

/**
 * Extrai um parâmetro de rota garantindo que é uma string única.
 * No Express 5, req.params[chave] é tipado como `string | string[]`
 * (suporte a parâmetros repetidos, ex: "/:id+"). Como nossas rotas
 * usam sempre um único valor, validamos e lançamos erro 400 caso
 * o parâmetro esteja ausente ou venha como array.
 */
export function requireParam(
  value: string | string[] | undefined,
  name: string
): string {
  if (!value || Array.isArray(value)) {
    throw new AppError(`Parâmetro '${name}' é obrigatório`, 400);
  }
  return value;
}