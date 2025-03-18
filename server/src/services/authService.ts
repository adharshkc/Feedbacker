import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../utils/errors";
import { generateToken } from "../utils/jwt";

const prisma = new PrismaClient();

export const registerUser = async (userData: any) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });
  if (existingUser) {
    throw new AppError("User with this email already exists", 400);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role || "USER",
    },
  });
  const token = await generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });
  console.log(token)
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  };
};

export const loginUser = async (loginData: any) => {
  const user = await prisma.user.findUnique({
    where: { email: loginData.email },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }
  const isPasswordValid = await bcrypt.compare(
    loginData.password,
    user.password,
  );
  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }
  const token = await generateToken({
    id: user.id,
    email: user.email,
    role: user.role
  });
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token
  };
};
