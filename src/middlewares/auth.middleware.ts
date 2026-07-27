// src/middlewares/auth.middleware.ts
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./error.middleware";

// Estendemos o tipo Request do Express para incluir "user"
export interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string };
}

export function authMiddleware(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(new AppError("Token não fornecido", 401));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(new AppError("Token não fornecido", 401));
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    const payload = jwt.verify(token, secret) as unknown as { sub: string; role: string };

    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    next(new AppError("Token inválido ou expirado", 401));
  }
}

// Middleware adicional: restringe por papel
export function requireRole(...roles: string[]) {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError("Acesso negado para este papel de usuário", 403));
    }
    next();
  };
}