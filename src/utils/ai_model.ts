import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-pro", // or "gemini-pro"
  temperature: 1,
  maxOutputTokens: 2048,
  apiKey: process.env.GEMINI_API_KEY,
  // optional cache + timeout handling if needed:
  // cache: true,
  // timeout: 15000,
});
