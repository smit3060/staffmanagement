import express from "express";
import staffRoutes from "../routes/staffRoutes.ts";
import departmentRouter from "../routes/departmentRouter.ts";
const router = express.Router();

router.use("/staff",staffRoutes)

router.use("/department",departmentRouter)


export default router;