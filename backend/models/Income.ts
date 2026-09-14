import mongoose from "mongoose";

interface IncomeInfo {
  userId: mongoose.Types.ObjectId;
  icon?: string;
  source: string;
  amount: number;
  date: Date;
}

const IncomeSchema = new mongoose.Schema<IncomeInfo>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    icon: { type: String },
    source: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const Income = mongoose.model<IncomeInfo>("Income", IncomeSchema);

export default Income;
