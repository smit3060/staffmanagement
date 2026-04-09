import jwt from "jsonwebtoken"

export const protect = (req: any, res: any, next: any) => {
  const header = req.headers.authorization
  if (!header || !header.startsWith("Bearer "))
    return res.status(401).json({ success: false, message: "Not authorized" })
  try {
    const token = header.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number }
    req.userId = decoded.id
    next()
  } catch {
    res.status(401).json({ success: false, message: "Token invalid or expired" })
  }
}