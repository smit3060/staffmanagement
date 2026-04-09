import * as staffController from "../controller/staffController.ts";

import express from "express";
import { protect } from "../middleware/authMiddleware.ts"

const router = express.Router();
router.use(protect) 

router.post("/add",staffController.addStaff)
router.get("/",staffController.takeStaff)
router.put("/:id",staffController.editStaff)
router.delete("/:id",staffController.removeStaff)
router.get("/:id",staffController.takeSpecificStaff)


export default router;

