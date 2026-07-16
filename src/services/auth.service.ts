// src/services/auth.service.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma";
import { AppError } from "../middlewares/error.middleware";
import { LoginInput, RegisterInput } from "../schemas/auth.schema";

function generateToken(userId: string, role: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new AppError("JWT_SECRET não configurado no .env", 500);
  }
  return jwt.sign({ sub: userId, role }, secret, { expiresIn: "15m" });
}

export const authService = {
  async register(input: RegisterInput) {
    const existing = await prisma.user.findUnique({ where: { email: input.email } });
    if (existing) {
      throw new AppError("E-mail já cadastrado", 409);
    }

    const passwordHash = await bcrypt.hash(input.password, 10);

    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash,
        role: input.role,
      },
    });

    const token = generateToken(user.id, user.role);

    return {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    };
  },

  async login(input: LoginInput) {
    const user = await prisma.user.findUnique({ where: { email: input.email } });
    if (!user) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const passwordCorrect = await bcrypt.compare(input.password, user.passwordHash);
    if (!passwordCorrect) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const token = generateToken(user.id, user.role);

    return {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    };
  },
};