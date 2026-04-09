import { prisma } from "../config/prisma.ts"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const signToken = (id: number) =>
  jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "7d" })

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const existing = await prisma.user.findUnique({ where: { email: data.email } })
  if (existing) throw new Error("Email already registered")
  const hashed = await bcrypt.hash(data.password, 10)
  const user = await prisma.user.create({ data: { ...data, password: hashed } })
  const { password, ...safeUser } = user
  return { user: safeUser, token: signToken(user.id) }
}

export const loginUser = async (data: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } })
  if (!user) throw new Error("User not found")
  const valid = await bcrypt.compare(data.password, user.password)
  if (!valid) throw new Error("Invalid password")
  const { password, ...safeUser } = user
  return { user: safeUser, token: signToken(user.id) }
}