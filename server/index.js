import "dotenv/config";
import "express-async-errors";
import express from "express";
import connectDB from "./db/connect.js";
import authRouter from "./routes/auth.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Expense Tracker");
});

//middlewares
app.use(express.json());

//routes
app.use("/api/auth", authRouter);

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
