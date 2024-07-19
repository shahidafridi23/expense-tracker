import mongoose from "mongoose";

const { Schema, model } = mongoose;

const expenseSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    category: {
      label: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Expense = model("Expense", expenseSchema);

export default Expense;
