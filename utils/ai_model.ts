import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({});
export const model = await ai.models.generateContent({
  model: "gemini-2.5-pro",
  contents: [],
  config: {
    thinkingConfig: {
      thinkingBudget: -1,
    },
  },
});
