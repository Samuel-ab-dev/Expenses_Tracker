import mongoose from "mongoose";

interface ExpenseInfo {
  userId: mongoose.Types.ObjectId;
  icon?: string;
  category: string;
  amount: number;
  date: Date;
}

const ExpenseSchema = new mongoose.Schema<ExpenseInfo>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    icon: { type: String },
    category: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const Expense = mongoose.model<ExpenseInfo>("Expense", ExpenseSchema);

export default Expense;
