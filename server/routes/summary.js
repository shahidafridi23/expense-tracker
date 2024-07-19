import express from "express";
import { getSummary } from "../controllers/summary.js";
const router = express.Router();

router.route("/").get(getSummary);

export default router;
