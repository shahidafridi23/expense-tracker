import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export const register = async (req, res) => {
  const encrytedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password: encrytedPassword });
  const token = user.createJWT();

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.status(StatusCodes.CREATED).json({ id: user._id, name: user.name });
};
