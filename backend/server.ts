import express from "express";
import cors from "cors";
import connectDB from "./configs/db.ts";
import authRoutes from "./routes/authRoutes.ts";
import { ErrorHandler } from "./utils/errorHandler.ts";
import path from "node:path";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(ErrorHandler);
const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || "5000";
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
};

startServer();
