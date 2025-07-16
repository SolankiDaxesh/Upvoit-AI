import dotenv from "dotenv";
import sql from "mssql";

dotenv.config();

// Local
const config: sql.config = {
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "master",
  server: process.env.DB_SERVER || "localhost",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export const pool = new sql.ConnectionPool(config);

export const connectDB = async () => {
  try {
    await pool.connect();
    console.info("Connected to MSSQL database");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};
