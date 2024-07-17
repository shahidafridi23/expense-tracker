import express from "express";
const router = express.Router();

import { getProfile, login, logout, register } from "../controllers/auth.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile").get(getProfile);

export default router;
