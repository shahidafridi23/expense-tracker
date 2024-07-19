import Expense from "../models/expense.js";
import Category from "../models/category.js";
import { StatusCodes } from "http-status-codes";

export const createExpense = async (req, res) => {
  const { category, amount } = req.body;
  const userId = req.user.userId;

  const isCategoryExits = await Category.findOne({ userId, category });

  let id = isCategoryExits ? isCategoryExits._id : null;

  if (!isCategoryExits) {
    const createdCategory = await Category.create({
      userId,
      category,
      totalAmount: amount,
    });

    id = createdCategory._id;
  }

  await Category.findByIdAndUpdate(id, { $inc: { totalAmount: amount } });

  const expense = await Expense.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ expense });
};

export const getExpenses = async (req, res) => {
  const { limit, category, sort, starttime, endtime } = req.query;
  const userId = req.user.userId;
  // Build the query object
  let query = { userId };

  if (category) {
    query["category.value"] = category;
  }

  if (starttime || endtime) {
    query.date = {};
    if (starttime) {
      query.date.$gte = new Date(starttime);
    }
    if (endtime) {
      query.date.$lte = new Date(endtime);
    }
  }

  // Set the sort order
  const sortOrder = sort ? { [sort]: 1 } : { date: 1 };

  // Fetch expenses from the database
  const expenses = await Expense.find(query)
    .sort(sortOrder)
    .limit(Number(limit) || 0);

  // Calculate the total amount
  const totalAmount = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  // Respond with expenses and total amount
  res.status(200).json({
    expenses,
    totalAmount,
  });
};
