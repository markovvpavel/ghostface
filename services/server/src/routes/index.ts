import { Router } from "express";
import aliveRoutes from "./alive";
import authRoutes from "./auth";
import userRoutes from "./user";
import orderRoutes from "./order";

const router = Router();

router.use(`/alive`, aliveRoutes);
router.use(`/auth`, authRoutes);
router.use(`/orders`, orderRoutes);
router.use(`/users`, userRoutes);

export default router;
