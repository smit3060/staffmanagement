import { getAll, add, update, remove } from "../controller/departmentController.ts";
import express from "express";
const router = express.Router();

router.get("/department/",getAll);
router.post("/department/add", add);
router.put("/department/:id", update);
router.delete("/department/:id", remove);
export default router;