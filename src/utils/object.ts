// src/utils/object.ts

/**
 * Remove chaves com valor `undefined` de um objeto — em runtime E no tipo.
 * Necessário porque, com `exactOptionalPropertyTypes: true`, o Prisma
 * não aceita `{ campo: undefined }` — a chave precisa estar totalmente ausente
 * ou ter um valor que não inclua `undefined` no tipo.
 *
 * O mapped type é homomórfico (sem "?" extra), então preserva a
 * obrigatoriedade original de cada campo: campos obrigatórios continuam
 * obrigatórios, só os opcionais deixam de aceitar `undefined` explícito.
 */
export function omitUndefined<T extends Record<string, unknown>>(
  obj: T
): { [K in keyof T]: Exclude<T[K], undefined> } {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined)
  ) as { [K in keyof T]: Exclude<T[K], undefined> };
}