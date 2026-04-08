import * as staffController from "../controller/staffController.ts";
import express from "express";
const router = express.Router();

router.post("/add",staffController.addStaff)
router.get("/",staffController.takeStaff)
router.put("/:id",staffController.editStaff)
router.delete("/:id",staffController.removeStaff)

export default router;