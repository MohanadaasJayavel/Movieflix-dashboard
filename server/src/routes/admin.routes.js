import { Router } from "express";
import { purgeCache } from "../controllers/admin.controller.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();
router.delete("/cache", requireAuth, requireAdmin, purgeCache);
export default router;
