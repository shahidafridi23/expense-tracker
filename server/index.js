import "dotenv/config";
import express from "express";
import connectDB from "./db/connect.js";
import authRouter from "./routes/auth.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Expense Tracker");
});

//middlewares
app.use(express.json());

//routes
app.use("/api/auth", authRouter);

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
