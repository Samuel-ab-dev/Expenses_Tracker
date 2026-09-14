import express from "express";
import {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadExcelIncome,
} from "../controllers/incomeController.ts";
import { authenticate } from "../utils/requestHandler.ts";
import { validateBody } from "../middlewares/validateMiddleware.ts";
import { incomeValidation } from "../schemas/incomeSchema.ts";

const router = express.Router();

router.post("/add", authenticate, validateBody(incomeValidation), addIncome);
router.get("/get", authenticate, validateBody(incomeValidation), getAllIncome);
router.get("/downloadExcel", authenticate, downloadExcelIncome);
router.delete(
  "/:id",
  authenticate,
  validateBody(incomeValidation),
  deleteIncome,
);

export default router;
