import Category from "../models/category.js";

export const getCategories = async (req, res) => {
  const { limit } = req.query;
  const userId = req.user.userId;

  let query = { userId };

  const categories = await Category.find(query).limit(Number(limit) || 0);

  res.status(200).json({
    categories,
  });
};

export const getCategory = async (req, res) => {
  const userId = req.user.userId;

  const { category: categoryValue } = req.params;

  const category = await Category.findOne({
    userId,
    "category.value": categoryValue,
  });

  const totalExpenses = await Category.countDocuments({
    userId,
    "category.value": categoryValue,
  });

  res.status(200).json({
    category,
    totalExpenses,
  });
};
