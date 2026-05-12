import express from "express";
import {
  getCakes,
  getCakeById,
  createCake,
  updateCake,
  deleteCake
} from "../controllers/cakeController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCakes);
router.get("/:id", getCakeById);
router.post("/", protect, authorizeRoles("seller", "admin"), createCake);
router.put("/:id", protect, authorizeRoles("seller", "admin"), updateCake);
router.delete("/:id", protect, authorizeRoles("seller", "admin"), deleteCake);

export default router;
