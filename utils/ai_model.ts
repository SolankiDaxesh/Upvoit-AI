import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({
  apiKey: API_KEY, // Pass the API key here
});

export async function generateGeminiContent(content: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: content,
    config: {
      thinkingConfig: {
        thinkingBudget: -1,
      },
    },
  });

  return response;
}

// Example usage (you would call this function from other parts of your agent):
// In another file (e.g., agent.ts):
/*
import { generateGeminiContent } from './ai_model';

async function runAgent() {
  const userPrompt = "Tell me a short story about a brave knight.";
  const result = await generateGeminiContent(userPrompt);
  console.log(result.response.text());

  const multiModalPrompt = [
    { text: "Describe this image:" },
    { inlineData: { mimeType: "image/jpeg", data: "YOUR_BASE64_ENCODED_IMAGE_STRING" } }
  ];
  const multiModalResult = await generateGeminiContent(multiModalPrompt);
  console.log(multiModalResult.response.text());
}

runAgent();
*/
