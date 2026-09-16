import express from "express";
import { getDashboardData } from "../controllers/dashboardController.ts";
import { authenticate } from "../utils/requestHandler.ts";

const router = express.Router();

router.get("/", authenticate, getDashboardData);

export default router;
