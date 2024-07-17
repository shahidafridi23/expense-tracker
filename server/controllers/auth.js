import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import UnauthenticatedError from "../errors/unauthenticated.js";

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

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Wrong Email or Password!");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Wrong Email or Password!");
  }
  // compare password
  const token = user.createJWT();
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.status(StatusCodes.CREATED).json({ id: user._id, name: user.name });
};

export const getProfile = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Token is not present" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId });
    res.status(StatusCodes.CREATED).json({ id: user._id, name: user.name });
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({ msg: "logout" });
};
