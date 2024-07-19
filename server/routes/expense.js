import express from "express";
const router = express.Router();

import { createExpense, getExpenses } from "../controllers/expense.js";

router.route("/").post(createExpense).get(getExpenses);
router.route("/").get(getExpenses);

export default router;
