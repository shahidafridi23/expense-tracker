import jwt from "jsonwebtoken";
import UnauthenticatedError from "../errors/unauthenticated.js";

const auth = async (req, res, next) => {
  // check token
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export default auth;
