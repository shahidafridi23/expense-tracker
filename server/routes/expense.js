import express from "express";
const router = express.Router();

import {
  createExpense,
  getExpenses,
  checkExpense,
  deleteExpense,
  getExpensesByRange,
} from "../controllers/expense.js";

router.route("/").post(createExpense);
router.route("/").get(getExpenses);
router.route("/date").get(getExpensesByRange);
router.route("/:id").delete(deleteExpense);
router.route("/check").get(checkExpense);

export default router;
