import "dotenv/config";
import "express-async-errors";
import express from "express";
import connectDB from "./db/connect.js";
import authRouter from "./routes/auth.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/authentication.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import expenseRouter from "./routes/expense.js";
import categoryRouter from "./routes/category.js";
import summaryRouter from "./routes/summary.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Expense Tracker");
});

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URI],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

//routes
app.use("/api/auth", authRouter);
app.use("/api/expense", authenticateUser, expenseRouter);
app.use("/api/category", authenticateUser, categoryRouter);
app.use("/api/category", authenticateUser, categoryRouter);
app.use("/api/summary", authenticateUser, summaryRouter);

//errorMiddleware
app.use(errorHandlerMiddleware);

//server
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running at port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
