import express from "express";
import {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExcelExpense,
} from "../controllers/expenseController.ts";
import { authenticate } from "../utils/requestHandler.ts";
import { validateBody } from "../middlewares/validateMiddleware.ts";
import { expenseValidation } from "../schemas/expenseSchema.ts";

const router = express.Router();

router.post("/add", authenticate, validateBody(expenseValidation), addExpense);
router.get(
  "/get",
  authenticate,
  validateBody(expenseValidation),
  getAllExpense,
);
router.get("/downloadExcel", authenticate, deleteExpense);
router.delete(
  "/:id",
  authenticate,
  validateBody(expenseValidation),
  downloadExcelExpense,
);

export default router;
