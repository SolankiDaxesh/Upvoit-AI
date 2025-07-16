import cors from "cors";
import express from "express";

import helmet from "helmet";
import dotenv from "dotenv";
import { connectDB } from "./configs/db";

dotenv.config();

const app = express();
const port = process.env.PORT || 3400;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
//app.use("/", router);
// Catch-all route for unmatched paths
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});
// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.info(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
