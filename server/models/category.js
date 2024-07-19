import mongoose from "mongoose";

const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    totalAmount: {
      type: Number,
      default: 0,
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

const Category = model("Category", categorySchema);

export default Category;
