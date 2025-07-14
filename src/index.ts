import express from "express";
import {
  getHelloWorld,
  getHello,
  getHelloByName,
} from "./controllers/HelloController";
import { connectToDb } from "./configs/db";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes using controllers
app.get("/", getHelloWorld);
app.get("/api/hello", getHello);
app.get("/api/hello/:name", getHelloByName);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectToDb();
});
