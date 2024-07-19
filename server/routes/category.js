import express from "express";
const router = express.Router();

import { getCategories, getCategory } from "../controllers/category.js";

router.route("/").get(getCategories);
router.route("/:category").get(getCategory);

export default router;
