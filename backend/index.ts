import express from 'express'
import router from './src/routes/staffRoutes.ts';
import cors from "cors"
const app = express();

app.use(express.json())
app.use(cors())

app.use("/api/staff",router)

app.get("/test", (req, res) => {
  res.json({ message: "Express is working" })
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
