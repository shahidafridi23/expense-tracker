import "dotenv/config";
import express from "express";
import connectDB from "./db/connect.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Expense Tracker");
});

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
