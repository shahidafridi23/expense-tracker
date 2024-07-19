import moment from "moment";
import Expense from "../models/expense.js";

export const getSummary = async (req, res) => {
  const userId = req.user.userId;

  // Log user ID
  console.log("User ID:", userId);

  // Get the start and end of today, week, and month
  const startOfToday = moment().startOf("day").toISOString();
  const endOfToday = moment().endOf("day").toISOString();
  const startOfWeek = moment().startOf("week").toISOString();
  const endOfWeek = moment().endOf("week").toISOString();
  const startOfMonth = moment().startOf("month").toISOString();
  const endOfMonth = moment().endOf("month").toISOString();

  // Log the date ranges
  console.log("Start of Today:", startOfToday);
  console.log("End of Today:", endOfToday);
  console.log("Start of Week:", startOfWeek);
  console.log("End of Week:", endOfWeek);
  console.log("Start of Month:", startOfMonth);
  console.log("End of Month:", endOfMonth);

  console.log("testing", new Date(startOfToday));

  // Aggregate expenses
  const [todayExpenses, weekExpenses, monthExpenses] = await Promise.all([
    Expense.aggregate([
      {
        $match: {
          userId,
          date: { $gte: new Date(startOfToday), $lte: new Date(endOfToday) },
        },
      },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]),
    Expense.aggregate([
      {
        $match: {
          userId,
          date: { $gte: new Date(startOfWeek), $lte: new Date(endOfWeek) },
        },
      },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]),
    Expense.aggregate([
      {
        $match: {
          userId,
          date: { $gte: new Date(startOfMonth), $lte: new Date(endOfMonth) },
        },
      },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]),
  ]);

  res.json({
    todayTotalAmount: todayExpenses[0]?.totalAmount || 0,
    weekTotalAmount: weekExpenses[0]?.totalAmount || 0,
    monthTotalAmount: monthExpenses[0]?.totalAmount || 0,
  });
};
