import express from "express";
const router = express.Router();

import {
  createExpense,
  getExpenses,
  checkExpense,
} from "../controllers/expense.js";

router.route("/").post(createExpense);
router.route("/").get(getExpenses);
router.route("/check").get(checkExpense);

export default router;
