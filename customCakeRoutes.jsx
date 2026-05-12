import express from "express";
import { createCustomCake, getMyCustomCakes } from "../controllers/customCakeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createCustomCake);
router.get("/my", protect, getMyCustomCakes);

export default router;
