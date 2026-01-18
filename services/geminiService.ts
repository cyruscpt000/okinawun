
import { GoogleGenAI } from "@google/genai";

export const getTravelAdvise = async (prompt: string, location?: { lat: number; lng: number }) => {
  // Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "你是一位精通沖繩旅遊的私人導遊。你正在為 '大哥' 和 '小媛' 提供建議。口吻親切、實用、具備當地知識。如果涉及地點，請盡量提供詳細資訊。",
        // Use googleMaps tool which is supported in Gemini 2.5 series.
        tools: [{ googleMaps: {} }],
        toolConfig: location ? {
          retrievalConfig: {
            latLng: {
              latitude: location.lat,
              longitude: location.lng
            }
          }
        } : undefined
      },
    });

    // Access text property directly from the response object.
    const text = response.text || "對不起，我暫時沒法回答這個問題。";
    // Extract grounding chunks to provide source links for maps and web results.
    const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return { text, grounding };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "AI 助手目前離線，請稍後再試。", grounding: [] };
  }
};
