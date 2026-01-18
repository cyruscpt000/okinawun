
import { GoogleGenAI } from "@google/genai";

export const getTravelAdvise = async (prompt: string, location?: { lat: number; lng: number }) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "你是一位精通沖繩旅遊的私人導遊。你正在為 '大哥' 和 '小媛' 提供建議。口吻親切、實用、具備當地知識。請盡量提供詳細的地點名稱、推薦美食和交通建議。如果問到價格，請給出大約的日圓數目。",
        tools: [{ googleSearch: {} }] // 使用搜尋功能獲取最新即時資訊
      },
    });

    const text = response.text || "對不起，我暫時沒法回答這個問題。";
    const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return { text, grounding };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "AI 助手目前忙碌中（請檢查 API Key 設定），請稍後再試。", grounding: [] };
  }
};
