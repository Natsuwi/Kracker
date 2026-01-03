
import { GoogleGenAI, Type } from "@google/genai";
import { AppTracker } from "../types";

export const getProductivityInsights = async (apps: AppTracker[]) => {
  // Always use a named parameter for apiKey and use process.env.API_KEY directly.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const appDataStr = apps.map(a => `${a.name}: ${a.totalMinutesToday}m today, goal: ${a.goalMinutes || 'N/A'}m`).join('\n');
  
  const prompt = `
    As a productivity expert, analyze this user's app usage for today:
    ${appDataStr}

    Identify:
    1. Top productive app vs potential distraction.
    2. Recommendations for better time management.
    3. A motivational quote related to their top tool.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        // Using responseSchema for structured output as recommended.
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: {
              type: Type.STRING,
              description: 'A brief productivity analysis.',
            },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Actionable productivity tips.',
            },
            quote: {
              type: Type.STRING,
              description: 'A motivational quote.',
            },
          },
          required: ["analysis", "recommendations", "quote"],
        },
      }
    });

    // Access the .text property directly; do not call it as a function.
    const result = JSON.parse(response.text || '{}');
    return result;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return {
      analysis: "Could not fetch AI insights at this moment.",
      recommendations: ["Stay focused on your primary tasks.", "Take regular breaks."],
      quote: "The best way to predict the future is to create it."
    };
  }
};