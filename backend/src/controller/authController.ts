import { registerUser, loginUser } from "../service/authService.ts"

export const register = async (req: any, res: any) => {
  try {
    const { user, token } = await registerUser(req.body)
    res.status(201).json({ success: true, message: "Account created", user, token })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const login = async (req: any, res: any) => {
  try {
    const { user, token } = await loginUser(req.body)
    res.status(200).json({ success: true, message: "Logged in", user, token })
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message })
  }
}